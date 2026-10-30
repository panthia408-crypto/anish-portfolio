"use client";

import { useState, type FormEvent } from "react";
import { site } from "../../data/site";
import { isPlaceholder, withPlaceholders } from "../ui/Placeholder";

type Status = "idle" | "sending" | "sent" | "error";

const errorText = isPlaceholder(site.email)
  ? "That didn't go through. Try again in a minute, or message me on LinkedIn."
  : `That didn't go through. Email me at ${site.email} instead.`;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="user_name" className="label">
            Name
          </label>
          <input type="text" id="user_name" name="user_name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="user_email" className="label">
            Email
          </label>
          <input type="email" id="user_email" name="user_email" required autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required />
      </div>
      <div className="contact-form__foot">
        <button type="submit" className="btn btn--solid" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        <p className="contact-form__status mono" role="status" aria-live="polite">
          {status === "sent" && withPlaceholders(`Sent. I'll reply within ${site.replyTime}.`)}
          {status === "error" && errorText}
        </p>
      </div>
    </form>
  );
}

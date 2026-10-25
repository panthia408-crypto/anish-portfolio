"use client";

import { useEffect, useState } from "react";

const greetings = [
  "Namaste",
  "Hello",
  "Xin chào",
  "Ciao",
  "Bonjour",
  "Hola",
  "Konnichiwa",
  "Annyeong",
  "Sawasdee",
  "Guten Tag",
];

export default function HeroText() {
  const [greeting, setGreeting] = useState(greetings[0]);
  const [typedName, setTypedName] = useState("");
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setGreeting(greetings[0]);
      setTypedName("I am Anish Panthi");
      setShowCaret(false);
      return;
    }

    let greetingIndex = 0;
    let nameIndex = 0;
    const name = "I am Anish Panthi";
    let caretTimer: number | undefined;
    const greetingTimer = window.setInterval(() => {
      greetingIndex = (greetingIndex + 1) % greetings.length;
      setGreeting(greetings[greetingIndex]);
    }, 2500);
    const typingTimer = window.setInterval(() => {
      nameIndex += 1;
      setTypedName(name.slice(0, nameIndex));
      if (nameIndex === name.length) {
        window.clearInterval(typingTimer);
        caretTimer = window.setTimeout(() => setShowCaret(false), 700);
      }
    }, 90);

    return () => {
      window.clearInterval(greetingTimer);
      window.clearInterval(typingTimer);
      if (caretTimer !== undefined) window.clearTimeout(caretTimer);
    };
  }, []);

  return (
    <div className="hero-text-v2">
      <p key={greeting} className="hero-greeting-v2" aria-live="polite">{greeting}</p>
      <h1 className={`hero-name-v2${showCaret ? " hero-name-caret-v2" : ""}`} aria-label="I am Anish Panthi">
        {typedName}
      </h1>
      <p className="hero-role-v2">Industrial Engineer</p>
      <p className="hero-story-v2">Sharing my story and resources on industrial engineering</p>
      <div className="hero-actions-v2">
        <a href="#about" className="hero-cta">Learn More</a>
        <a href="/library" className="hero-secondary-cta-v2">Educational Content</a>
      </div>
    </div>
  );
}

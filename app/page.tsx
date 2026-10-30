import Script from "next/script";
import About from "./components/home/About";
import Hero from "./components/home/Hero";
import Research from "./components/home/Research";
import Work from "./components/home/Work";
import Writing from "./components/home/Writing";
import NavScroll from "./components/NavScroll";
import SiteNav from "./components/SiteNav";
import "./styles/home.css";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <SiteNav active="/" />
      <NavScroll />

      <main id="main-content">
        <Hero />

        <Research />

        <Work />

        <About />

        <Writing />

        <section id="contact" className="site-container reveal">
          <h2>Get In Touch</h2>
          <p className="contact-subtitle">Have a project in mind? I&apos;d love to hear from you.</p>
          <form id="contact-form" className="contact-form" aria-label="Contact form">
            <div className="input-group">
              <div className="form-field">
                <label htmlFor="user_name" className="sr-only">Your Name</label>
                <input type="text" id="user_name" name="user_name" placeholder="Your Name" required autoComplete="name" />
              </div>
              <div className="form-field">
                <label htmlFor="user_email" className="sr-only">Your Email</label>
                <input type="email" id="user_email" name="user_email" placeholder="Your Email" required autoComplete="email" />
              </div>
            </div>
            <label htmlFor="message" className="sr-only">Your Message</label>
            <textarea id="message" name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="premium-footer">
        <div className="footer-content site-container">
          <div className="footer-logo">A.Panthi</div>
          
          <div className="footer-social-grid" id="footer-socials"></div>

          <p className="copyright">&copy; 2026 Anish Panthi. All rights reserved.</p>
          <p className="footer-meta">TCIOE | Industrial Engineering &amp; Web Development</p>
        </div>
      </footer>

      <Script
        id="scroll-reveal"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => io.observe(el));
    })();`,
        }}
      />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}

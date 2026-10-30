import Script from "next/script";
import About from "./components/home/About";
import Hero from "./components/home/Hero";
import LatestWriting from "./components/LatestWriting";
import NavScroll from "./components/NavScroll";
import SiteNav from "./components/SiteNav";
import { projects } from "./data/projects";
import "./styles/home.css";

function getFeaturedProject(id: string) {
  const project = projects.find((item) => item.id === id);
  if (!project) {
    throw new Error(`Featured project data is missing: ${id}`);
  }
  return project;
}

const industrialVision = getFeaturedProject("industrial-vision-11");
const windTurbine = getFeaturedProject("wind-turbine-fyp");

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      <SiteNav active="/" />
      <NavScroll />

      <main id="main-content">
        <Hero />

        <About />

        <section id="work" className="work-section site-container reveal">
          <div className="work-header">
            <span className="section-label">What I Do</span>
            <h2>Featured Work</h2>
            <p className="work-subtitle">A selection of my projects, leadership, and research.</p>
          </div>
          <div className="work-grid">
            <a href="/projects#soies">
              <div className="work-card">
                <div className="work-icon"><i className="fas fa-users"></i></div>
                <h3>SOIES Nepal, 18th Executive Committee</h3>
                <p style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden" }}>My term as President: 20 events, workshops, competitions and a research partnership proposal to the National Planning Commission, 2025-2026.</p>
                <div className="work-tags"><span className="work-tag">Leadership</span><span className="work-tag">Events</span><span className="work-tag">Industry partnerships</span></div>
              </div>
            </a>

            <a href="/blog">
              <div className="work-card">
                <div className="work-icon"><i className="fas fa-wind"></i></div>
                <h3>{industrialVision.title}</h3>
                <p style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden" }}>{industrialVision.summary}</p>
                <div className="work-tags">{industrialVision.tags.slice(0, 3).map((tag) => <span className="work-tag" key={tag}>{tag}</span>)}</div>
              </div>
            </a>

            <div className="work-card">
              <div className="work-icon"><i className="fas fa-book-open"></i></div>
              <h3>{windTurbine.title}</h3>
              <p>{windTurbine.summary}</p>
              <div className="work-tags">{windTurbine.tags.slice(0, 3).map((tag) => <span className="work-tag" key={tag}>{tag}</span>)}</div>
            </div>
          </div>
          <div className="work-cta-row">
            <a href="/projects" className="view-all-btn">View All Projects <i className="fas fa-arrow-right"></i></a>
          </div>
        </section>

        <section id="blog" className="blog-section site-container reveal">
          <div className="section-header">
            <span className="gold-text">Insights</span>
            <h2>Latest Blogs</h2>
          </div>
          <div className="blog-grid">
            <LatestWriting />
          </div>
        </section>

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

import Script from "next/script";
import HeroText from "./components/HeroText";
import LatestWriting from "./components/LatestWriting";
import NavScroll from "./components/NavScroll";
import SiteNav from "./components/SiteNav";
import Toolbox from "./components/Toolbox";
import { projects } from "./data/projects";

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
      <a href="#home" className="skip-link">Skip to content</a>

      <div className="bg-animation"></div>

      <SiteNav active="/" />
      <NavScroll />

      <main id="main-content">
        <section id="home" className="hero">
          <canvas id="hero-canvas"></canvas>

          <div className="hero-container site-container">
            <div className="hero-columns-v3">
              <div className="hero-text-column-v3">
                <HeroText />
              </div>

              <div className="hero-profile-column-v3">
                <div className="hero-image">
                  <div className="hero-ring">
                    <img id="hero-img" src="/assets/placeholder.jpg" alt="Anish Panthi" />
                  </div>
                </div>

                <div className="hero-socials">
                  <a href="https://www.linkedin.com/in/anish-panthi-057326281/" target="_blank" rel="noopener" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                  <a href="https://github.com/panthia408-crypto" target="_blank" rel="noopener" className="social-icon" aria-label="GitHub"><i className="fab fa-github"></i></a>
                  <a href="https://x.com/AnishPanthi6" target="_blank" rel="noopener" className="social-icon" aria-label="X"><i className="fab fa-x-twitter"></i></a>
                  <a href="https://www.facebook.com/anish.panthi.549" target="_blank" rel="noopener" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                  <a href="https://www.instagram.com/anish.panthi/?hl=en" target="_blank" rel="noopener" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>

            <a href="#about" className="hero-scroll-down-v2" aria-label="Scroll down">
              <i className="fa-solid fa-chevron-down"></i>
            </a>
          </div>
        </section>

        <section id="about" className="about-section site-container reveal">
          <div className="about-glass-card">
            <div className="about-top-row">
              <div className="about-image-side">
                <div className="img-wrapper">
                  <img id="about-img" src="/files/about-speech.jpg" alt="Anish Panthi giving a speech" width={900} height={600} loading="lazy" />
                </div>
                <div className="about-extras">
                  <div className="about-actions-v3">
                    <a
                      href="/files/Anish-Panthi-CV.pdf"
                      download
                      aria-label="Download Anish Panthi's CV as PDF"
                      className="hero-cta"
                    >
                      Download CV
                    </a>
                    <a
                      href="/files/industrial-vision-vol11.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-secondary-cta-v2"
                    >
                      Read the Magazine
                    </a>
                  </div>
                  <div className="about-publication-v3">
                    <img
                      src="/files/industrial-vision-vol11-cover.jpg"
                      alt="Cover of Industrial Vision Volume 11"
                      width={180}
                      height={240}
                      loading="lazy"
                    />
                    <div className="about-publication-content-v3">
                      <span className="about-publication-label-v3">PUBLICATION</span>
                      <h3>Industrial Vision, Volume 11</h3>
                      <p>The annual Industrial Engineering magazine of SOIES Nepal. Written, interviewed, illustrated and designed entirely by students.</p>
                      <a
                        href="/files/industrial-vision-vol11.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open the PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-content-side">
                <span className="about-label">Engineer Profile</span>
                <h2>About Me</h2>
                <div id="about-description">
                  <p>I&apos;m Anish, an Industrial Engineering student in my 8th semester at Thapathali Campus.</p>
                  <p>IE taught me to see everything as a system. When something breaks, you don&apos;t patch the surface. You find the root cause and fix that. I&apos;ve carried that way of thinking into every room I&apos;ve been in, including the National Planning Commission at Singha Durbar, where I presented on the role of IE in reviving Nepal&apos;s industries.</p>
                  <p>Since my sixth semester, I&apos;ve been part of a wind turbine research project with my teacher, handling the design side. The original omnidirectional design is patented, so we&apos;re studying something new: what happens when the shape and ratio of its center area change. As far as we know, nobody has tested that before.</p>
                  <p>During my term as president of SOIES Nepal, I coordinated our annual magazine, Industrial Vision Vol. 11. The deadline was close, the team wasn&apos;t sure we could do it, and hiring an editor was the easy way out. I said no. A student magazine should be made by students, from the articles and sponsors to the design. So I learned InDesign and designed the whole thing myself, print ready, while my friends spent weeks of late nights on Discord finalizing articles, interviews and infographics. We made it.</p>
                  <p>Next, I want to go deep into MEP. I&apos;m learning AutoCAD MEP during my holidays and looking for an HVAC internship where I can learn how buildings actually work.</p>
                </div>
                <div className="about-tags-cloud">
                  <span className="about-tag">Industrial Engineering</span>
                  <span className="about-tag">Wind Turbine Research</span>
                  <span className="about-tag">Editorial Design</span>
                  <span className="about-tag">AutoCAD MEP</span>
                  <span className="about-tag">HVAC</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="skills-section site-container reveal">
          <div className="section-header-center">
            <span className="section-label">Expertise</span>
            <h2>Skills &amp; Tools</h2>
          </div>
          <Toolbox />
        </section>

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
      <Script src="/js/hero-bg.js" strategy="afterInteractive" />
      <Script src="/index.js" strategy="afterInteractive" />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}

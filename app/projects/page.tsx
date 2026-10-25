import type { Metadata } from "next";
import Script from "next/script";
import ProjectsList from "../components/ProjectsList";
import SiteNav from "../components/SiteNav";
import "../css/page-common.css";
import "../css/projects-extra.css";

export const metadata: Metadata = {
  title: "My Projects | Anish Panthi",
  description:
    "Projects, leadership, and research by Anish Panthi — Industrial Engineering at Thapathali Campus.",
};

export default function ProjectsPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <canvas id="bg-canvas"></canvas>
      <SiteNav active="/projects" />

      <main id="main-content" className="page-wrapper">
        <div className="page-header">
          <h1>My Projects</h1>
          <p className="page-desc">A selection of my work in industrial engineering, leadership, and development.</p>
          <span className="accent-bar"></span>
        </div>

        <a href="/soies" id="soies" className="soies-feature site-container">
          <div className="soies-feature-image">
            <img
              src="/soies/ce5c800ac9d6f255a5799eee42775443fe8124a9-6000x4000.jpg"
              alt="18th Executive Committee of SOIES Nepal"
            />
          </div>
          <div className="soies-feature-content">
            <span className="soies-feature-label">LEADERSHIP</span>
            <h2>SOIES Nepal, 18th Executive Committee</h2>
            <p>My term as President: 20 events, workshops, competitions and a research partnership proposal to the National Planning Commission, 2025-2026.</p>
            <span className="soies-feature-link">View the full record →</span>
          </div>
        </a>

        <ProjectsList />
      </main>

      <footer className="premium-footer">
        <div className="footer-content">
          <div className="footer-logo">A.Panthi</div>
          <div className="footer-social-grid">
            <a href="https://www.linkedin.com/in/anish-panthi-057326281/" target="_blank" rel="noopener" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/panthia408-crypto" target="_blank" rel="noopener" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="https://x.com/AnishPanthi6" target="_blank" rel="noopener" aria-label="X"><i className="fab fa-x-twitter"></i></a>
            <a href="https://www.facebook.com/anish.panthi.549" target="_blank" rel="noopener" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/anish.panthi/?hl=en" target="_blank" rel="noopener" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
          <p className="copyright">&copy; 2026 Anish Panthi. All rights reserved.</p>
          <p className="footer-meta">TCIOE | Industrial Engineering</p>
        </div>
      </footer>

      <Script src="/js/page-bg.js" strategy="afterInteractive" />
      <Script src="/index.js" strategy="afterInteractive" />
    </>
  );
}

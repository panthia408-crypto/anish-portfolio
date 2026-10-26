import type { Metadata } from "next";
import Script from "next/script";
import InlineActions from "../components/InlineActions";
import SiteNav from "../components/SiteNav";
import "../css/page-common.css";
import "../css/library-page.css";

export const metadata: Metadata = {
  title: "Library | Anish Panthi",
  description:
    "Open access notes, textbooks, and resources for all 8 semesters of IOE Industrial Engineering.",
};

export default function LibraryPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <canvas id="bg-canvas"></canvas>
      <SiteNav active="/library" />
      <InlineActions />

      <main id="main-content" className="page-wrapper">
        <section id="selection-view">
          <div className="page-header">
            <h1>The Engineer&apos;s Library</h1>
            <p className="page-desc">Open access notes, textbooks, and resources for all 8 semesters of IOE Industrial Engineering.</p>
            <span className="accent-bar"></span>
          </div>

          <div className="search-bar-row">
            <div className="search-wrap">
              <i className="fas fa-search"></i>
              <input type="text" id="lib-search" className="search-input" placeholder="Search semesters or subjects..." />
            </div>
          </div>

          <div id="global-results" className="global-results" style={{ display: "none" }}>
            <div className="global-results-header">
              <h3><i className="fas fa-search"></i> Matching Subjects</h3>
              <button className="clear-search-btn" data-action="clear-library-search" type="button">Clear <i className="fas fa-xmark"></i></button>
            </div>
            <div className="book-grid" id="global-book-display"></div>
          </div>

          <div className="tiles-container">
            <div className="lib-tile" data-action="open-library-category" data-category="1" data-label="Semester I">
              <div className="tile-icon"><i className="fa-solid fa-book-open"></i></div>
              <div className="tile-info"><span className="tile-num">01</span><h3>Semester I</h3><p>Foundational Engineering</p></div>
            </div>
            <div className="lib-tile" data-action="open-library-category" data-category="2" data-label="Semester II">
              <div className="tile-icon"><i className="fa-solid fa-flask"></i></div>
              <div className="tile-info"><span className="tile-num">02</span><h3>Semester II</h3><p>Core Sciences</p></div>
            </div>
            <div className="lib-tile" data-action="open-library-category" data-category="3" data-label="Semester III">
              <div className="tile-icon"><i className="fa-solid fa-gears"></i></div>
              <div className="tile-info"><span className="tile-num">03</span><h3>Semester III</h3><p>Engineering Mechanics</p></div>
            </div>
            <div className="lib-tile" data-action="open-library-category" data-category="4" data-label="Semester IV">
              <div className="tile-icon"><i className="fa-solid fa-microchip"></i></div>
              <div className="tile-info"><span className="tile-num">04</span><h3>Semester IV</h3><p>Applied Engineering</p></div>
            </div>
            <div className="lib-tile" data-action="open-library-category" data-category="5" data-label="Semester V">
              <div className="tile-icon"><i className="fa-solid fa-chart-line"></i></div>
              <div className="tile-info"><span className="tile-num">05</span><h3>Semester V</h3><p>Industrial Methods</p></div>
            </div>
            <div className="lib-tile current" data-action="open-library-category" data-category="6" data-label="Semester VI">
              <div className="tile-icon"><i className="fa-solid fa-industry"></i></div>
              <div className="tile-info"><span className="tile-num">06</span><h3>Semester VI</h3><p>Current Semester</p></div>
            </div>
            <div className="lib-tile" data-action="open-library-category" data-category="7" data-label="Semester VII">
              <div className="tile-icon"><i className="fa-solid fa-compass-drafting"></i></div>
              <div className="tile-info"><span className="tile-num">07</span><h3>Semester VII</h3><p>Advanced Topics</p></div>
            </div>
            <div className="lib-tile" data-action="open-library-category" data-category="8" data-label="Semester VIII">
              <div className="tile-icon"><i className="fa-solid fa-graduation-cap"></i></div>
              <div className="tile-info"><span className="tile-num">08</span><h3>Semester VIII</h3><p>Final Year</p></div>
            </div>
            <div className="lib-tile special" data-action="open-library-category" data-category="research-docs" data-label="Research">
              <div className="tile-icon"><i className="fa-solid fa-microscope"></i></div>
              <div className="tile-info"><span className="tile-num"><i className="fa-solid fa-star"></i></span><h3>Research &amp; Papers</h3><p>Official Documents &amp; Studies</p></div>
            </div>
          </div>
        </section>

        <section id="display-view" style={{ display: "none" }}>
          <div className="display-header">
            <button className="back-to-cats" data-action="close-library-category" type="button"><i className="fa-solid fa-chevron-left"></i> Back</button>
            <div><h2 id="current-category-title">Semester Resources</h2></div>
          </div>
          <div className="search-bar-row">
            <div className="search-wrap">
              <i className="fas fa-search"></i>
              <input type="text" id="resource-search" className="search-input" placeholder="Search resources..." />
            </div>
          </div>
          <div className="book-grid" id="book-display"></div>
        </section>
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
      <Script src="/js/library-logic.js" strategy="afterInteractive" />
    </>
  );
}

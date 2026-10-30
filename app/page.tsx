import About from "./components/home/About";
import Contact from "./components/home/Contact";
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

        <Contact />
      </main>

      <footer className="premium-footer">
        <div className="footer-content site-container">
          <div className="footer-logo">A.Panthi</div>
          
          <div className="footer-social-grid" id="footer-socials"></div>

          <p className="copyright">&copy; 2026 Anish Panthi. All rights reserved.</p>
          <p className="footer-meta">TCIOE | Industrial Engineering &amp; Web Development</p>
        </div>
      </footer>

    </>
  );
}

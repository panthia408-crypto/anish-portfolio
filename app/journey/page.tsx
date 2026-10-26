import type { Metadata } from "next";
import Script from "next/script";
import SiteNav from "../components/SiteNav";
import "../css/page-common.css";
import "../css/timeline-page.css";
import "../css/certs-page.css";

export const metadata: Metadata = {
  title: "Journey | Anish Panthi",
  description: "Education, leadership and certifications of Anish Panthi.",
};

const socialLinks = [
  ["https://www.linkedin.com/in/anish-panthi-057326281/", "LinkedIn", "fa-linkedin"],
  ["https://github.com/panthia408-crypto", "GitHub", "fa-github"],
  ["https://x.com/AnishPanthi6", "X", "fa-x-twitter"],
  ["https://www.facebook.com/anish.panthi.549", "Facebook", "fa-facebook"],
  ["https://www.instagram.com/anish.panthi/?hl=en", "Instagram", "fa-instagram"],
];

export default function JourneyPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <canvas id="bg-canvas"></canvas>
      <SiteNav active="/journey" />

      <main id="main-content" className="page-wrapper">
        <div className="page-header">
          <h1>Journey</h1>
          <p className="page-desc">Where I studied, what I led, and what I learned along the way.</p>
          <span className="accent-bar"></span>
        </div>

        <section id="timeline" className="journey-part">
          <div className="timeline-container">
            <div className="tl-item"><span className="tl-dot"></span><div className="tl-content"><span className="tl-year">2020</span><h3>SEE, Secondary Education</h3><p className="tl-subtitle">Shree Kalika Nepal Rastriya Secondary School</p><p>Completed the School Leaving Examination, building the foundational academic base before entering higher studies.</p></div></div>
            <div className="tl-item"><span className="tl-dot"></span><div className="tl-content"><span className="tl-year">2020 to 2022</span><h3>+2 Science</h3><p className="tl-subtitle">Omega College, Kumarpati</p><p>Studied the Physical Science stream. Developed an interest in engineering, physics and problem-solving that led to choosing Industrial Engineering.</p></div></div>
            <div className="tl-item"><span className="tl-dot"></span><div className="tl-content"><span className="tl-year">2022</span><h3>Joined Thapathali Campus, IOE</h3><p className="tl-subtitle">B.E. Industrial Engineering, Tribhuvan University</p><p>Began the journey in Industrial Engineering at the Institute of Engineering and started engaging with student communities from the first semester.</p></div></div>
            <div className="tl-item"><span className="tl-dot"></span><div className="tl-content"><span className="tl-year">2023</span><h3>Graphic Designer, GAP Thapathali</h3><p className="tl-subtitle">Regional student club (Gulmi, Arghakhanchi, Palpa)</p><p>Contributed to event posters, social media content and visual branding for the club.</p></div></div>
            <div className="tl-item"><span className="tl-dot"></span><div className="tl-content"><span className="tl-year">2023</span><h3>Joint Secretary, SOIES Nepal</h3><p className="tl-subtitle">Society of Industrial Engineering Students</p><p>Coordinated conferences, the Industrial Estate Research Program and Microsoft training, and was part of the Yathartha tech fest.</p></div></div>
            <div className="tl-item"><span className="tl-dot"></span><div className="tl-content"><span className="tl-year">Early 2024</span><h3>President, GAP Thapathali</h3><p className="tl-subtitle">Regional student club</p><p>Led the &quot;home far from home&quot; initiative, connecting students from western Nepal studying at Thapathali Campus. Later stepped down to take on the SOIES presidency.</p></div></div>
            <div className="tl-item"><span className="tl-dot"></span><div className="tl-content"><span className="tl-year">2025</span><h3>Industrial Vision Vol. 10 and the turbine research</h3><p className="tl-subtitle">Thapathali Campus, IOE</p><p>Principal Correspondent for the tenth issue of the magazine. In the sixth semester I joined my teacher&apos;s omnidirectional wind turbine research, handling the 3D design. It is now my final year project.</p></div></div>
            <div className="tl-item"><span className="tl-dot"></span><div className="tl-content"><span className="tl-year">2025 to 2026</span><h3>President, SOIES Nepal</h3><p className="tl-subtitle">18th Executive Committee</p><p>Led 20 events: Yathartha 3.0, the National Math and Physics Olympiad, Ergo Reignite 2.0, a job fair and MOU with Nebico Limited, workshops, alumni talks, and a research partnership proposal to the National Planning Commission.</p></div></div>
            <div className="tl-item"><span className="tl-dot"></span><div className="tl-content"><span className="tl-year">August 2026</span><h3>Industrial Vision Vol. 11</h3><p className="tl-subtitle">Coordinator and designer</p><p>Learned InDesign and designed the whole issue, print ready, with the team. Launched on 14 August 2026.</p></div></div>
            <div className="tl-item"><span className="tl-dot"></span><div className="tl-content"><span className="tl-year">Now</span><h3>8th Semester</h3><p className="tl-subtitle">Thapathali Campus, IOE</p><p>My presidency is complete. I&apos;m working on the wind turbine as my final year project, learning AutoCAD MEP, and looking for an HVAC and MEP internship.</p></div></div>
          </div>
        </section>

        <section id="certifications" className="journey-part">
          <div className="certs-container">
            <h3>Certificates and training</h3>
            <div className="cert-item"><div className="cert-card"><h3>SolidWorks 3D Modeling</h3><span className="cert-org">7-day workshop and 6-month lab course, Thapathali Campus</span></div></div>
            <div className="cert-item"><div className="cert-card"><h3>ANSYS Simulation Training</h3><span className="cert-org">10-day workshop, organised and attended, SOIES Nepal</span></div></div>
            <div className="cert-item"><div className="cert-card"><h3>Complete Microsoft Office Package</h3><span className="cert-org">7-day training course</span></div></div>
            <div className="cert-item"><div className="cert-card"><h3>Engineering Entrepreneurship and Financial Markets Workshop</h3><span className="cert-org">3-day workshop on share market literacy, co-organised with Broker 90 and Sajilo Broker</span></div></div>
            <h3>Roles</h3>
            <div className="cert-group">
              <div className="cert-item"><div className="cert-card"><h3>President, SOIES Nepal</h3><span className="cert-org">18th Executive Committee, 2025 to 2026</span></div></div>
              <div className="cert-item sub"><div className="cert-card"><h3>Coordinator, Industrial Vision Vol. 11</h3><span className="cert-org">Designed the magazine and prepared the print-ready files, 2026</span></div></div>
              <div className="cert-item sub"><div className="cert-card"><h3>Principal Correspondent, Industrial Vision Vol. 10</h3><span className="cert-org">SOIES Nepal</span></div></div>
              <div className="cert-item sub"><div className="cert-card"><h3>Coordinator, Yathartha 3.0</h3><span className="cert-org">Thapathali Campus engineering fest, 2026</span></div></div>
              <div className="cert-item sub"><div className="cert-card"><h3>Organiser, Yathartha 2.0</h3><span className="cert-org">Thapathali Campus engineering fest</span></div></div>
              <div className="cert-item sub"><div className="cert-card"><h3>Joint Secretary, SOIES Nepal</h3><span className="cert-org">Society of Industrial Engineering Students, Nepal</span></div></div>
              <div className="cert-item sub"><div className="cert-card"><h3>President, GAP Thapathali</h3><span className="cert-org">Regional student club, Gulmi, Arghakhanchi, Palpa</span></div></div>
            </div>
            <p className="cert-org">Also organised: Industrial Estate Research Program, national quiz competition, Math and Physics Olympiad, Ergo Reignite design competition, talk shows and alumni meets.</p>
          </div>
        </section>
      </main>

      <footer className="premium-footer">
        <div className="footer-content">
          <div className="footer-logo">A.Panthi</div>
          <div className="footer-social-grid">
            {socialLinks.map(([href, label, icon]) => <a href={href} target="_blank" rel="noopener" aria-label={label} key={label}><i className={`fab ${icon}`}></i></a>)}
          </div>
          <p className="copyright">&copy; 2026 Anish Panthi. All rights reserved.</p>
          <p className="footer-meta">TCIOE | Industrial Engineering</p>
        </div>
      </footer>

      <Script src="/js/page-bg.js" strategy="afterInteractive" />
    </>
  );
}

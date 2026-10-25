type SiteNavProps = {
  active?: string;
};

export default function SiteNav({ active = "" }: SiteNavProps) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "My Projects" },
    { href: "/journey", label: "Journey" },
    { href: "/library", label: "Library" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-left">
        <a href="/" className="logo-link">
          <img src="/logo.png" alt="Logo" className="nav-logo" />
          <span className="logo-text">A.Panthi</span>
        </a>
      </div>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={link.href === active ? "active" : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <div className="mobile-menu-icon" id="mobile-menu-btn" role="button" aria-label="Toggle menu" aria-expanded="false" tabIndex={0}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
}

import { useState } from "react";
import { Phone, Menu, X, MessageCircle } from "lucide-react";
import { clinicInfo } from "../data/mock";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Laser Treatment", href: "#laser" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ];

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header className="header-nav">
      <div className="header-container">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
          className="header-logo"
        >
          Avira <span className="header-logo-accent">Clinic</span>
        </a>

        <nav className="header-desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href={`tel:${clinicInfo.phone}`}
            className="header-phone-btn"
          >
            <Phone size={16} />
            <span>Call Now</span>
          </a>
          <a
            href={`https://wa.me/${clinicInfo.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="header-whatsapp-btn"
          >
            <MessageCircle size={16} />
          </a>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="mobile-nav-link"
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-actions">
            <a href={`tel:${clinicInfo.phone}`} className="mobile-call-btn">
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

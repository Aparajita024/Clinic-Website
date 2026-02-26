import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowUp } from "lucide-react";
import { clinicInfo } from "../data/mock";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Laser Treatment", href: "#laser" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ];

  const serviceLinks = [
    "Laser Hair Removal",
    "Hydra Facial",
    "Acne Treatment",
    "Pigmentation Treatment",
    "Hair Fall Treatment",
    "Mole Removal"
  ];

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">
              Avira <span className="footer-logo-accent">Clinic</span>
            </h3>
            <p className="footer-description">
              Avira General Skin & Hair Clinic (Dr. Lakhani) — Your trusted partner for advanced skin and hair treatments in Navi Mumbai.
            </p>
            <div className="footer-contact-row">
              <a href={`tel:${clinicInfo.phone}`} className="footer-contact-link">
                <Phone size={14} />
                {clinicInfo.phone}
              </a>
              <a href={`mailto:${clinicInfo.email}`} className="footer-contact-link">
                <Mail size={14} />
                {clinicInfo.email}
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-links">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); scrollTo("#services"); }}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Clinic Info</h4>
            <div className="footer-info-items">
              <div className="footer-info-item">
                <MapPin size={14} />
                <span>{clinicInfo.address}</span>
              </div>
              <div className="footer-info-item">
                <Clock size={14} />
                <span>{clinicInfo.timings}</span>
              </div>
              <div className="footer-info-item">
                <MessageCircle size={14} />
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Avira General Skin & Hair Clinic. All rights reserved.</p>
          <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

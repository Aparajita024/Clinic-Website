import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { clinicInfo } from "../data/mock";

export const HeroSection = () => {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span>Dermatologist-Supervised Treatments</span>
          </div>
          <h1 className="hero-title">
            Advanced Laser Hair Removal & Skin Treatments in Navi Mumbai
          </h1>
          <p className="hero-subtitle">
            Safe, effective & personalized treatments at Avira General Skin & Hair Clinic. Experience premium dermatological care with Dr. Lakhani in Kopar Khairane.
          </p>
          <div className="hero-cta-group">
            <button onClick={scrollToContact} className="btn-primary-hero">
              Book Appointment
              <ArrowRight size={16} />
            </button>
            <a href={`tel:${clinicInfo.phone}`} className="btn-outline-hero">
              <Phone size={16} />
              Call Now
            </a>
            <a
              href={`https://wa.me/${clinicInfo.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-hero"
            >
              <MessageCircle size={16} />
              WhatsApp Consultation
            </a>
          </div>
          <div className="hero-trust">
            <div className="hero-trust-item">
              <span className="hero-trust-number">10+</span>
              <span className="hero-trust-label">Years Experience</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-number">5000+</span>
              <span className="hero-trust-label">Patients Treated</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-number">10+</span>
              <span className="hero-trust-label">Treatments Offered</span>
            </div>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <div className="hero-image-card">
            <img
              src="https://images.pexels.com/photos/7446683/pexels-photo-7446683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Advanced dermatology treatment at Avira Clinic"
              className="hero-image"
            />
            <div className="hero-image-overlay">
              <span className="hero-image-tag">9 AM – 10 PM</span>
              <span className="hero-image-tag">Walk-ins Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

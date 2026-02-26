import * as LucideIcons from "lucide-react";
import { services } from "../data/mock";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ service }) => {
  const IconComponent = LucideIcons[service.icon] || LucideIcons.Circle;

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="service-card">
      <div className="service-card-icon">
        <IconComponent size={24} />
      </div>
      <h3 className="service-card-title">{service.title}</h3>
      <p className="service-card-desc">{service.description}</p>
      <ul className="service-card-benefits">
        {service.benefits.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="service-card-footer">
        <span className="service-card-duration">{service.duration}</span>
        <button onClick={scrollToContact} className="service-card-cta">
          Book Consultation
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <span className="section-label">Our Services</span>
          <h2 className="section-heading">
            Comprehensive Skin & Hair Treatments
          </h2>
          <p className="section-subtext">
            From advanced laser hair removal to specialized skin treatments, we offer a full range of dermatological services tailored to your needs.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

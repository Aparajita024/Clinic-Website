import * as LucideIcons from "lucide-react";
import { whyChooseUs } from "../data/mock";

export const WhyChooseSection = () => {
  return (
    <section id="why-choose" className="why-choose-section">
      <div className="why-choose-container">
        <div className="why-choose-header">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-heading">
            Why Avira Clinic Stands Apart
          </h2>
          <p className="section-subtext">
            Every detail of our practice is designed around your comfort, safety, and results.
          </p>
        </div>
        <div className="why-choose-grid">
          {whyChooseUs.map((item, idx) => {
            const IconComponent = LucideIcons[item.icon] || LucideIcons.Circle;
            return (
              <div key={idx} className="why-choose-card">
                <div className="why-choose-icon">
                  <IconComponent size={24} />
                </div>
                <h3 className="why-choose-title">{item.title}</h3>
                <p className="why-choose-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

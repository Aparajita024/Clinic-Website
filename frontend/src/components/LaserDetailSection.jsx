import { laserFaqs, laserAreas } from "../data/mock";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const LaserDetailSection = () => {
  return (
    <section id="laser" className="laser-section">
      <div className="laser-container">
        <div className="laser-header">
          <span className="section-label">Detailed Guide</span>
          <h2 className="section-heading">
            Laser Hair Removal in Navi Mumbai
          </h2>
          <p className="section-subtext">
            Everything you need to know about laser hair removal at Avira Clinic, Kopar Khairane.
          </p>
        </div>

        <div className="laser-content-grid">
          <div className="laser-info-column">
            <div className="laser-info-block">
              <h3 className="laser-info-title">How Laser Hair Removal Works</h3>
              <p className="laser-info-text">
                Laser hair removal uses concentrated light energy to target melanin in hair follicles. The light converts to heat, damaging the follicle and inhibiting future growth. Our advanced diode lasers offer adjustable wavelengths for safe treatment across all skin types, making it the preferred choice for laser hair removal in Kopar Khairane.
              </p>
            </div>

            <div className="laser-info-block">
              <h3 className="laser-info-title">Number of Sessions Required</h3>
              <p className="laser-info-text">
                Typically 6–8 sessions are needed, spaced 4–6 weeks apart. Hair grows in cycles, and the laser is most effective during the active growth phase. Multiple sessions ensure all follicles are treated. Results become noticeable after 2–3 sessions.
              </p>
            </div>

            <div className="laser-info-block">
              <h3 className="laser-info-title">Safe for Dark Skin</h3>
              <p className="laser-info-text">
                At our skin clinic in Navi Mumbai, we use Nd:YAG and diode lasers specifically suited for darker skin tones. Dr. Lakhani, an experienced dermatologist in Kopar Khairane, customizes parameters to ensure safe, effective treatment without hyperpigmentation.
              </p>
            </div>

            <div className="laser-info-block">
              <h3 className="laser-info-title">Areas Treated</h3>
              <div className="laser-areas-grid">
                {laserAreas.map((area, idx) => (
                  <div key={idx} className="laser-area-item">
                    <Check size={16} className="laser-area-check" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="laser-info-block">
              <h3 className="laser-info-title">Before & After Care</h3>
              <div className="laser-care-grid">
                <div className="laser-care-card">
                  <h4>Before Treatment</h4>
                  <ul>
                    <li>Avoid sun exposure for 2 weeks</li>
                    <li>Shave the area 24 hours prior</li>
                    <li>No waxing or plucking for 4 weeks</li>
                    <li>Avoid self-tanners and bleaching creams</li>
                  </ul>
                </div>
                <div className="laser-care-card">
                  <h4>After Treatment</h4>
                  <ul>
                    <li>Apply SPF 30+ sunscreen daily</li>
                    <li>Avoid hot showers for 24 hours</li>
                    <li>Moisturize treated area regularly</li>
                    <li>No swimming pools for 48 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="laser-faq-column">
            <div className="laser-faq-wrapper">
              <h3 className="laser-faq-heading">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="laser-accordion">
                {laserFaqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="laser-faq-item">
                    <AccordionTrigger className="laser-faq-trigger">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="laser-faq-content">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="laser-image-block">
              <img
                src="https://images.pexels.com/photos/5069508/pexels-photo-5069508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Laser hair removal treatment at Avira Clinic Navi Mumbai"
                className="laser-detail-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

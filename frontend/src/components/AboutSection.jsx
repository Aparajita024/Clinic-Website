import { CheckCircle2 } from "lucide-react";

export const AboutSection = () => {
  const highlights = [
    "Patient-first approach with personalized treatment plans",
    "State-of-the-art laser and dermatological equipment",
    "Focus on safety, hygiene & modern technology",
    "Comprehensive skin and hair care solutions"
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-image-col">
          <div className="about-image-wrapper">
            <img
              src="https://images.pexels.com/photos/7446690/pexels-photo-7446690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Dr. Lakhani at Avira Clinic consultation"
              className="about-image"
            />
          </div>
        </div>
        <div className="about-content">
          <span className="section-label">About the Clinic</span>
          <h2 className="section-heading">
            Trusted Dermatology & Cosmetology in Kopar Khairane
          </h2>
          <p className="about-text">
            Avira General Skin & Hair Clinic (Dr. Lakhani) is a trusted dermatology and cosmetology clinic located in Kopar Khairane, Navi Mumbai. The clinic specializes in advanced laser hair removal treatments and comprehensive skin and hair care solutions.
          </p>
          <p className="about-text">
            With a patient-first approach, the clinic focuses on safety, hygiene, modern technology, and personalized treatment plans tailored to each individual's needs.
          </p>
          <div className="about-highlights">
            {highlights.map((item, idx) => (
              <div key={idx} className="about-highlight-item">
                <CheckCircle2 size={18} className="highlight-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

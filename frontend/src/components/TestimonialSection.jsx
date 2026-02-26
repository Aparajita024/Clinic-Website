import { Star } from "lucide-react";
import { testimonials } from "../data/mock";

const StarRating = ({ rating }) => (
  <div className="star-rating">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={16}
        className={star <= rating ? "star-filled" : "star-empty"}
        fill={star <= rating ? "#333333" : "none"}
        strokeWidth={star <= rating ? 0 : 1.5}
      />
    ))}
  </div>
);

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-heading">
            What Our Patients Say
          </h2>
          <p className="section-subtext">
            Real experiences from patients who trust Avira Clinic for their skin and hair care needs.
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <StarRating rating={t.rating} />
              <p className="testimonial-review">“{t.review}”</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="testimonial-info">
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-treatment">{t.treatment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

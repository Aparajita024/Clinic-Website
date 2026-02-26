import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { clinicInfo, contactFormInitial } from "../data/mock";
import { toast } from "sonner";
import api from "../lib/api";

export const ContactSection = () => {
  const [form, setForm] = useState({ ...contactFormInitial });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, phone: digitsOnly });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/appointments", {
        name: form.name,
        phone: form.phone,
        email: form.email,
        preferredDate: form.preferredDate,
        message: form.message,
      });

      toast.success("Thank you! Your appointment request was submitted.");
      setForm({ ...contactFormInitial });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to submit your request. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <span className="section-label">Get in Touch</span>
          <h2 className="section-heading">Book Your Consultation</h2>
          <p className="section-subtext">
            Ready to start your journey to healthier skin and hair? Reach out to us today.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  className="form-input"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="preferredDate" className="form-label">Preferred Date</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your concern or preferred service..."
                  className="form-textarea"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="form-submit-btn"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>

          <div className="contact-info-wrapper">
            <div className="contact-info-cards">
              <div className="contact-info-card">
                <MapPin size={20} className="contact-icon" />
                <div>
                  <h4>Visit Us</h4>
                  <p>{clinicInfo.address}</p>
                </div>
              </div>
              <div className="contact-info-card">
                <Phone size={20} className="contact-icon" />
                <div>
                  <h4>Call Us</h4>
                  <a href={`tel:${clinicInfo.phone}`}>{clinicInfo.phone}</a>
                </div>
              </div>
              <div className="contact-info-card">
                <MessageCircle size={20} className="contact-icon" />
                <div>
                  <h4>WhatsApp</h4>
                  <a
                    href={`https://wa.me/${clinicInfo.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat with us
                  </a>
                </div>
              </div>
              <div className="contact-info-card">
                <Mail size={20} className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${clinicInfo.email}`}>{clinicInfo.email}</a>
                </div>
              </div>
              <div className="contact-info-card">
                <Clock size={20} className="contact-icon" />
                <div>
                  <h4>Clinic Hours</h4>
                  <p>{clinicInfo.timings}</p>
                  <p className="contact-payment">Payment: {clinicInfo.payment}</p>
                </div>
              </div>
            </div>

            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.9!2d73.0!3d19.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c127a1f3ca07%3A0x5d1b2f6bf40ab99!2sKopar+Khairane%2C+Navi+Mumbai%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Avira Clinic Location - Kopar Khairane, Navi Mumbai"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { MessageCircle } from "lucide-react";
import { clinicInfo } from "../data/mock";

export const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${clinicInfo.whatsapp.replace('+', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="whatsapp-float-text">Chat with us</span>
    </a>
  );
};

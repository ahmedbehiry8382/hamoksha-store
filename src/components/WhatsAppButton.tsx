import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '201080308169';
  const message = 'مرحباً، أريد الاستفسار عن خدماتكم';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="تواصل عبر واتساب"
    >
      {/* Pulse effect */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30" />

      {/* Button */}
      <div className="relative flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg shadow-green-500/30 transition-all duration-300 group-hover:scale-110">
        <MessageCircle className="w-7 h-7" />

        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 px-3 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10">
          تواصل معنا
        </span>
      </div>
    </a>
  );
}

import { Link } from 'react-router-dom';
import { Gamepad2, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-800 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-blue rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Hamoksha Store</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              متجرك الموثوق لشحن الألعاب والبطاقات الرقمية. نقدم أفضل الأسعار وأسرع خدمة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-neon-purple transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-neon-purple transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-neon-purple transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-neon-purple transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-neon-purple" />
                <span>support@hamoksha.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-neon-purple" />
                <span>مصر</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500">
            جميع الحقوق محفوظة © {new Date().getFullYear()} Hamoksha Store
          </p>
        </div>
      </div>
    </footer>
  );
}

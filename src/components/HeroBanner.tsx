import { ArrowLeft, Zap, Shield, Clock } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="hero-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="text-white">اشحن </span>
              <span className="gradient-text">ألعابك</span>
              <span className="text-white"> بكل سهولة</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
              متجر Hamoksha يوفر لك أفضل أسعار الشحن لجميع الألعاب والبطاقات الرقمية.
              خدمة سريعة وآمنة على مدار الساعة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#products"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <span>تصفح المنتجات</span>
                <ArrowLeft className="w-5 h-5" />
              </a>
              <a
                href="#features"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <span>تعرف علينا</span>
              </a>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up">
            <div className="glass rounded-2xl p-6 hover:border-neon-purple/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-neon-purple/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neon-purple/30 transition-colors">
                <Zap className="w-7 h-7 text-neon-purple" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">سرعة فائقة</h3>
              <p className="text-gray-400 text-sm">تسليم فوري خلال دقائق معدودة</p>
            </div>

            <div className="glass rounded-2xl p-6 hover:border-neon-green/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-neon-green/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neon-green/30 transition-colors">
                <Shield className="w-7 h-7 text-neon-green" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">دفع آمن</h3>
              <p className="text-gray-400 text-sm">حماية كاملة لمعاملاتك المالية</p>
            </div>

            <div className="glass rounded-2xl p-6 hover:border-neon-blue/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-neon-blue/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neon-blue/30 transition-colors">
                <Clock className="w-7 h-7 text-neon-blue" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">دعم 24/7</h3>
              <p className="text-gray-400 text-sm">فريق دعم متاح على مدار الساعة</p>
            </div>

            <div className="glass rounded-2xl p-6 hover:border-neon-pink/50 transition-all duration-300 group">
              <div className="w-14 h-14 bg-neon-pink/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neon-pink/30 transition-colors">
                <svg className="w-7 h-7 text-neon-pink" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.29c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.67 5 4.79 5 8.41 0 2.08-.8 3.97-2.1 5.64z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">أفضل الأسعار</h3>
              <p className="text-gray-400 text-sm">أسعار تنافسية لا مثيل لها</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#0f172a"
          />
        </svg>
      </div>
    </section>
  );
}

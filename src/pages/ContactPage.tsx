import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MessageCircle, Send, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-10 h-10 text-neon-green" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">تم إرسال رسالتك!</h2>
            <p className="text-gray-400 mb-8">
              شكراً للتواصل معنا. سنرد عليك في أقرب وقت ممكن خلال 24 ساعة.
            </p>
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              <span>العودة للرئيسية</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors mb-6 group"
        >
          <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>العودة للرئيسية</span>
        </Link>

        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-neon-orange/20 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-neon-orange" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">تواصل معنا</h1>
              <p className="text-gray-400">نحن هنا لمساعدتك</p>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-neon-purple/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-neon-purple" />
            </div>
            <h3 className="text-white font-medium mb-1">البريد الإلكتروني</h3>
            <p className="text-gray-400 text-sm">support@hamoksha.com</p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-neon-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-neon-green" />
            </div>
            <h3 className="text-white font-medium mb-1">ساعات العمل</h3>
            <p className="text-gray-400 text-sm">طوال اليوم 24/7</p>
          </div>

          <div className="glass rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-neon-blue/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-neon-blue" />
            </div>
            <h3 className="text-white font-medium mb-1">الموقع</h3>
            <p className="text-gray-400 text-sm">مصر</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">أرسل رسالة</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">الاسم</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-dark"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-dark"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">الموضوع</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="input-dark"
                placeholder="موضوع الرسالة"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">الرسالة</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-dark min-h-[150px] resize-none"
                placeholder="اكتب رسالتك هنا..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="spinner" />
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>إرسال الرسالة</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

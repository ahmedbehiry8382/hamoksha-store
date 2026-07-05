import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'كيف أقوم بعملية الشراء؟',
    answer: 'اختر المنتج المطلوب، أدخل معرف اللاعب أو بيانات التواصل، اختر الباقة المناسبة، حدد طريقة الدفع، ثم أكمل الطلب. سنتواصل معك خلال دقائق لتأكيد الطلب.',
  },
  {
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نقبل الدفع عبر Visa/Mastercard، Vodafone Cash، PayPal، وFawry. جميع طرق الدفع آمنة ومشفرة.',
  },
  {
    question: 'كم يستغرق استلام المنتج؟',
    answer: 'معظم الطلبات تتم خلال 5-15 دقيقة بعد تأكيد الدفع. في أوقات الذروة قد يستغرق الأمر حتى ساعة. نعمل على مدار الساعة لتقديم أسرع خدمة.',
  },
  {
    question: 'ماذا لو أدخلت معرف اللاعب بشكل خاطئ؟',
    answer: 'ننصح دائماً بالتحقق من البيانات قبل الإرسال. إذا اكتشفت خطأ قبل معالجة الطلب، تواصل معنا فوراً. بعد إتمام الشحن، نتحمل مسؤولية إعادة المحاولة في بعض الحالات.',
  },
  {
    question: 'هل يمكنني استرداد المبلغ؟',
    answer: 'بسبب طبيعة المنتجات الرقمية، لا يمكن استرداد المبلغ بعد إتمام عملية الشحن. إذا كان هناك خطأ من جانبنا، سنعيد شحن المنتج أو استرداد المبلغ.',
  },
  {
    question: 'كيف أعرف أن الشحن تم بنجاح؟',
    answer: 'سنرسل لك رسالة تأكيد عبر الواتساب أو البريد الإلكتروني مع تفاصيل العملية. يمكنك أيضاً التحقق من رصيدك في اللعبة.',
  },
  {
    question: 'هل الموقع آمن؟',
    answer: 'نعم، نستخدم أحدث تقنيات التشفير وأمان المعلومات. بيانات الدفع تتم معالجتها بواسطة شركات دفع معتمدة ولا نحتفظ بها.',
  },
  {
    question: 'ما هي الدول التي تدعمونها؟',
    answer: 'نقدم خدماتنا بشكل أساسي لمصر. بعض المنتجات متاحة لمناطق أخرى - تحقق من صفحة المنتج للتفاصيل.',
  },
  {
    question: 'كيف أجد معرف اللاعب (Player ID)؟',
    answer: 'في معظم الألعاب، ستجد المعرف في إعدادات الحساب أو الملف الشخصي. عادةً ما يكون رقماً أو رمزاً فريداً. يمكنك البحث في اليوتيوب عن "كيفية إيجاد Player ID + اسم اللعبة".',
  },
  {
    question: 'كيف أتواصل مع الدعم الفني؟',
    answer: 'يمكنك التواصل معنا عبر البريد الإلكتروني support@hamoksha.com. نرد على جميع الاستفسارات خلال 24 ساعة.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <div className="w-16 h-16 bg-neon-green/20 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-neon-green" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">الأسئلة الشائعة</h1>
              <p className="text-gray-400">إجابات على أكثر الأسئلة شيوعاً</p>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="glass rounded-2xl p-6">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-right hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neon-purple transition-transform duration-300 flex-shrink-0 mr-4 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="glass rounded-2xl p-8 mt-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">لم تجد إجابة لسؤالك؟</h3>
          <p className="text-gray-400 mb-6">تواصل معنا وسنساعدك في أقرب وقت</p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            <span>تواصل معنا</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

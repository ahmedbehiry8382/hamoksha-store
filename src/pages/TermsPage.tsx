import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

export default function TermsPage() {
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
            <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-neon-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">الشروط والأحكام</h1>
              <p className="text-gray-400">آخر تحديث: يوليو 2024</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-8">
          <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">قبول الشروط</h2>
              <p>
                باستخدامك لخدمات Hamoksha Store، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يرجى عدم استخدام الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">الخدمات المقدمة</h2>
              <p>
                نقدم خدمات شحن الألعاب والبطاقات الرقمية. نلتزم بتقديم المنتجات كما هو موصوف، لكننا نحتفظ بالحق في تعديل أو إيقاف أي خدمة دون إشعار مسبق.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">الأسعار والدفع</h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>جميع الأسعار بالجنيه المصري ما لم يذكر خلاف ذلك</li>
                <li>يجب إتمام الدفع قبل معالجة الطلب</li>
                <li>نحتفظ بالحق في تعديل الأسعار في أي وقت</li>
                <li>الأسعار المعروضة شاملة الضريبة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">سياسة الاسترداد</h2>
              <p>بسبب طبيعة المنتجات الرقمية:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>لا يمكن استرداد المبلغ بعد إتمام عملية الشحن</li>
                <li>في حال وجود خطأ من جانبنا، نلتزم بإعادة شحن المنتج</li>
                <li>يتحمل العميل مسؤولية إدخال بيانات صحيحة</li>
                <li>يمكن إلغاء الطلب قبل المعالجة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">مسؤوليات المستخدم</h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>تقديم معلومات صحيحة ودقيقة</li>
                <li>عدم استخدام الموقع لأغراض غير قانونية</li>
                <li>المحافظة على سرية حساباتك</li>
                <li>عدم محاولة اختراق أو إتلاف الموقع</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">الملكية الفكرية</h2>
              <p>
                جميع المحتويات على الموقع - بما في ذلك النصوص والصور والشعارات - مملوكة لـ Hamoksha Store أو مرخصة لها. يُمنع نسخ أو توزيع أي محتوى دون إذن مسبق.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">حدود المسؤولية</h2>
              <p>
                نحن غير مسؤولين عن الأضرار غير المباشرة أو العرضية الناتجة عن استخدام خدماتنا. مسؤوليتنا تقتصر على قيمة المنتج المشترى.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">القانون الواجب التطبيق</h2>
              <p>
                تخضع هذه الشروط وأي نزاعات للقوانين المصرية. في حال وجود نزاع، يتم حله في محاكم جمهورية مصر العربية.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">التعديلات</h2>
              <p>
                نحتفظ بالحق في تعديل هذه الشروط في أي وقت.ستصبح التعديلات سارية فور نشرها على الموقع.استمرارك في استخدام الموقع يعني موافقتك على الشروط المعدلة.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">التواصل</h2>
              <p>
                لأي استفسارات بخصوص الشروط والأحكام، يرجى التواصل عبر: support@hamoksha.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

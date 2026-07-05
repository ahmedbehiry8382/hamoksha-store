import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';

export default function PrivacyPage() {
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
            <div className="w-16 h-16 bg-neon-purple/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-neon-purple" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">سياسة الخصوصية</h1>
              <p className="text-gray-400">آخر تحديث: يوليو 2024</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-8">
          <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">مقدمة</h2>
              <p>
                نحن في Hamoksha Store نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية عند استخدامك لموقعنا وخدماتنا.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">المعلومات التي نجمعها</h2>
              <p> نجمع الأنواع التالية من المعلومات:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>معلومات التواصل: مثل رقم الواتساب والبريد الإلكتروني</li>
                <li>بيانات الطلبات: معرف اللاعب والمنتجات المطلوبة</li>
                <li>معلومات الدفع: وتتم معالجتها بشكل آمن من خلال جهات خارجية</li>
                <li>بيانات الاستخدام: مثل عناوين IP ونوع المتصفح</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">كيف نستخدم معلوماتك</h2>
              <p>نستخدم المعلومات التي نجمعها لـ:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>معالجة طلبات الشراء وتوصيل المنتجات</li>
                <li>التواصل معك بخصوص طلباتك</li>
                <li>تحسين خدماتنا وتجربة المستخدم</li>
                <li>إرسال العروض والتحديثات (بموافقتك)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">حماية البيانات</h2>
              <p>
                نتخذ إجراءات أمنية صارمة لحماية بياناتك، بما في ذلك تشفير البيانات المرسلة واستخدام خوادم آمنة. لا نبيع أو نشارك بياناتك مع أطراف ثالثة إلا في حالات الضرورة القانونية.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">حقوقك</h2>
              <p>لديك الحق في:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>طلب الوصول إلى بياناتك</li>
                <li>طلب تعديل أو حذف بياناتك</li>
                <li>الاعتراض على معالجة بياناتك</li>
                <li>تقديم شكوى لجهات حماية البيانات</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">ملفات تعريف الارتباط</h2>
              <p>
                نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح. يمكنك تعطيلها من إعدادات المتصفح، لكن ذلك قد يؤثر على بعض وظائف الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">التواصل</h2>
              <p>
                لأي استفسارات بخصوص سياسة الخصوصية، يمكنك التواصل معنا عبر البريد الإلكتروني: support@hamoksha.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

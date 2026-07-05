import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Product, Package } from '../types';
import {
  ArrowRight,
  Check,
  User,
  Package as PackageIcon,
  CreditCard,
  Loader2,
  Info,
  ShoppingCart,
  Gamepad2,
} from 'lucide-react';

const VODAFONE_CASH_NUMBER = '01080308169';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [step, setStep] = useState(1);
  const [playerId, setPlayerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!product) return;

    // Step 1 validation
    if (step === 1) {
      if (!playerId.trim()) {
        alert(product.category === 'cards'
          ? 'الرجاء إدخال رقم الواتساب أو البريد الإلكتروني'
          : 'الرجاء إدخال معرف اللاعب');
        return;
      }
      setStep(2);
      return;
    }

    // Step 2 validation
    if (step === 2) {
      if (!selectedPackage) {
        alert('الرجاء اختيار باقة');
        return;
      }
      setStep(3);
      return;
    }

    // Step 3 validation and submission
    if (step === 3) {
      if (!contactNumber.trim()) {
        alert('الرجاء إدخال رقم الواتساب');
        return;
      }

      // Submit order
      setSubmitting(true);
      try {
        const { data, error } = await supabase
          .from('orders')
          .insert({
            product_id: product.id,
            product_name: product.name,
            player_id: playerId,
            contact_number: contactNumber,
            selected_package: selectedPackage!.name,
            total_price: selectedPackage!.price,
            payment_method: 'vodafone_cash',
            status: 'pending',
          })
          .select('id')
          .single();

        if (error) throw error;

        // Redirect to Thank You page with order details
        navigate('/thank-you', {
          state: {
            order: {
              orderId: data.id,
              productName: product.name,
              packageName: selectedPackage!.name,
              totalPrice: selectedPackage!.price,
              playerId: playerId,
              contactNumber: contactNumber,
            },
          },
        });
      } catch (error) {
        console.error('Error submitting order:', error);
        alert('حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return playerId.trim().length > 0;
      case 2:
        return selectedPackage !== null;
      case 3:
        return contactNumber.trim().length > 0;
      default:
        return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-neon-purple animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <Gamepad2 className="w-20 h-20 text-gray-600 mb-4" />
        <p className="text-gray-400 text-xl mb-4">المنتج غير موجود</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors mb-6 group"
        >
          <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>العودة للمنتجات</span>
        </button>

        {/* Product Header */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={product.image_url || 'https://images.pexels.com/photo/3165750/pexels-photo-3165750.jpeg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-right flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.name}</h1>
              {product.description && (
                <p className="text-gray-400">{product.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step >= s
                    ? 'bg-neon-purple text-white'
                    : 'bg-navy-800 text-gray-500 border border-white/10'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 md:w-24 h-1 mx-2 rounded-full transition-all duration-300 ${
                    step > s ? 'bg-neon-purple' : 'bg-navy-800'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="glass rounded-2xl p-6 mb-8">
          {/* Step 1: Player ID or Contact */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-neon-purple/20 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {product.category === 'cards'
                      ? 'الخطوة 1: أدخل بيانات التواصل'
                      : 'الخطوة 1: أدخل معرف اللاعب'}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {product.category === 'cards'
                      ? 'أدخل رقم الواتساب أو البريد الإلكتروني لاستلام البطاقة'
                      : 'أدخل الـ ID الخاص بحسابك في اللعبة'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  placeholder={product.category === 'cards'
                    ? 'أدخل رقم الواتساب أو البريد الإلكتروني'
                    : 'أدخل معرف اللاعب (Player ID)'}
                  className="input-dark text-lg"
                />

                {/* Helper Info */}
                <div className="glass rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-400">
                      {product.category === 'cards' ? (
                        <>
                          <p className="font-medium text-white mb-2">كيف ستستلم البطاقة؟</p>
                          <p>سيتم إرسال كود البطاقة إلى رقم الواتساب أو البريد الإلكتروني الذي تدخله خلال دقائق معدودة.</p>
                        </>
                      ) : (
                        <>
                          <p className="font-medium text-white mb-2">كيف تجد معرف اللاعب؟</p>
                          <p>في معظم الألعاب، ستجد معرف اللاعب في إعدادات الحساب أو الملف الشخصي. يكون عادةً عبارة عن رقم أو رمز فريد.</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Select Package */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-neon-green/20 rounded-xl flex items-center justify-center">
                  <PackageIcon className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">الخطوة 2: اختر قيمة الشحن</h2>
                  <p className="text-gray-400 text-sm">اختر الباقة المناسبة لك</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedPackage?.id === pkg.id
                        ? 'package-selected'
                        : 'border-white/10 bg-navy-800 hover:border-neon-purple/50'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2 left-2 bg-neon-orange text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        الأكثر مبيعاً
                      </span>
                    )}
                    <p className="text-lg font-bold text-white mb-1">{pkg.amount}</p>
                    <p className="text-sm text-gray-400 mb-2">{pkg.name}</p>
                    <p className="text-neon-green font-bold text-xl">
                      {pkg.price.toLocaleString()} ج.م
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-neon-green/20 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">الخطوة 3: طريقة الدفع</h2>
                  <p className="text-gray-400 text-sm">الدفع عبر فودافون كاش</p>
                </div>
              </div>

              {/* Vodafone Cash Card */}
              <div className="glass rounded-2xl p-6 mb-6 border-2 border-neon-green/50 bg-neon-green/5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-neon-green/20 rounded-xl flex items-center justify-center">
                    <span className="text-4xl">📱</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">فودافون كاش</h3>
                    <p className="text-neon-green text-xl font-bold" dir="ltr">{VODAFONE_CASH_NUMBER}</p>
                  </div>
                </div>
              </div>

              {/* Payment Note */}
              <div className="glass rounded-xl p-4 mb-6 border border-neon-orange/30">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-neon-orange flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm">
                    <span className="text-neon-orange font-medium">ملاحظة هامة:</span>{' '}
                    بعد التحويل، يرجى إرسال صورة التحويل عبر واتساب لإتمام الطلب فوراً.
                  </p>
                </div>
              </div>

              {/* Contact Number */}
              <div className="mt-6">
                <label className="block text-white font-medium mb-2">
                  رقم الواتساب للتواصل
                </label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="أدخل رقم الواتساب"
                  className="input-dark"
                  dir="ltr"
                />
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {selectedPackage && (
          <div className="glass rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-neon-purple" />
              ملخص الطلب
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <span>المنتج:</span>
                <span className="text-white">{product.name}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>{product.category === 'cards' ? 'بيانات التواصل:' : 'المعرف:'}</span>
                <span className="text-white" dir="ltr">{playerId || '-'}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>الباقة:</span>
                <span className="text-white">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>طريقة الدفع:</span>
                <span className="text-white">فودافون كاش</span>
              </div>
              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">الإجمالي:</span>
                  <span className="text-2xl font-bold text-neon-green">
                    {selectedPackage.price.toLocaleString()} ج.م
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!canProceed() || submitting}
          className={`w-full btn-primary flex items-center justify-center gap-3 ${
            !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>جاري الإرسال...</span>
            </>
          ) : step < 3 ? (
            <>
              <span>التالي</span>
              <ArrowRight className="w-5 h-5 rotate-180" />
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>إتمام الشراء</span>
            </>
          )}
        </button>

        {/* Back Button */}
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full btn-secondary mt-4 flex items-center justify-center gap-2"
            disabled={submitting}
          >
            <ArrowRight className="w-5 h-5" />
            <span>السابق</span>
          </button>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Copy, Home, Package, MessageCircle } from 'lucide-react';

interface OrderSummary {
  orderId: string;
  productName: string;
  packageName: string;
  totalPrice: number;
  playerId: string;
  contactNumber: string;
}

export default function ThankYouPage() {
  const location = useLocation();
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    }
  }, [location.state]);

  const copyOrderId = () => {
    if (order?.orderId) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = '201080308169';
    const message = `مرحباً، أريد متابعة طلبي رقم: ${order?.orderId}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <Package className="w-20 h-20 text-gray-600 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-4">لم يتم العثور على الطلب</h1>
        <Link to="/" className="btn-primary flex items-center gap-2">
          <Home className="w-5 h-5" />
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8 animate-bounce-slow">
          <div className="w-24 h-24 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-14 h-14 text-neon-green" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">تم الطلب بنجاح!</h1>
          <p className="text-gray-400">شكراً لتعاملكم معنا</p>
        </div>

        {/* Order ID Card */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">رقم الطلب</h2>
            <button
              onClick={copyOrderId}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${
                copied
                  ? 'bg-neon-green/20 text-neon-green'
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <Copy className="w-4 h-4" />
              <span className="text-sm">{copied ? 'تم النسخ!' : 'نسخ'}</span>
            </button>
          </div>
          <p className="text-3xl font-mono text-neon-purple text-center py-4 bg-navy-800/50 rounded-xl">
            {order.orderId}
          </p>
        </div>

        {/* Order Summary */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-neon-purple" />
            ملخص الطلب
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">المنتج:</span>
              <span className="text-white font-medium">{order.productName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">الباقة:</span>
              <span className="text-white">{order.packageName}</span>
            </div>
            {order.playerId && (
              <div className="flex justify-between">
                <span className="text-gray-400">المعرف:</span>
                <span className="text-white" dir="ltr">{order.playerId}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">رقم التواصل:</span>
              <span className="text-white" dir="ltr">{order.contactNumber}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
              <span className="text-white">الإجمالي:</span>
              <span className="text-neon-green">{order.totalPrice.toLocaleString()} ج.م</span>
            </div>
          </div>
        </div>

        {/* Payment Reminder */}
        <div className="glass rounded-2xl p-6 mb-6 border border-neon-orange/30">
          <h3 className="text-neon-orange font-bold mb-2">تنبيه هام</h3>
          <p className="text-gray-300 text-sm mb-4">
            طريق الدفع: فودافون كاش - 01080308169
          </p>
          <p className="text-gray-400 text-sm">
            بعد التحويل، يرجى إرسال صورة التحويل عبر واتساب لإتمام الطلب فوراً.
          </p>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={openWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-3 mb-4 transition-all"
        >
          <MessageCircle className="w-6 h-6" />
          إرسال صورة التحويل عبر واتساب
        </button>

        {/* Track Order Link */}
        <Link
          to={`/track-order?id=${order.orderId}`}
          className="block w-full btn-secondary text-center py-4 mb-4"
        >
          تتبع الطلب
        </Link>

        {/* Home Link */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-gray-400 hover:text-neon-purple transition-colors"
        >
          <Home className="w-5 h-5" />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}

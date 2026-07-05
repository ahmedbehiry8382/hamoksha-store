import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Home,
  MessageCircle,
  AlertCircle,
} from 'lucide-react';

interface OrderDetails {
  id: string;
  product_name: string;
  player_id: string;
  selected_package: string;
  total_price: number;
  payment_method: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  contact_number: string;
}

const statusConfig = {
  pending: {
    label: 'قيد الانتظار',
    color: 'text-neon-orange',
    bgColor: 'bg-neon-orange/20',
    icon: Clock,
    description: 'تم استلام طلبك وهو في انتظار المعالجة',
  },
  processing: {
    label: 'جاري التنفيذ',
    color: 'text-neon-blue',
    bgColor: 'bg-neon-blue/20',
    icon: Loader2,
    description: 'يتم تنفيذ طلبك حالياً',
  },
  completed: {
    label: 'تم التنفيذ',
    color: 'text-neon-green',
    bgColor: 'bg-neon-green/20',
    icon: CheckCircle,
    description: 'تم تنفيذ طلبك بنجاح',
  },
  cancelled: {
    label: 'ملغي',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    icon: XCircle,
    description: 'تم إلغاء الطلب',
  },
};

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam) {
      setOrderId(idParam);
      searchOrder(idParam);
    }
  }, [searchParams]);

  const searchOrder = async (id?: string) => {
    const searchId = id || orderId;
    if (!searchId.trim()) {
      setError('الرجاء إدخال رقم الطلب');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', searchId.trim())
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        setOrder(data as OrderDetails);
      } else {
        setError('لم يتم العثور على طلب بهذا الرقم');
        setOrder(null);
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('حدث خطأ أثناء البحث عن الطلب');
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = '201080308169';
    const message = `مرحباً، أريد الاستفسار عن طلبي رقم: ${orderId}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neon-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-neon-purple" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">تتبع الطلب</h1>
          <p className="text-gray-400">أدخل رقم الطلب لمعرفة حالته</p>
        </div>

        {/* Search Box */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchOrder()}
              placeholder="أدخل رقم الطلب..."
              className="input-dark flex-1"
              dir="ltr"
            />
            <button
              onClick={() => searchOrder()}
              disabled={loading}
              className="btn-primary px-6 flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass rounded-xl p-4 mb-6 border border-red-500/30 bg-red-500/10">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Order Results */}
        {order && (
          <div className="animate-fade-in">
            {/* Status Card */}
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="text-center mb-6">
                {(() => {
                  const config = statusConfig[order.status];
                  const Icon = config.icon;
                  return (
                    <>
                      <div className={`w-20 h-20 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-10 h-10 ${config.color} ${order.status === 'processing' ? 'animate-spin' : ''}`} />
                      </div>
                      <h2 className={`text-2xl font-bold ${config.color} mb-2`}>
                        {config.label}
                      </h2>
                      <p className="text-gray-400">{config.description}</p>
                    </>
                  );
                })()}
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-6 px-4">
                {['pending', 'processing', 'completed'].map((step, index) => {
                  const config = statusConfig[step as keyof typeof statusConfig];
                  const statusOrder = ['pending', 'processing', 'completed'];
                  const currentIndex = statusOrder.indexOf(order.status);
                  const stepIndex = index;
                  const isActive = stepIndex <= currentIndex && order.status !== 'cancelled';

                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isActive
                          ? config.bgColor
                          : 'bg-navy-800'
                      }`}>
                        {isActive ? (
                          <config.icon className={`w-5 h-5 ${config.color}`} />
                        ) : (
                          <div className="w-3 h-3 bg-gray-600 rounded-full" />
                        )}
                      </div>
                      <span className={`text-xs ${isActive ? config.color : 'text-gray-600'}`}>
                        {config.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Details */}
            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">تفاصيل الطلب</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">رقم الطلب:</span>
                  <span className="text-white font-mono" dir="ltr">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">المنتج:</span>
                  <span className="text-white">{order.product_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">الباقة:</span>
                  <span className="text-white">{order.selected_package}</span>
                </div>
                {order.player_id && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">المعرف:</span>
                    <span className="text-white" dir="ltr">{order.player_id}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">طريقة الدفع:</span>
                  <span className="text-white">
                    {order.payment_method === 'vodafone_cash' ? 'فودافون كاش' : order.payment_method}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">تاريخ الطلب:</span>
                  <span className="text-white">{formatDate(order.created_at)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
                  <span className="text-white">الإجمالي:</span>
                  <span className="text-neon-green">{order.total_price.toLocaleString()} ج.م</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Support */}
            <button
              onClick={openWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-3 mb-4 transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              تواصل معنا عبر واتساب
            </button>
          </div>
        )}

        {/* No Results */}
        {searched && !order && !error && (
          <div className="text-center py-8">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">لم يتم العثور على طلب</p>
          </div>
        )}

        {/* Home Link */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors"
          >
            <Home className="w-5 h-5" />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

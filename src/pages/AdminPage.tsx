import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product, Order, OrderStatus } from '../types';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  Package,
  ShoppingBag,
  TrendingUp,
  Clock,
  Loader2,
  Save,
  Gamepad2,
  CreditCard,
  Lock,
  Wrench,
} from 'lucide-react';

type AdminTab = 'products' | 'orders';
type ProductFormState = {
  id?: string;
  name: string;
  category: 'games' | 'cards' | 'services';
  description: string;
  image_url: string;
  packages: { id: string; name: string; amount: string; price: number; popular?: boolean }[];
};

const emptyProductForm: ProductFormState = {
  name: '',
  category: 'games',
  description: '',
  image_url: '',
  packages: [{ id: '1', name: '', amount: '', price: 0 }],
};

const ADMIN_PASSWORD = 'hamoksha2024';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProductForm);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, totalRevenue: 0 });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('كلمة المرور غير صحيحة');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
      ]);

      setProducts(productsRes.data || []);
      setOrders(ordersRes.data || []);

      // Calculate stats
      const pending = (ordersRes.data || []).filter(o => o.status === 'pending').length;
      const revenue = (ordersRes.data || [])
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + o.total_price, 0);

      setStats({
        totalOrders: ordersRes.data?.length || 0,
        pendingOrders: pending,
        totalRevenue: revenue,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!productForm.name.trim()) {
      alert('الرجاء إدخال اسم المنتج');
      return;
    }

    setSaving(true);
    try {
      const productData = {
        name: productForm.name,
        category: productForm.category,
        description: productForm.description,
        image_url: productForm.image_url,
        packages: productForm.packages,
        is_active: true,
      };

      if (productForm.id) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', productForm.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert(productData);
        if (error) throw error;
      }

      setShowProductModal(false);
      setProductForm(emptyProductForm);
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('حدث خطأ أثناء حفظ المنتج');
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description || '',
      image_url: product.image_url || '',
      packages: product.packages as ProductFormState['packages'],
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const addPackage = () => {
    setProductForm({
      ...productForm,
      packages: [
        ...productForm.packages,
        { id: String(productForm.packages.length + 1), name: '', amount: '', price: 0 },
      ],
    });
  };

  const updatePackage = (index: number, field: string, value: string | number | boolean) => {
    const newPackages = [...productForm.packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setProductForm({ ...productForm, packages: newPackages });
  };

  const removePackage = (index: number) => {
    if (productForm.packages.length <= 1) return;
    const newPackages = productForm.packages.filter((_, i) => i !== index);
    setProductForm({ ...productForm, packages: newPackages });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <span className="badge-pending">قيد الانتظار</span>;
      case 'completed':
        return <span className="badge-completed">تم التنفيذ</span>;
      case 'cancelled':
        return <span className="badge-cancelled">ملغي</span>;
    }
  };

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-neon-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-neon-purple" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">لوحة التحكم</h1>
            <p className="text-gray-400">أدخل كلمة المرور للوصول</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-dark text-center"
                placeholder="••••••••"
              />
              {passwordError && (
                <p className="text-red-400 text-sm mt-2 text-center">{passwordError}</p>
              )}
            </div>
            <button type="submit" className="btn-primary w-full">
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-neon-purple animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">لوحة التحكم</h1>
          <p className="text-gray-400">إدارة المنتجات والطلبات</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-neon-purple/20 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-neon-purple" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-neon-orange/20 rounded-xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-neon-orange" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">طلبات معلقة</p>
                <p className="text-2xl font-bold text-white">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-neon-green/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-neon-green" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">إجمالي الأرباح</p>
                <p className="text-2xl font-bold text-white">{stats.totalRevenue.toLocaleString()} ج.م</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'products'
                ? 'bg-neon-purple text-white'
                : 'bg-navy-800 text-gray-300 hover:bg-navy-700'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>المنتجات ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'orders'
                ? 'bg-neon-purple text-white'
                : 'bg-navy-800 text-gray-300 hover:bg-navy-700'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>الطلبات ({orders.length})</span>
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => {
                  setProductForm(emptyProductForm);
                  setShowProductModal(true);
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>إضافة منتج</span>
              </button>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
              <table className="table-dark">
                <thead>
                  <tr>
                    <th>المنتج</th>
                    <th>القسم</th>
                    <th>عدد الباقات</th>
                    <th>الحالة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image_url || 'https://images.pexels.com/photo/3165750/pexels-photo-3165750.jpeg'}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="flex items-center gap-2">
                          {product.category === 'games' ? (
                            <>
                              <Gamepad2 className="w-4 h-4 text-neon-blue" />
                              <span>لعبة</span>
                            </>
                          ) : product.category === 'cards' ? (
                            <>
                              <CreditCard className="w-4 h-4 text-neon-green" />
                              <span>بطاقة</span>
                            </>
                          ) : (
                            <>
                              <Wrench className="w-4 h-4 text-neon-orange" />
                              <span>خدمة</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td>{product.packages.length} باقة</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.is_active
                            ? 'bg-neon-green/20 text-neon-green'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {product.is_active ? 'نشط' : 'معطل'}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-dark min-w-full">
                <thead>
                  <tr>
                    <th>رقم الطلب</th>
                    <th>المنتج</th>
                    <th>المعرف</th>
                    <th>الباقة</th>
                    <th>السعر</th>
                    <th>طريقة الدفع</th>
                    <th>الحالة</th>
                    <th>التاريخ</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="font-mono text-sm">{order.id.slice(0, 8)}</td>
                      <td className="font-medium">{order.product_name}</td>
                      <td dir="ltr">{order.player_id || '-'}</td>
                      <td>{order.selected_package}</td>
                      <td className="text-neon-green font-medium">
                        {order.total_price.toLocaleString()} ج.م
                      </td>
                      <td>{order.payment_method}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td className="text-gray-400 text-sm">
                        {new Date(order.created_at).toLocaleDateString('ar-EG')}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                            disabled={order.status === 'completed'}
                            className="p-2 bg-neon-green/20 text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors disabled:opacity-50"
                            title="تم التنفيذ"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                            disabled={order.status === 'cancelled'}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                            title="إلغاء"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {orders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">لا توجد طلبات حتى الآن</p>
              </div>
            )}
          </div>
        )}

        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-navy-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  {productForm.id ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                </h2>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">اسم المنتج</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="input-dark"
                    placeholder="مثال: Free Fire"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">القسم</label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value as 'games' | 'cards' | 'services',
                      })
                    }
                    className="input-dark"
                  >
                    <option value="games">شحن الألعاب</option>
                    <option value="cards">البطاقات الرقمية</option>
                    <option value="services">خدمات متنوعة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">الوصف</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="input-dark min-h-[100px]"
                    placeholder="وصف المنتج..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">رابط الصورة</label>
                  <input
                    type="text"
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    className="input-dark"
                    placeholder="https://..."
                  />
                </div>

                {/* Packages */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-white font-medium">الباقات والأسعار</label>
                    <button
                      type="button"
                      onClick={addPackage}
                      className="btn-secondary text-sm py-2 px-4"
                    >
                      <Plus className="w-4 h-4 inline ml-1" />
                      إضافة باقة
                    </button>
                  </div>

                  <div className="space-y-3">
                    {productForm.packages.map((pkg, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap gap-3 p-4 bg-navy-800 rounded-xl items-end"
                      >
                        <div className="flex-1 min-w-[120px]">
                          <label className="text-gray-400 text-xs mb-1 block">الاسم</label>
                          <input
                            type="text"
                            value={pkg.name}
                            onChange={(e) => updatePackage(index, 'name', e.target.value)}
                            className="input-dark text-sm"
                            placeholder="مثال: 100 جوهرة"
                          />
                        </div>
                        <div className="w-24">
                          <label className="text-gray-400 text-xs mb-1 block">الكمية</label>
                          <input
                            type="text"
                            value={pkg.amount}
                            onChange={(e) => updatePackage(index, 'amount', e.target.value)}
                            className="input-dark text-sm"
                            placeholder="100"
                          />
                        </div>
                        <div className="w-32">
                          <label className="text-gray-400 text-xs mb-1 block">السعر (ج.م)</label>
                          <input
                            type="number"
                            value={pkg.price}
                            onChange={(e) => updatePackage(index, 'price', Number(e.target.value))}
                            className="input-dark text-sm"
                            placeholder="25"
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={pkg.popular || false}
                              onChange={(e) => updatePackage(index, 'popular', e.target.checked)}
                              className="w-4 h-4 accent-neon-purple"
                            />
                            <span className="text-gray-400 text-sm">الأكثر مبيعاً</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => removePackage(index)}
                            className="text-red-400 hover:text-red-300 p-1"
                            disabled={productForm.packages.length <= 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 flex gap-4 justify-end">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="btn-secondary"
                  disabled={saving}
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSaveProduct}
                  disabled={saving}
                  className="btn-primary flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>جاري الحفظ...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>حفظ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';
import { Gamepad2, CreditCard, Loader2, Wrench } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'games' | 'cards' | 'services'>('all');
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, activeCategory, products]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // If no products, seed with sample data
      if (!data || data.length === 0) {
        await seedSampleProducts();
        const { data: newData } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        setProducts(newData || []);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedSampleProducts = async () => {
    const sampleProducts = [
      {
        name: 'Free Fire',
        category: 'games',
        description: 'شحن جواهر فري فاير بأفضل الأسعار وأسرع خدمة توصيل',
        image_url: 'https://images.pexels.com/photo/7915368/pexels-photo-7915368.jpeg',
        packages: [
          { id: '1', name: '100 جوهرة', amount: '100', price: 25 },
          { id: '2', name: '310 جوهرة', amount: '310', price: 75, popular: true },
          { id: '3', name: '520 جوهرة', amount: '520', price: 120 },
          { id: '4', name: '1060 جوهرة', amount: '1060', price: 240 },
          { id: '5', name: '2180 جوهرة', amount: '2180', price: 480 },
        ],
        is_active: true
      },
      {
        name: 'PUBG Mobile',
        category: 'games',
        description: 'شحن UC ببجي موبايل - عملة اللعبة الرسمية',
        image_url: 'https://images.pexels.com/photo/3165750/pexels-photo-3165750.jpeg',
        packages: [
          { id: '1', name: '60 UC', amount: '60', price: 30 },
          { id: '2', name: '325 UC', amount: '325', price: 150, popular: true },
          { id: '3', name: '660 UC', amount: '660', price: 300 },
          { id: '4', name: '1800 UC', amount: '1800', price: 750 },
          { id: '5', name: '3850 UC', amount: '3850', price: 1500 },
        ],
        is_active: true
      },
      {
        name: 'Google Play',
        category: 'cards',
        description: 'بطاقات جوجل بلاي للشراء من المتجر بكل سهولة',
        image_url: 'https://images.pexels.com/photo/2653785/pexels-photo-2653785.jpeg',
        packages: [
          { id: '1', name: '5 دولار', amount: '$5', price: 100 },
          { id: '2', name: '10 دولار', amount: '$10', price: 200, popular: true },
          { id: '3', name: '25 دولار', amount: '$25', price: 500 },
          { id: '4', name: '50 دولار', amount: '$50', price: 1000 },
        ],
        is_active: true
      },
      {
        name: 'iTunes',
        category: 'cards',
        description: 'بطاقات آيتونز للايفون والأيباد',
        image_url: 'https://images.pexels.com/photo/1468490231/pexels-photo-1468490231.jpeg',
        packages: [
          { id: '1', name: '10 دولار', amount: '$10', price: 220 },
          { id: '2', name: '25 دولار', amount: '$25', price: 550, popular: true },
          { id: '3', name: '50 دولار', amount: '$50', price: 1100 },
        ],
        is_active: true
      },
      {
        name: 'Roblox',
        category: 'games',
        description: 'شحن روبوكس روبلوكس - عملة اللعبة الشهيرة',
        image_url: 'https://images.pexels.com/photo/163077/watercolor-pattern-paint-163077.jpeg',
        packages: [
          { id: '1', name: '400 Robux', amount: '400', price: 100 },
          { id: '2', name: '800 Robux', amount: '800', price: 200, popular: true },
          { id: '3', name: '1700 Robux', amount: '1700', price: 400 },
          { id: '4', name: '4500 Robux', amount: '4500', price: 1000 },
        ],
        is_active: true
      },
      {
        name: 'PlayStation',
        category: 'cards',
        description: 'بطاقات بلايستيشن للتطبيقات والألعاب',
        image_url: 'https://images.pexels.com/photo/2519909/pexels-photo-2519909.jpeg',
        packages: [
          { id: '1', name: '10 دولار', amount: '$10', price: 210 },
          { id: '2', name: '20 دولار', amount: '$20', price: 420, popular: true },
          { id: '3', name: '50 دولار', amount: '$50', price: 1050 },
        ],
        is_active: true
      },
      {
        name: 'Clash of Clans',
        category: 'games',
        description: 'شحن جواهر كلاش أوف كلانس',
        image_url: 'https://images.pexels.com/photo/4226257/pexels-photo-4226257.jpeg',
        packages: [
          { id: '1', name: '80 جوهرة', amount: '80', price: 15 },
          { id: '2', name: '500 جوهرة', amount: '500', price: 75, popular: true },
          { id: '3', name: '1200 جوهرة', amount: '1200', price: 175 },
          { id: '4', name: '2500 جوهرة', amount: '2500', price: 350 },
        ],
        is_active: true
      },
      {
        name: 'Xbox',
        category: 'cards',
        description: 'بطاقات إكس بوكس غيم كارد',
        image_url: 'https://images.pexels.com/photo/2750390/pexels-photo-2750390.jpeg',
        packages: [
          { id: '1', name: '10 دولار', amount: '$10', price: 200 },
          { id: '2', name: '25 دولار', amount: '$25', price: 500, popular: true },
          { id: '3', name: '50 دولار', amount: '$50', price: 1000 },
        ],
        is_active: true
      },
    ];

    const { error } = await supabase
      .from('products')
      .insert(sampleProducts);

    if (error) {
      console.error('Error seeding products:', error);
    }
  };

  const filterProducts = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    let filtered = [...products];

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(query) ||
             p.description?.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: 'all' | 'games' | 'cards' | 'services') => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen">
      <HeroBanner />

      {/* Category Filter */}
      <section id="products" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              اختر <span className="gradient-text">منتجك</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              نقدم مجموعة واسعة من منتجات شحن الألعاب والبطاقات الرقمية بأفضل الأسعار
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-neon-purple text-white shadow-lg shadow-neon-purple/25'
                  : 'bg-navy-800 text-gray-300 hover:bg-navy-700 border border-white/10'
              }`}
            >
              <span>الكل</span>
            </button>
            <button
              onClick={() => handleCategoryChange('games')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === 'games'
                  ? 'bg-neon-purple text-white shadow-lg shadow-neon-purple/25'
                  : 'bg-navy-800 text-gray-300 hover:bg-navy-700 border border-white/10'
              }`}
            >
              <Gamepad2 className="w-5 h-5" />
              <span>شحن الألعاب</span>
            </button>
            <button
              onClick={() => handleCategoryChange('cards')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === 'cards'
                  ? 'bg-neon-purple text-white shadow-lg shadow-neon-purple/25'
                  : 'bg-navy-800 text-gray-300 hover:bg-navy-700 border border-white/10'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>البطاقات الرقمية</span>
            </button>
            <button
              onClick={() => handleCategoryChange('services')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === 'services'
                  ? 'bg-neon-purple text-white shadow-lg shadow-neon-purple/25'
                  : 'bg-navy-800 text-gray-300 hover:bg-navy-700 border border-white/10'
              }`}
            >
              <Wrench className="w-5 h-5" />
              <span>خدمات متنوعة</span>
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-neon-purple animate-spin mb-4" />
              <p className="text-gray-400">جاري تحميل المنتجات...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">لا توجد منتجات مطابقة للبحث</p>
            </div>
          ) : (
            /* Products Grid */
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-navy-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              لماذا تختار <span className="gradient-text">Hamoksha</span>؟
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">موثوقية 100%</h3>
              <p className="text-gray-400">آلاف العملاء يثقون بنا ويعتمدون على خدماتنا</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-cyan rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">تسليم فوري</h3>
              <p className="text-gray-400">استلم منتجك خلال دقائق معدودة من إتمام الطلب</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-neon-pink to-neon-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">أسعار منافسة</h3>
              <p className="text-gray-400">نقدم أفضل الأسعار في السوق المصري</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

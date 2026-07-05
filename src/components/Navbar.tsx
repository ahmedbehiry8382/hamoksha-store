import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Gamepad2, CreditCard, Menu, X } from 'lucide-react';

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Navbar({ searchQuery = '', onSearchChange }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(localSearchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-blue rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-neon-purple/50 transition-all duration-300">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Hamoksha Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-300 hover:text-neon-purple transition-colors font-medium"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>شحن الألعاب</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-300 hover:text-neon-purple transition-colors font-medium"
            >
              <CreditCard className="w-5 h-5" />
              <span>البطاقات الرقمية</span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={localSearchQuery}
                onChange={handleInputChange}
                placeholder="ابحث عن لعبة أو بطاقة..."
                className="input-dark pr-10 w-full"
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-neon-purple transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-slide-up">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={handleInputChange}
                  placeholder="ابحث عن لعبة أو بطاقة..."
                  className="input-dark pr-10 w-full"
                />
              </div>
            </form>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-neon-purple hover:bg-white/5 rounded-lg transition-all"
              >
                <Gamepad2 className="w-5 h-5" />
                <span>شحن الألعاب</span>
              </Link>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-neon-purple hover:bg-white/5 rounded-lg transition-all"
              >
                <CreditCard className="w-5 h-5" />
                <span>البطاقات الرقمية</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

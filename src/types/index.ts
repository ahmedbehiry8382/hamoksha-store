export interface Product {
  id: string;
  name: string;
  category: 'games' | 'cards' | 'services';
  description: string | null;
  image_url: string | null;
  packages: Package[];
  is_active: boolean;
  created_at: string;
}

export interface Package {
  id: string;
  name: string;
  amount: string;
  price: number;
  original_price?: number;
  popular?: boolean;
}

export interface Order {
  id: string;
  product_id: string | null;
  product_name: string;
  player_id: string | null;
  contact_number: string | null;
  selected_package: string;
  total_price: number;
  payment_method: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export type OrderStatus = 'pending' | 'completed' | 'cancelled';

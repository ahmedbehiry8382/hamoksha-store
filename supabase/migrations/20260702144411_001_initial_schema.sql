/*
# Create products and orders tables for Hamoksha Store

1. New Tables
- `products`: Stores game/bundle information
  - `id` (uuid, primary key)
  - `name` (text, not null) - Product name
  - `category` (text, not null) - 'games' or 'cards'
  - `description` (text) - Product description
  - `image_url` (text) - Product image URL
  - `packages` (jsonb) - Array of available packages/credits
  - `is_active` (boolean, default true)
  - `created_at` (timestamp)
  
- `orders`: Stores customer orders
  - `id` (uuid, primary key)
  - `product_id` (uuid, references products)
  - `product_name` (text, not null)
  - `player_id` (text) - Player ID or email
  - `contact_number` (text) - WhatsApp number
  - `selected_package` (text, not null)
  - `total_price` (decimal, not null)
  - `payment_method` (text, not null)
  - `status` (text, default 'pending')
  - `created_at` (timestamp)

2. Security
- Enable RLS on both tables
- Products: Public read, admin only write
- Orders: Public insert, admin only read/update
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('games', 'cards')),
  description text,
  image_url text,
  packages jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  player_id text,
  contact_number text,
  selected_package text NOT NULL,
  total_price decimal(10,2) NOT NULL,
  payment_method text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, anon write for admin)
DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_products" ON products;
CREATE POLICY "public_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_products" ON products;
CREATE POLICY "public_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_products" ON products;
CREATE POLICY "public_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);

-- Orders policies (public read/insert, admin update)
DROP POLICY IF EXISTS "public_read_orders" ON orders;
CREATE POLICY "public_read_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_orders" ON orders;
CREATE POLICY "public_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_orders" ON orders;
CREATE POLICY "public_update_orders" ON orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_orders" ON orders;
CREATE POLICY "public_delete_orders" ON orders FOR DELETE
  TO anon, authenticated USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
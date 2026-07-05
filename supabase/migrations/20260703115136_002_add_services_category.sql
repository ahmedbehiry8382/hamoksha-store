/*
# Update products category to include services

1. Modified Tables
- `products`: Update category constraint to include 'services'
*/

ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check 
  CHECK (category IN ('games', 'cards', 'services'));
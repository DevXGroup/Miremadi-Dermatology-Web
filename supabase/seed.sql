-- RUN THIS IN YOUR SUPABASE SQL EDITOR
-- This will populate your shop with initial premium products

INSERT INTO products (name, description, price, category, image_url, stock)
VALUES 
('Hydrating Silk Cream', 'Expertly formulated daily moisturizer with hyaluronic acid and silk proteins for deep, long-lasting hydration.', 85.00, 'Moisturizers', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800', 50),
('Vitamin C Serum', 'Powerful antioxidant serum with 15% Pure Vitamin C to brighten skin tone and reduce signs of aging.', 120.00, 'Serums', 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800', 35),
('Gentle Foaming Cleanser', 'A pH-balanced foaming cleanser that removes impurities and makeup without stripping the skin''s natural moisture barrier.', 45.00, 'Cleansers', 'https://images.unsplash.com/photo-1556228720-1957be919ba1?auto=format&fit=crop&q=80&w=800', 100),
('Retinol Night Repair', 'Advanced night treatment featuring encapsulated retinol to visibly reduce fine lines and improve skin texture.', 150.00, 'Treatments', 'https://images.unsplash.com/photo-1611080541599-8c6dbde6edb8?auto=format&fit=crop&q=80&w=800', 20),
('Mineral Sunscreen SPF 50', 'Broad-spectrum mineral protection with a sheer, non-greasy finish. Safe for sensitive skin.', 65.00, 'Sun Care', 'https://images.unsplash.com/photo-1556228515-91986c74627d?auto=format&fit=crop&q=80&w=800', 75);

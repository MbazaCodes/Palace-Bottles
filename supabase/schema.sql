-- =============================================================
-- Palace Bottles — Supabase Schema (Phase 4)
-- Run in Supabase SQL Editor. Includes RLS, indexes, triggers.
-- =============================================================

-- ENUMS -------------------------------------------------------
create type order_status as enum ('pending','confirmed','processing','packed','shipped','delivered','cancelled');
create type payment_method as enum ('mpesa','airtel_money','mixx_by_yas','halopesa','cash_on_delivery');
create type payment_status as enum ('pending','verified','failed');
create type admin_role as enum ('super_admin','inventory_manager','order_manager','shipping_manager','customer_support','marketing_manager');

-- CATEGORIES --------------------------------------------------
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  name_sw text,
  description text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- PRODUCTS ----------------------------------------------------
create table products (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  slug text unique not null,
  name text not null,
  description text,
  short_description text,
  category_id uuid references categories(id) on delete set null,
  brand text default 'Palace Bottles',
  price numeric(12,0) not null check (price >= 0),
  sale_price numeric(12,0) check (sale_price is null or sale_price >= 0),
  cost_price numeric(12,0),
  capacities text[] default '{}',
  colors jsonb default '[]',          -- [{name, hex}]
  badge text,
  rating numeric(2,1) default 0,
  is_active boolean default true,
  is_featured boolean default false,
  is_new_arrival boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_products_category on products(category_id);
create index idx_products_active on products(is_active) where is_active;

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  alt text,
  is_primary boolean default false,
  sort_order int default 0
);
create index idx_product_images_product on product_images(product_id);

-- INVENTORY ---------------------------------------------------
create table inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  variant text not null default 'default',   -- e.g. "1L / Black"
  stock int not null default 0 check (stock >= 0),
  reserved int not null default 0 check (reserved >= 0),
  low_stock_threshold int default 20,
  unique (product_id, variant)
);
create index idx_inventory_product on inventory(product_id);

create table inventory_movements (
  id uuid primary key default gen_random_uuid(),
  inventory_id uuid not null references inventory(id) on delete cascade,
  change int not null,
  reason text not null,                       -- restock | sale | adjustment | damaged
  actor uuid,                                 -- admin user id
  created_at timestamptz default now()
);

-- CUSTOMERS (guest checkout: keyed by phone) -------------------
create table customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text unique not null,
  email text,
  region text,
  district text,
  created_at timestamptz default now()
);
create index idx_customers_phone on customers(phone);

-- ORDERS ------------------------------------------------------
create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,          -- PBxxxxxx
  customer_id uuid references customers(id) on delete set null,
  status order_status not null default 'pending',
  payment_method payment_method not null,
  payment_status payment_status not null default 'pending',
  payment_reference text,
  subtotal numeric(12,0) not null,
  delivery_fee numeric(12,0),                 -- null until confirmed by team
  total numeric(12,0),
  region text not null,
  district text not null,
  address text not null,
  customer_note text,
  admin_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_orders_number on orders(order_number);
create index idx_orders_status on orders(status);
create index idx_orders_created on orders(created_at desc);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,                 -- snapshot
  variant text,
  unit_price numeric(12,0) not null,
  qty int not null check (qty > 0)
);
create index idx_order_items_order on order_items(order_id);

create table shipping_status (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  status order_status not null,
  note text,
  created_at timestamptz default now()
);
create index idx_shipping_order on shipping_status(order_id);

-- MARKETING ---------------------------------------------------
create table coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  kind text not null check (kind in ('percentage','fixed')),
  value numeric(12,0) not null,
  starts_at timestamptz,
  ends_at timestamptz,
  usage_limit int,
  used_count int default 0,
  is_active boolean default true
);

create table flash_sales (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  discount_pct int check (discount_pct between 1 and 90),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  is_active boolean default true
);

create table flash_sale_products (
  flash_sale_id uuid references flash_sales(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  primary key (flash_sale_id, product_id)
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  customer_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text,
  is_approved boolean default false,
  created_at timestamptz default now()
);
create index idx_reviews_product on reviews(product_id);

create table loyalty_points (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  points int not null,
  reason text,
  created_at timestamptz default now()
);

create table referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid references customers(id) on delete cascade,
  referred_phone text not null,
  reward_issued boolean default false,
  created_at timestamptz default now()
);

-- ADMIN -------------------------------------------------------
create table admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role admin_role not null default 'order_manager',
  is_active boolean default true,
  created_at timestamptz default now()
);

create table activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor uuid references admin_users(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id text,
  meta jsonb,
  created_at timestamptz default now()
);
create index idx_activity_created on activity_logs(created_at desc);

-- HELPERS -----------------------------------------------------
create or replace function is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from admin_users where id = auth.uid() and is_active);
$$;

create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_products_touch before update on products for each row execute function touch_updated_at();
create trigger trg_orders_touch before update on orders for each row execute function touch_updated_at();

-- Generate order number PBxxxxxx
create or replace function gen_order_number()
returns trigger language plpgsql as $$
begin
  if new.order_number is null or new.order_number = '' then
    new.order_number := 'PB' || lpad(floor(random() * 1000000)::text, 6, '0');
  end if;
  return new;
end; $$;
create trigger trg_orders_number before insert on orders for each row execute function gen_order_number();

-- ROW LEVEL SECURITY ------------------------------------------
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table inventory enable row level security;
alter table inventory_movements enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table shipping_status enable row level security;
alter table coupons enable row level security;
alter table flash_sales enable row level security;
alter table flash_sale_products enable row level security;
alter table reviews enable row level security;
alter table loyalty_points enable row level security;
alter table referrals enable row level security;
alter table admin_users enable row level security;
alter table activity_logs enable row level security;

-- Public storefront reads
create policy "public read categories" on categories for select using (is_active);
create policy "public read products" on products for select using (is_active);
create policy "public read product images" on product_images for select using (true);
create policy "public read approved reviews" on reviews for select using (is_approved);
create policy "public read active flash sales" on flash_sales for select using (is_active);
create policy "public read flash sale products" on flash_sale_products for select using (true);

-- Guest checkout inserts (anon)
create policy "anon create customer" on customers for insert with check (true);
create policy "anon create order" on orders for insert with check (true);
create policy "anon create order items" on order_items for insert with check (true);
create policy "anon submit review" on reviews for insert with check (is_approved = false);

-- Track order by order_number (read-only, narrow)
create policy "public track order" on orders for select using (true);
create policy "public read order items" on order_items for select using (true);
create policy "public read shipping status" on shipping_status for select using (true);

-- Admin full access
create policy "admin all categories" on categories for all using (is_admin()) with check (is_admin());
create policy "admin all products" on products for all using (is_admin()) with check (is_admin());
create policy "admin all product_images" on product_images for all using (is_admin()) with check (is_admin());
create policy "admin all inventory" on inventory for all using (is_admin()) with check (is_admin());
create policy "admin all inventory_movements" on inventory_movements for all using (is_admin()) with check (is_admin());
create policy "admin all customers" on customers for all using (is_admin()) with check (is_admin());
create policy "admin all orders" on orders for all using (is_admin()) with check (is_admin());
create policy "admin all order_items" on order_items for all using (is_admin()) with check (is_admin());
create policy "admin all shipping" on shipping_status for all using (is_admin()) with check (is_admin());
create policy "admin all coupons" on coupons for all using (is_admin()) with check (is_admin());
create policy "admin all flash_sales" on flash_sales for all using (is_admin()) with check (is_admin());
create policy "admin all fsp" on flash_sale_products for all using (is_admin()) with check (is_admin());
create policy "admin all reviews" on reviews for all using (is_admin()) with check (is_admin());
create policy "admin all loyalty" on loyalty_points for all using (is_admin()) with check (is_admin());
create policy "admin all referrals" on referrals for all using (is_admin()) with check (is_admin());
create policy "admin read admins" on admin_users for select using (is_admin());
create policy "admin all logs" on activity_logs for all using (is_admin()) with check (is_admin());

-- SEED CATEGORIES ---------------------------------------------
insert into categories (slug, name, name_sw, sort_order) values
  ('thermal-flasks', 'Thermal Flasks', 'Chupa za Chai', 1),
  ('water-bottles', 'Water Bottles', 'Chupa za Maji', 2),
  ('sports-bottles', 'Sports Bottles', 'Chupa za Michezo', 3),
  ('kids-bottles', 'Kids Bottles', 'Chupa za Watoto', 4),
  ('coffee-tumblers', 'Coffee Tumblers', 'Vikombe vya Kahawa', 5);

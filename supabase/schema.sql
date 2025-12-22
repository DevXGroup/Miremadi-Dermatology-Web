-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enable Row Level Security (RLS)
-- PRODUCTS TABLE
create table products (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  price numeric not null,
  image_url text,
  category text,
  stock integer default 0
);

alter table products enable row level security;

create policy "Products are viewable by everyone"
  on products for select
  using ( true );

-- PROFILES TABLE (Linked to auth.users)
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  email text unique,
  avatar_url text,
  address text,
  phone text
);

alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

-- ORDERS TABLE
create table orders (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references profiles(id),
  status text default 'pending',
  total_amount numeric not null,
  items jsonb, -- Stores snapshot of products bought
  stripe_payment_id text
);

alter table orders enable row level security;

create policy "Users can view their own orders"
  on orders for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own orders"
  on orders for insert
  with check ( auth.uid() = user_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', ''), 
    new.email,
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

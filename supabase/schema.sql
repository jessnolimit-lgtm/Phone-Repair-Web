-- ==============================================================================
-- PhoneFix SaaS Supabase Database Schema & Row Level Security (RLS) Policies
-- ==============================================================================
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. STORES / PROFILES TABLE
-- Each business account registers a store profile that is directly linked to their auth user account.
CREATE TABLE IF NOT EXISTS public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for rapid store lookup by user_id
CREATE INDEX IF NOT EXISTS idx_stores_user_id ON public.stores(user_id);

-- Enable Row Level Security
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running script
DROP POLICY IF EXISTS "Users can view their own store data" ON public.stores;
DROP POLICY IF EXISTS "Users can insert their own store data" ON public.stores;
DROP POLICY IF EXISTS "Users can update their own store data" ON public.stores;

-- RLS Policies for Stores table
CREATE POLICY "Users can view their own store data"
  ON public.stores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own store data"
  ON public.stores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own store data"
  ON public.stores FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 2. AUTOMATIC USER CREATION TRIGGER
-- Automatically creates a store record in public.stores upon auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.stores (user_id, store_name, owner_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'store_name', 'My Repair Shop'),
    COALESCE(NEW.raw_user_meta_data->>'owner_name', 'Shop Owner'),
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (user_id) DO UPDATE SET
    store_name = EXCLUDED.store_name,
    owner_name = EXCLUDED.owner_name,
    phone = EXCLUDED.phone;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 3. EXAMPLE MULTI-TENANT DOMAIN TABLE (FOR FUTURE EXTENSION)
-- Demarcates how store data (e.g. repairs, inventory, customers) will be separated per business store
CREATE TABLE IF NOT EXISTS public.repairs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  device TEXT NOT NULL,
  issue TEXT,
  status TEXT DEFAULT 'Diagnosing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for repairs
ALTER TABLE public.repairs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can access repairs belonging to their store" ON public.repairs;
CREATE POLICY "Users can access repairs belonging to their store"
  ON public.repairs FOR ALL
  USING (
    store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid())
  );

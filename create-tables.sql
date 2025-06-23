-- Drop and recreate form_submissions table with correct structure
DROP TABLE IF EXISTS public.form_submissions CASCADE;

CREATE TABLE public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  title TEXT,
  description TEXT,
  category TEXT,
  level TEXT,
  modules TEXT,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by UUID
);

-- Drop and recreate newsletter_subscribers table
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;

CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'active',
  source TEXT DEFAULT 'website',
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Add is_admin column to profiles if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create simple policies
CREATE POLICY "Enable insert for all users" ON public.form_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users" ON public.form_submissions FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for all users" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for all users" ON public.newsletter_subscribers FOR SELECT USING (true);

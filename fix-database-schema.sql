-- Check if form_submissions table exists, if not create it
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  processed_by UUID REFERENCES profiles(id)
);

-- Check if newsletter_subscribers table exists, if not create it
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'active',
  source TEXT DEFAULT 'website',
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can create form submissions" ON form_submissions 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all form submissions" ON form_submissions 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own subscription" ON newsletter_subscribers 
FOR SELECT USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE form_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE newsletter_subscribers;

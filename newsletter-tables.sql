-- Newsletter subscribers table (already exists in your schema)
-- But let's make sure it has all the fields we need

-- Add any missing columns to newsletter_subscribers
ALTER TABLE newsletter_subscribers 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website',
ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMP WITH TIME ZONE;

-- Create form_submissions table for Tapri creation requests
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL, -- 'tapri_creation', 'contact', etc.
  email TEXT NOT NULL,
  name TEXT,
  title TEXT,
  description TEXT,
  category TEXT,
  level TEXT,
  modules TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'processed', 'responded'
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by UUID REFERENCES profiles(id)
);

-- Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- RLS policies for form_submissions
CREATE POLICY "Admins can view all form submissions" ON form_submissions 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Anyone can create form submissions" ON form_submissions 
FOR INSERT WITH CHECK (true);

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE form_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE newsletter_subscribers;

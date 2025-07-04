-- Complete Tapri Database Schema for Supabase

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_role AS ENUM ('entrepreneur', 'leader', 'admin');
CREATE TYPE tapri_status AS ENUM ('draft', 'pending', 'approved', 'rejected', 'paused');
CREATE TYPE application_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'rejected', 'expired');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  headline TEXT,
  location TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  skills TEXT[],
  experience_years INTEGER DEFAULT 0,
  role user_role DEFAULT 'entrepreneur',
  is_available BOOLEAN DEFAULT true,
  is_discoverable BOOLEAN DEFAULT true,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tapris table (startup projects)
CREATE TABLE IF NOT EXISTS tapris (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  problem_statement TEXT,
  solution_approach TEXT,
  target_audience TEXT,
  mission TEXT,
  vision TEXT,
  category TEXT NOT NULL,
  stage TEXT NOT NULL,
  location TEXT NOT NULL,
  team_size INTEGER DEFAULT 1,
  open_positions INTEGER DEFAULT 0,
  required_skills TEXT[],
  website TEXT,
  pitch_deck_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  commitment_level TEXT,
  funding_stage TEXT,
  funding_amount TEXT,
  equity_offered TEXT,
  logo_url TEXT,
  banner_url TEXT,
  status tapri_status DEFAULT 'pending',
  views INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leaders table (experienced entrepreneurs/mentors)
CREATE TABLE IF NOT EXISTS leaders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL, -- e.g., "Serial Entrepreneur", "Tech Advisor"
  company TEXT, -- Current company
  experience_description TEXT,
  expertise_areas TEXT[],
  successful_exits INTEGER DEFAULT 0,
  companies_founded INTEGER DEFAULT 0,
  total_funding_raised TEXT,
  mentorship_areas TEXT[],
  availability_status TEXT DEFAULT 'available', -- available, busy, not_available
  hourly_rate TEXT,
  consultation_types TEXT[], -- mentorship, advisory, investment
  achievements TEXT[],
  certifications TEXT[],
  languages TEXT[],
  timezone TEXT,
  is_verified BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leader-Tapri relationships (which startups leaders have joined)
CREATE TABLE IF NOT EXISTS leader_tapris (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  leader_id UUID REFERENCES leaders(id) ON DELETE CASCADE NOT NULL,
  tapri_id UUID REFERENCES tapris(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL, -- advisor, mentor, co-founder, investor
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  equity_percentage DECIMAL(5,2),
  UNIQUE(leader_id, tapri_id)
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tapri_id UUID REFERENCES tapris(id) ON DELETE CASCADE NOT NULL,
  applicant_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  cover_letter TEXT,
  resume_url TEXT,
  portfolio_url TEXT,
  expected_role TEXT,
  availability TEXT,
  equity_expectation TEXT,
  status application_status DEFAULT 'pending',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewer_id UUID REFERENCES profiles(id),
  review_notes TEXT,
  UNIQUE(tapri_id, applicant_id)
);

-- Invitations table
CREATE TABLE IF NOT EXISTS invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tapri_id UUID REFERENCES tapris(id) ON DELETE CASCADE NOT NULL,
  inviter_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  invitee_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT,
  role_offered TEXT,
  equity_offered TEXT,
  status invitation_status DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days')
);

-- Automation services table
CREATE TABLE IF NOT EXISTS automation_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- linkedin, content, email, calling, analytics
  features TEXT[],
  pricing_model TEXT, -- free, freemium, paid
  base_price DECIMAL(10,2),
  icon_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User automation subscriptions
CREATE TABLE IF NOT EXISTS user_automations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES automation_services(id) ON DELETE CASCADE NOT NULL,
  tapri_id UUID REFERENCES tapris(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, service_id, tapri_id)
);

-- Reviews table (for leaders)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  leader_id UUID REFERENCES leaders(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tapri_id UUID REFERENCES tapris(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(leader_id, reviewer_id, tapri_id)
);

-- Create indexes for better performance
CREATE INDEX idx_tapris_creator_id ON tapris(creator_id);
CREATE INDEX idx_tapris_status ON tapris(status);
CREATE INDEX idx_tapris_category ON tapris(category);
CREATE INDEX idx_tapris_stage ON tapris(stage);
CREATE INDEX idx_tapris_featured ON tapris(featured);
CREATE INDEX idx_tapris_created_at ON tapris(created_at DESC);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_discoverable ON profiles(is_discoverable);
CREATE INDEX idx_leaders_profile_id ON leaders(profile_id);
CREATE INDEX idx_leader_tapris_leader_id ON leader_tapris(leader_id);
CREATE INDEX idx_leader_tapris_tapri_id ON leader_tapris(tapri_id);
CREATE INDEX idx_applications_tapri_id ON applications(tapri_id);
CREATE INDEX idx_applications_applicant_id ON applications(applicant_id);
CREATE INDEX idx_applications_status ON applications(status);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tapris ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE leader_tapris ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tapris policies
CREATE POLICY "Approved tapris are viewable by everyone" ON tapris
  FOR SELECT USING (status = 'approved' OR creator_id = auth.uid());

CREATE POLICY "Users can insert their own tapris" ON tapris
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own tapris" ON tapris
  FOR UPDATE USING (auth.uid() = creator_id);

-- Leaders policies
CREATE POLICY "Leaders are viewable by everyone" ON leaders
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own leader profile" ON leaders
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own leader profile" ON leaders
  FOR UPDATE USING (auth.uid() = profile_id);

-- Leader-Tapris policies
CREATE POLICY "Leader-tapri relationships are viewable by everyone" ON leader_tapris
  FOR SELECT USING (true);

CREATE POLICY "Leaders can manage their own relationships" ON leader_tapris
  FOR ALL USING (
    auth.uid() IN (
      SELECT profile_id FROM leaders WHERE id = leader_id
    ) OR 
    auth.uid() IN (
      SELECT creator_id FROM tapris WHERE id = tapri_id
    )
  );

-- Applications policies
CREATE POLICY "Users can view applications for their tapris" ON applications
  FOR SELECT USING (
    auth.uid() = applicant_id OR 
    auth.uid() IN (SELECT creator_id FROM tapris WHERE id = tapri_id)
  );

CREATE POLICY "Users can insert their own applications" ON applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Users can update their own applications" ON applications
  FOR UPDATE USING (auth.uid() = applicant_id);

-- Invitations policies
CREATE POLICY "Users can view their own invitations" ON invitations
  FOR SELECT USING (auth.uid() = inviter_id OR auth.uid() = invitee_id);

CREATE POLICY "Users can send invitations for their tapris" ON invitations
  FOR INSERT WITH CHECK (
    auth.uid() = inviter_id AND 
    auth.uid() IN (SELECT creator_id FROM tapris WHERE id = tapri_id)
  );

CREATE POLICY "Users can update invitations they received" ON invitations
  FOR UPDATE USING (auth.uid() = invitee_id);

-- Automation services policies
CREATE POLICY "Automation services are viewable by everyone" ON automation_services
  FOR SELECT USING (is_active = true);

-- User automations policies
CREATE POLICY "Users can manage their own automations" ON user_automations
  FOR ALL USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Functions and triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tapris_updated_at BEFORE UPDATE ON tapris
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leaders_updated_at BEFORE UPDATE ON leaders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update tapri applications count
CREATE OR REPLACE FUNCTION update_tapri_applications_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tapris 
    SET applications_count = applications_count + 1 
    WHERE id = NEW.tapri_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tapris 
    SET applications_count = GREATEST(applications_count - 1, 0) 
    WHERE id = OLD.tapri_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for applications count
CREATE TRIGGER update_applications_count
  AFTER INSERT OR DELETE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_tapri_applications_count();

-- Function to generate unique slug
CREATE OR REPLACE FUNCTION generate_unique_slug(title_text TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Create base slug from title
  base_slug := lower(regexp_replace(title_text, '[^a-zA-Z0-9\s]', '', 'g'));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := trim(both '-' from base_slug);
  
  -- Ensure slug is not empty
  IF base_slug = '' THEN
    base_slug := 'tapri';
  END IF;
  
  final_slug := base_slug;
  
  -- Check for uniqueness and add counter if needed
  WHILE EXISTS (SELECT 1 FROM tapris WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

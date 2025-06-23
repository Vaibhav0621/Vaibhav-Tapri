-- Check if tables exist and their structure
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('form_submissions', 'newsletter_subscribers', 'profiles')
ORDER BY table_name, ordinal_position;

-- Check if form_submissions table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'form_submissions'
) as form_submissions_exists;

-- Check profiles table for is_admin column
SELECT column_name 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles' 
AND column_name = 'is_admin';

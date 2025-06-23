-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Users can create tapris" ON tapris;
DROP POLICY IF EXISTS "Users can update own tapris" ON tapris;
DROP POLICY IF EXISTS "Published tapris are viewable by everyone" ON tapris;

-- Create new, more permissive policies
CREATE POLICY "Anyone can view approved tapris" ON tapris 
FOR SELECT USING (status = 'approved');

CREATE POLICY "Authenticated users can create tapris" ON tapris 
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own tapris" ON tapris 
FOR SELECT USING (creator_id = auth.uid());

CREATE POLICY "Users can update their own tapris" ON tapris 
FOR UPDATE USING (creator_id = auth.uid());

-- Allow admins to view all tapris
CREATE POLICY "Admins can view all tapris" ON tapris 
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Allow admins to update any tapri
CREATE POLICY "Admins can update any tapri" ON tapris 
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

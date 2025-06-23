-- Allow tapris with null creator_id (for converted form submissions)
DROP POLICY IF EXISTS "Authenticated users can create tapris" ON tapris;

CREATE POLICY "Authenticated users can create tapris" ON tapris 
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL OR creator_id IS NULL
);

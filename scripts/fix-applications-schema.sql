-- Fix applications table schema
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS cover_letter TEXT,
ADD COLUMN IF NOT EXISTS experience TEXT,
ADD COLUMN IF NOT EXISTS availability TEXT,
ADD COLUMN IF NOT EXISTS skills TEXT[],
ADD COLUMN IF NOT EXISTS portfolio_url TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS expected_salary INTEGER,
ADD COLUMN IF NOT EXISTS preferred_role TEXT,
ADD COLUMN IF NOT EXISTS years_experience INTEGER;

-- Update existing records to have applied_at timestamp
UPDATE applications 
SET applied_at = created_at 
WHERE applied_at IS NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_applied_at ON applications(applied_at);
CREATE INDEX IF NOT EXISTS idx_applications_tapri_id ON applications(tapri_id);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);

-- Add RLS policies if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'applications' 
        AND policyname = 'Users can view their own applications'
    ) THEN
        CREATE POLICY "Users can view their own applications" ON applications
            FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'applications' 
        AND policyname = 'Users can create applications'
    ) THEN
        CREATE POLICY "Users can create applications" ON applications
            FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'applications' 
        AND policyname = 'Tapri creators can view applications'
    ) THEN
        CREATE POLICY "Tapri creators can view applications" ON applications
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM tapris 
                    WHERE tapris.id = applications.tapri_id 
                    AND tapris.creator_id = auth.uid()
                )
            );
    END IF;
END $$;

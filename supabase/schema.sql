-- Sightline Submissions Schema & RLS

-- Submissions Table
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gig_id UUID NOT NULL,
  poster_pubkey TEXT NOT NULL,
  seeker_pubkey TEXT NOT NULL,
  media_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED_PUBLIC', 'REJECTED_PRIVATE')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Policy 1: Poster and Seeker can always read their own submissions
CREATE POLICY "Poster and Seeker can read their own submissions"
ON submissions
FOR SELECT
USING (
  auth.uid()::text = poster_pubkey OR 
  auth.uid()::text = seeker_pubkey
);

-- Policy 2: The "Public on Reject" Core Network Rule
-- If a Job Poster rejects a submission (moving it to REJECTED_PUBLIC),
-- ANY authenticated user on the platform can read it to verify if the rejection was fair.
CREATE POLICY "Public on Reject reading access"
ON submissions
FOR SELECT
USING (
  status = 'REJECTED_PUBLIC' AND auth.role() = 'authenticated'
);

-- Policy 3: Only the Poster can update the status
CREATE POLICY "Job Poster can update submission status"
ON submissions
FOR UPDATE
USING (
  auth.uid()::text = poster_pubkey
)
WITH CHECK (
  auth.uid()::text = poster_pubkey
);

-- Policy 4: Seekers can create submissions
CREATE POLICY "Seekers can create submissions"
ON submissions
FOR INSERT
WITH CHECK (
  auth.uid()::text = seeker_pubkey
);

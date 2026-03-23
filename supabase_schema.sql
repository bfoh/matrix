-- Create social_connections table for storing OAuth tokens
CREATE TABLE IF NOT EXISTS social_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL, -- 'tiktok', 'instagram', etc.
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  user_info JSONB, -- Stores platform-specific user details (id, name, avatar)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(platform) -- Ensure only one active connection per platform for now
);

-- Enable Row Level Security (RLS)
ALTER TABLE social_connections ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users (admins) to view and edit connections
CREATE POLICY "Allow admin access" ON social_connections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a storage bucket for property videos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to property-images bucket (for downloads)
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'property-images');

-- Allow authenticated users to upload to property-images bucket
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'property-images');

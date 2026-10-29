-- ye chala dena in sql editor to upload images

CREATE POLICY "Allow anonymous image uploads"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (
  bucket_id = 'students_images'
);

-- Seed data for company profile project images
WITH project_data(title, images) AS (
    VALUES 
    ('Company Profile Sekatrans', ARRAY[
        ('/Portfolio3.png', 'Project Screenshot', 'Main Interface'),
        ('/Portfolio4.png', 'Project Screenshot', 'Dashboard'),
        ('/Portfolio5.png', 'Project Screenshot', 'Booking Flow')
    ]),
    ('Company Profile Asamedia', ARRAY[
        ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfSKJ8gAhvTxrfh5nUIz5q7yi6Qy4V7nCnnA&s', 'Project Screenshot', 'Homepage'),
        ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGlCEUudh4sAgRCNvmfIp2ddvGdFTU5px9hQ&s', 'Project Screenshot', 'Services Page')
    ]),
    ('Company Profile Yusung Tech Indonesia', ARRAY[
        ('/Portfolio1.png', 'Project Screenshot', 'Main Interface'),
        ('/Portfolio1.png', 'Project Screenshot', 'Product Showcase')
    ]),
    ('Mobile Fin-Tech App', ARRAY[
        ('https://placehold.co/600x400?text=Fintech+1', 'App Screenshot', 'Dashboard'),
        ('https://placehold.co/600x400?text=Fintech+2', 'App Screenshot', 'Investment View'), 
        ('https://placehold.co/600x400?text=Fintech+3', 'App Screenshot', 'Transaction History')
    ])
)
INSERT INTO company_profile.project_images (
    project_id,
    image_url,
    image_order,
    image_type,
    image_caption
)
SELECT 
    p.id, 
    (images).image_url,
    generate_series(1, array_length(pd.images, 1)),
    (images).image_type,
    (images).image_caption
FROM project_data pd,
     company_profile.projects p,
     unnest(pd.images) AS images
WHERE p.title = pd.title; 
-- Seed data for company profile project images
INSERT INTO company_profile.project_images (
    project_id,
    image_url,
    image_order,
    image_title
)
VALUES 
    ((SELECT id FROM company_profile.projects WHERE title = 'Company Profile Sekatrans'), '/Portfolio3.png', 0, 'Sekatrans Website - Homepage'),
    ((SELECT id FROM company_profile.projects WHERE title = 'Company Profile Sekatrans'), '/Portfolio4.png', 1, 'Sekatrans Website - Fleet Showcase'),
    ((SELECT id FROM company_profile.projects WHERE title = 'Company Profile Sekatrans'), '/Portfolio5.png', 2, 'Sekatrans Website - Booking System'),

    ((SELECT id FROM company_profile.projects WHERE title = 'Company Profile Asamedia'), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfSKJ8gAhvTxrfh5nUIz5q7yi6Qy4V7nCnnA&s', 0, 'Asamedia Website - Homepage'),
    ((SELECT id FROM company_profile.projects WHERE title = 'Company Profile Asamedia'), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGlCEUudh4sAgRCNvmfIp2ddvGdFTU5px9hQ&s', 1, 'Asamedia Website - Services'),

    ((SELECT id FROM company_profile.projects WHERE title = 'Company Profile Yusung Tech Indonesia'), '/Portfolio1.png', 0, 'Yusung Tech Website - Homepage'),
    ((SELECT id FROM company_profile.projects WHERE title = 'Company Profile Yusung Tech Indonesia'), '/Portfolio1.png', 1, 'Yusung Tech Website - Product Showcase'),

    ((SELECT id FROM company_profile.projects WHERE title = 'Mobile Fin-Tech App'), 'https://placehold.co/600x400?text=Fintech+1', 0, 'Fin-Tech App - Dashboard'),
    ((SELECT id FROM company_profile.projects WHERE title = 'Mobile Fin-Tech App'), 'https://placehold.co/600x400?text=Fintech+2', 1, 'Fin-Tech App - Investment View'),
    ((SELECT id FROM company_profile.projects WHERE title = 'Mobile Fin-Tech App'), 'https://placehold.co/600x400?text=Fintech+3', 2, 'Fin-Tech App - Transaction History');
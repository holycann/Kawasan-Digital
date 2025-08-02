-- Seed data for company profile clients
INSERT INTO
    company_profile.clients (
        name,
        industry,
        location,
        website_url,
        description,
        logo_image,
        contact_person,
        contact_email,
        contact_phone
    )
VALUES (
        'SekaTrans',
        'Transportation Services',
        'Indonesia',
        'https://sekatrans.com/',
        'Professional car rental service specializing in reliable transportation solutions.',
        '/logos/sekatrans_logo.png',
        'Budi Setiawan',
        'contact@sekatrans.com',
        '+62 812-3456-7890'
    ),
    (
        'Asa Media',
        'Digital Marketing & Web Development',
        'Indonesia',
        'https://asamedia.id/',
        'Creative digital agency offering comprehensive web development and branding services.',
        '/logos/asamedia_logo.png',
        'Andi Pratama',
        'hello@asamedia.id',
        '+62 821-5678-9012'
    ),
    (
        'Yusung Tech Indonesia',
        'Automotive & AIoT Technology',
        'Indonesia',
        'https://yusungtechindonesia.com/',
        'Manufacturer of automotive components and AIoT-based technological solutions.',
        '/logos/yusung_logo.png',
        'Kim Jae-sung',
        'info@yusungtechindonesia.com',
        '+62 831-7890-1234'
    ),
    (
        'Kawasan Digital',
        'Fintech & Mobile Solutions',
        'Indonesia',
        NULL,
        'Innovative fintech startup developing mobile applications for micro-investments and digital payments.',
        '/logos/kawasan_digital_logo.png',
        'Rini Widiastuti',
        'contact@kawasandigital.com',
        '+62 841-2345-6789'
    );
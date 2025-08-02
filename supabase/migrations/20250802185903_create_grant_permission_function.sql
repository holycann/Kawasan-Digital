-- Grant ke semua jenis object yang ada
grant all privileges on all tables in schema company_profile to service_role;
grant all privileges on all sequences in schema company_profile to service_role;
grant all privileges on all functions in schema company_profile to service_role;
grant all privileges on all routines in schema company_profile to service_role;
grant all privileges on all views in schema company_profile to service_role;
grant all privileges on all materialized views in schema company_profile to service_role;

-- Supaya future object juga otomatis ke-grant
alter default privileges in schema company_profile grant all on tables to service_role;
alter default privileges in schema company_profile grant all on sequences to service_role;
alter default privileges in schema company_profile grant all on functions to service_role;
alter default privileges in schema company_profile grant all on routines to service_role;
alter default privileges in schema company_profile grant all on views to service_role;
alter default privileges in schema company_profile grant all on materialized views to service_role;

-- Grant ke semua jenis object yang ada
grant all privileges on all tables in schema supabase_migrations to service_role;
grant all privileges on all sequences in schema supabase_migrations to service_role;
grant all privileges on all functions in schema supabase_migrations to service_role;
grant all privileges on all routines in schema supabase_migrations to service_role;
grant all privileges on all views in schema supabase_migrations to service_role;
grant all privileges on all materialized views in schema supabase_migrations to service_role;

-- Supaya future object juga otomatis ke-grant
alter default privileges in schema supabase_migrations grant all on tables to service_role;
alter default privileges in schema supabase_migrations grant all on sequences to service_role;
alter default privileges in schema supabase_migrations grant all on functions to service_role;
alter default privileges in schema supabase_migrations grant all on routines to service_role;
alter default privileges in schema supabase_migrations grant all on views to service_role;
alter default privileges in schema supabase_migrations grant all on materialized views to service_role;

DO
$$
DECLARE
    r RECORD;
BEGIN
    FOR r IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'company_profile'
    LOOP
        EXECUTE format('GRANT SELECT ON TABLE company_profile.%I TO anon;', r.tablename);
    END LOOP;
END
$$;
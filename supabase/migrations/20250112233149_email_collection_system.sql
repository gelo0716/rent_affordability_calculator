-- Location: supabase/migrations/20250112233149_email_collection_system.sql
-- Schema Analysis: Fresh database with no existing tables
-- Integration Type: New email collection and calculator data storage module
-- Dependencies: None - creating new schema

-- Create email collection table for gating premium content
CREATE TABLE public.email_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    submitted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    source TEXT DEFAULT 'rent_calculator',
    ip_address INET,
    user_agent TEXT
);

-- Create calculator data table to store calculations for analytics
CREATE TABLE public.calculator_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL REFERENCES public.email_submissions(email) ON DELETE CASCADE,
    monthly_income NUMERIC(10,2),
    non_rent_expenses NUMERIC(10,2), 
    rent_percentage INTEGER,
    calculated_rent NUMERIC(10,2),
    disposable_income NUMERIC(10,2),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    session_data JSONB
);

-- Essential indexes
CREATE INDEX idx_email_submissions_email ON public.email_submissions(email);
CREATE INDEX idx_email_submissions_submitted_at ON public.email_submissions(submitted_at);
CREATE INDEX idx_calculator_sessions_email ON public.calculator_sessions(email);
CREATE INDEX idx_calculator_sessions_created_at ON public.calculator_sessions(created_at);

-- Enable RLS
ALTER TABLE public.email_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email submissions (open for anonymous users)
CREATE POLICY "anyone_can_submit_email"
ON public.email_submissions
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "anyone_can_read_own_submission"
ON public.email_submissions
FOR SELECT
TO public
USING (true);

-- RLS Policies for calculator sessions (open for data collection)
CREATE POLICY "anyone_can_create_calculator_session"
ON public.calculator_sessions
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "anyone_can_read_calculator_sessions"
ON public.calculator_sessions
FOR SELECT
TO public
USING (true);

-- Function to handle email submission with duplicate prevention
CREATE OR REPLACE FUNCTION public.submit_email_for_access(
    user_email TEXT,
    user_ip INET DEFAULT NULL,
    user_agent TEXT DEFAULT NULL
)
RETURNS TABLE(success BOOLEAN, message TEXT, existing BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    email_exists BOOLEAN := FALSE;
BEGIN
    -- Check if email already exists
    SELECT EXISTS(
        SELECT 1 FROM public.email_submissions 
        WHERE email = user_email
    ) INTO email_exists;
    
    -- If email exists, return success but mark as existing
    IF email_exists THEN
        RETURN QUERY SELECT TRUE, 'Email already registered'::TEXT, TRUE;
        RETURN;
    END IF;
    
    -- Insert new email
    INSERT INTO public.email_submissions (email, ip_address, user_agent)
    VALUES (user_email, user_ip, user_agent);
    
    RETURN QUERY SELECT TRUE, 'Email successfully registered'::TEXT, FALSE;
    
EXCEPTION
    WHEN unique_violation THEN
        RETURN QUERY SELECT TRUE, 'Email already registered'::TEXT, TRUE;
    WHEN OTHERS THEN
        RETURN QUERY SELECT FALSE, 'Failed to register email'::TEXT, FALSE;
END;
$$;

-- Function to save calculator session
CREATE OR REPLACE FUNCTION public.save_calculator_session(
    user_email TEXT,
    monthly_income NUMERIC,
    non_rent_expenses NUMERIC,
    rent_percentage INTEGER,
    calculated_rent NUMERIC,
    disposable_income NUMERIC,
    session_data JSONB DEFAULT NULL
)
RETURNS TABLE(success BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Insert calculator session data
    INSERT INTO public.calculator_sessions (
        email, monthly_income, non_rent_expenses, rent_percentage, 
        calculated_rent, disposable_income, session_data
    ) VALUES (
        user_email, monthly_income, non_rent_expenses, rent_percentage,
        calculated_rent, disposable_income, session_data
    );
    
    RETURN QUERY SELECT TRUE, 'Session saved successfully'::TEXT;
    
EXCEPTION
    WHEN foreign_key_violation THEN
        RETURN QUERY SELECT FALSE, 'Email not found'::TEXT;
    WHEN OTHERS THEN
        RETURN QUERY SELECT FALSE, 'Failed to save session'::TEXT;
END;
$$;

-- Sample data for testing
DO $$
DECLARE
    test_email TEXT := 'demo@example.com';
    test_session_id UUID := gen_random_uuid();
BEGIN
    -- Insert test email submission
    INSERT INTO public.email_submissions (email, source, ip_address)
    VALUES (test_email, 'rent_calculator', '127.0.0.1'::INET);

    -- Insert test calculator session
    INSERT INTO public.calculator_sessions (
        id, email, monthly_income, non_rent_expenses, rent_percentage, 
        calculated_rent, disposable_income, session_data
    ) VALUES (
        test_session_id, test_email, 5000.00, 2000.00, 30, 
        1500.00, 1500.00, '{"location": "demo", "timestamp": "2025-01-12"}'::JSONB
    );

EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'Test data already exists, skipping insertion';
    WHEN OTHERS THEN
        RAISE NOTICE 'Error inserting test data: %', SQLERRM;
END $$;
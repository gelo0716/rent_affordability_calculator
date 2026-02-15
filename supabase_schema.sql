-- Schema for Rent Affordability Calculator
-- Run this in the Supabase SQL Editor

-- 1. Create email collection table
CREATE TABLE IF NOT EXISTS public.email_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    submitted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    source TEXT DEFAULT 'rent_calculator',
    ip_address INET,
    user_agent TEXT
);

-- 2. Create calculator data table
CREATE TABLE IF NOT EXISTS public.calculator_sessions (
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

-- 3. Create Indexes
CREATE INDEX IF NOT EXISTS idx_email_submissions_email ON public.email_submissions(email);
CREATE INDEX IF NOT EXISTS idx_email_submissions_submitted_at ON public.email_submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_calculator_sessions_email ON public.calculator_sessions(email);
CREATE INDEX IF NOT EXISTS idx_calculator_sessions_created_at ON public.calculator_sessions(created_at);

-- 4. Enable RLS
ALTER TABLE public.email_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_sessions ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies
-- Allow anyone to insert (submit email)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'anyone_can_submit_email'
    ) THEN
        CREATE POLICY "anyone_can_submit_email" ON public.email_submissions FOR INSERT TO public WITH CHECK (true);
    END IF;
END
$$;

-- Allow anyone to read their own submission (technically public here, but restricted by application logic usually)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'anyone_can_read_own_submission'
    ) THEN
        CREATE POLICY "anyone_can_read_own_submission" ON public.email_submissions FOR SELECT TO public USING (true);
    END IF;
END
$$;

-- Allow anyone to save calculator session
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'anyone_can_create_calculator_session'
    ) THEN
        CREATE POLICY "anyone_can_create_calculator_session" ON public.calculator_sessions FOR INSERT TO public WITH CHECK (true);
    END IF;
END
$$;

-- Allow anyone to read calculator sessions
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'anyone_can_read_calculator_sessions'
    ) THEN
        CREATE POLICY "anyone_can_read_calculator_sessions" ON public.calculator_sessions FOR SELECT TO public USING (true);
    END IF;
END
$$;

-- 6. Create Functions (RPC)

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

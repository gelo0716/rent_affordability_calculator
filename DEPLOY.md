# Deployment Guide

## 1. Backend: Supabase Setup

1.  **Create a Project**: Go to [Supabase](https://supabase.com) and create a new project.
2.  **Run SQL Migration**:
    *   Go to the **SQL Editor** in your Supabase dashboard.
    *   Open the `supabase_schema.sql` file from this repository.
    *   Copy the content and paste it into the SQL Editor.
    *   Click **Run**.
    *   This will create the necessary tables (`email_submissions`, `calculator_sessions`) and functions (`submit_email_for_access`, `save_calculator_session`).
3.  **Get Credentials**:
    *   Go to **Project Settings** -> **API**.
    *   Copy the `Project URL` and `anon public` key.

## 2. Frontend: Emergent Deployment

1.  **Connect Repository**: Connect your GitHub repository to Emergent.
2.  **Build Settings**:
    *   **Framework**: Vite (or React)
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `build` (Note: This project is configured to output to `build`, not `dist`)
3.  **Environment Variables**:
    *   Add the following environment variables in the Emergent dashboard:
        *   `VITE_SUPABASE_URL`: (Paste your Project URL)
        *   `VITE_SUPABASE_ANON_KEY`: (Paste your anon public key)
4.  **Deploy**: Click **Deploy**.

## Local Development

To run locally with the real backend:
1.  Copy `.env.example` to `.env`.
2.  Fill in your Supabase credentials.
3.  Run `npm start`.

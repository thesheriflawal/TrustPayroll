# TrustPayroll Waitlist

A custom waitlist application for TrustPayroll, built with Next.js, Supabase, and Tailwind CSS.

## Features

- 🔸 Email collection with Supabase database storage
- 🔸 Instant email notifications to TrustPayrollOfficial@gmail.com
- 🔸 Custom TrustPayroll branding with brand colors
- 🔸 Duplicate email detection
- 🔸 Responsive design with dark/light mode support

## Stack

- Next.js 15 (App Router)
- Supabase (Database)
- Resend (Email notifications)
- Tailwind CSS
- TypeScript

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
pnpm install
\`\`\`

### 2. Configure Environment Variables

The following environment variables are already configured in your v0 project:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `RESEND_API_KEY` - Your Resend API key for sending emails

### 3. Create Database Table

Run the SQL script to create the waitlist table:

1. Go to the Scripts panel in v0
2. Run `scripts/001_create_waitlist_table.sql`

This will create the `waitlist` table with proper Row Level Security policies.

### 4. Start Development Server

\`\`\`bash
pnpm dev
\`\`\`

Visit `http://localhost:3000` to see your waitlist in action!

## Customization

### Brand Colors

The app uses TrustPayroll's brand colors:
- Primary: `#04203E` (Deep Blue)
- Secondary: `#27A74A` (Green)

These are defined in `app/globals.css` and can be customized there.

### Typography

- Primary Font: Montserrat
- Secondary Font: Georgia (serif)

Fonts are configured in `app/layout.tsx`.

### Logo

Replace the placeholder in `components/box/index.tsx` with your actual TrustPayroll logo.

## How It Works

1. User enters their email in the waitlist form
2. Email is validated and saved to Supabase database
3. Notification email is sent to TrustPayrollOfficial@gmail.com
4. User sees success message

## Deployment

Deploy to Vercel with one click or push to your GitHub repository and connect it to Vercel.

Make sure all environment variables are set in your Vercel project settings.

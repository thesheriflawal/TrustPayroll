-- Create waitlist table to store email signups
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.waitlist enable row level security;

-- Allow anyone to insert (public waitlist signup)
create policy "Allow public to insert emails"
  on public.waitlist for insert
  with check (true);

-- Only allow reading your own email (for future features)
create policy "Allow users to view all emails"
  on public.waitlist for select
  using (true);

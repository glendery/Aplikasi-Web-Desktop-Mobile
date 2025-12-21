-- Permanent statistics table for submissions
create table if not exists public.submissions_stats (
  id uuid primary key default gen_random_uuid(),
  ref_id uuid,
  ts timestamptz not null default now(),
  nama text,
  hp text,
  email text,
  alamat text,
  layanan text,
  pesan text,
  source text
);

create index if not exists submissions_stats_ts_idx on public.submissions_stats (ts desc);

-- Trigger function to log every insert on public.submissions
create or replace function public.log_submission_stats()
returns trigger
language plpgsql
as $$
begin
  insert into public.submissions_stats (ref_id, ts, nama, hp, email, alamat, layanan, pesan, source)
  values (new.id, coalesce(new.ts, now()), new.nama, new.hp, new.email, new.alamat, new.layanan, new.pesan, new.source);
  return new;
end;
$$;

-- Create trigger if not exists
do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'trg_log_submission_stats'
  ) then
    create trigger trg_log_submission_stats
    after insert on public.submissions
    for each row execute function public.log_submission_stats();
  end if;
end $$;

-- Enable RLS and allow read-only select for authenticated role
alter table public.submissions_stats enable row level security;

create policy select_stats_authenticated on public.submissions_stats
  for select
  to authenticated
  using (true);

-- Note: no policies for update/delete/insert -> effectively read-only via RLS for clients


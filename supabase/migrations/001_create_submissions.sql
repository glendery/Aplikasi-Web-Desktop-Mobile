create table if not exists public.submissions (
  id uuid primary key,
  ts timestamptz not null,
  nama text,
  hp text,
  email text,
  alamat text,
  layanan text,
  pesan text,
  source text
);

create index if not exists submissions_ts_idx on public.submissions (ts desc);

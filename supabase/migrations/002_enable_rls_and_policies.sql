alter table public.submissions enable row level security;

create policy insert_anon on public.submissions
  for insert
  to anon
  with check (true);

create policy select_authenticated on public.submissions
  for select
  to authenticated
  using (true);

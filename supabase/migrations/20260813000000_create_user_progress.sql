-- Evidence IQ progress, one row per (user, article).
--
-- Written by src/hooks/useEvidenceIQ.ts against an anonymous Supabase session,
-- so every reader gets a row set scoped by RLS to their own auth.uid().
--
-- The composite primary key is load-bearing: PostgREST resolves upserts
-- (Prefer: resolution=merge-duplicates) against the primary key, so a surrogate
-- id would make markArticleRead/markQuizPassed insert duplicates instead of
-- updating in place.

create table if not exists public.user_progress (
  user_id        uuid        not null references auth.users(id) on delete cascade,
  article_slug   text        not null,
  quiz_passed    boolean     not null default false,
  quiz_passed_at timestamptz,
  created_at     timestamptz not null default now(),
  primary key (user_id, article_slug)
);

alter table public.user_progress enable row level security;

-- Insert *and* update are both required: an upsert is checked against both.
create policy "Users read own progress" on public.user_progress
  for select using (auth.uid() = user_id);

create policy "Users insert own progress" on public.user_progress
  for insert with check (auth.uid() = user_id);

create policy "Users update own progress" on public.user_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users delete own progress" on public.user_progress
  for delete using (auth.uid() = user_id);

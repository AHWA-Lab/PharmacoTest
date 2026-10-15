-- Supabase SQL Editor에서 실행합니다. 원본 결과와 식별자는 공개하지 않습니다.
begin;
create schema if not exists pharmaco_private;
revoke all on schema pharmaco_private from public, anon, authenticated;

create table if not exists pharmaco_private.results (
  id uuid primary key,
  code text not null check (code in (
    'ESTJ','ESTP','ESFJ','ESFP','ENTJ','ENTP','ENFJ','ENFP',
    'ISTJ','ISTP','ISFJ','ISFP','INTJ','INTP','INFJ','INFP'
  )),
  vote smallint check (vote in (-1, 1)),
  created_at timestamptz not null default now()
);
alter table pharmaco_private.results enable row level security;
revoke all on pharmaco_private.results from public, anon, authenticated;

-- 무작위 UUID를 같은 테스트 결과의 수정용 토큰으로 사용합니다.
-- 같은 결과의 재전송·평가 변경은 결과 건수를 늘리지 않습니다.
create or replace function public.pharmaco_record_result(p_id uuid, p_code text, p_vote smallint default null)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
begin
  if p_id is null or p_code is null or p_code not in (
    'ESTJ','ESTP','ESFJ','ESFP','ENTJ','ENTP','ENFJ','ENFP',
    'ISTJ','ISTP','ISFJ','ISFP','INTJ','INTP','INFJ','INFP'
  ) or (p_vote is not null and p_vote not in (-1, 1)) then
    raise exception 'Invalid result' using errcode = '22023';
  end if;
  insert into pharmaco_private.results as r (id, code, vote)
    values (p_id, p_code, p_vote)
    on conflict (id) do update set vote = excluded.vote
    where r.code = excluded.code;
  if not found then
    raise exception 'Result type cannot change' using errcode = '22023';
  end if;
  return jsonb_build_object('saved', true);
end;
$$;

create or replace function public.pharmaco_stats()
returns table (code text, result_count bigint, up_count bigint, down_count bigint)
language sql stable security definer set search_path = ''
as $$
  select types.code, count(r.id),
    count(r.id) filter (where r.vote = 1),
    count(r.id) filter (where r.vote = -1)
  from unnest(array[
    'ESTJ','ESTP','ESFJ','ESFP','ENTJ','ENTP','ENFJ','ENFP',
    'ISTJ','ISTP','ISFJ','ISFP','INTJ','INTP','INFJ','INFP'
  ]) as types(code)
  left join pharmaco_private.results r on r.code = types.code
  group by types.code;
$$;

revoke all on function public.pharmaco_record_result(uuid, text, smallint) from public, anon, authenticated;
revoke all on function public.pharmaco_stats() from public, anon, authenticated;
grant usage on schema public to anon;
grant execute on function public.pharmaco_record_result(uuid, text, smallint) to anon;
grant execute on function public.pharmaco_stats() to anon;
commit;

-- PharmacoTest 확장: 새 네 테스트는 MBTI의 기존 집계와 분리합니다.
begin;
create table if not exists pharmaco_private.test_types (
  test text not null,
  code text not null,
  primary key (test, code)
);
alter table pharmaco_private.test_types enable row level security;
revoke all on pharmaco_private.test_types from public, anon, authenticated;
insert into pharmaco_private.test_types (test, code) values
  ('dnd','LG'),('dnd','NG'),('dnd','CG'),('dnd','LN'),('dnd','TN'),('dnd','CN'),('dnd','LE'),('dnd','NE'),('dnd','CE'),
  ('abo','A_POS'),('abo','A_NEG'),('abo','B_POS'),('abo','B_NEG'),('abo','O_POS'),('abo','O_NEG'),('abo','AB_POS'),('abo','AB_NEG'),
  ('enneagram','E1'),('enneagram','E2'),('enneagram','E3'),('enneagram','E4'),('enneagram','E5'),('enneagram','E6'),('enneagram','E7'),('enneagram','E8'),('enneagram','E9'),
  ('fortune','M01'),('fortune','M02'),('fortune','M03'),('fortune','M04'),('fortune','M05'),('fortune','M06'),('fortune','M07'),('fortune','M08'),('fortune','M09'),('fortune','M10'),('fortune','M11'),('fortune','M12'),('fortune','M13'),('fortune','M14'),('fortune','M15'),('fortune','M16'),('fortune','M17'),('fortune','M18'),('fortune','M19'),('fortune','M20'),('fortune','M21'),('fortune','M22'),('fortune','M23'),('fortune','M24'),('fortune','M25'),('fortune','M26'),('fortune','M27'),('fortune','M28'),('fortune','M29'),('fortune','M30'),('fortune','M31'),('fortune','M32'),('fortune','M33'),('fortune','M34'),('fortune','M35'),('fortune','M36'),('fortune','M37'),('fortune','M38'),('fortune','M39'),('fortune','M40'),('fortune','M41'),('fortune','M42'),('fortune','M43'),('fortune','M44'),('fortune','M45'),('fortune','M46'),('fortune','M47'),('fortune','M48'),('fortune','M49'),('fortune','M50')
on conflict do nothing;
create table if not exists pharmaco_private.test_results (
  id uuid primary key,
  test text not null,
  code text not null,
  vote smallint check (vote in (-1, 1)),
  created_at timestamptz not null default now(),
  foreign key (test, code) references pharmaco_private.test_types(test, code)
);
create index if not exists pharmaco_test_results_type_idx on pharmaco_private.test_results(test, code);
alter table pharmaco_private.test_results enable row level security;
revoke all on pharmaco_private.test_results from public, anon, authenticated;

create or replace function public.pharmaco_record_test_result(p_id uuid, p_code text, p_vote smallint, p_test text)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
begin
  if p_id is null or p_test is null or p_code is null
    or not exists (select 1 from pharmaco_private.test_types t where t.test = p_test and t.code = p_code)
    or (p_vote is not null and p_vote not in (-1, 1)) then
    raise exception 'Invalid result' using errcode = '22023';
  end if;
  insert into pharmaco_private.test_results as r (id, test, code, vote)
    values (p_id, p_test, p_code, p_vote)
    on conflict (id) do update set vote = excluded.vote
    where r.test = excluded.test and r.code = excluded.code;
  if not found then
    raise exception 'Result type cannot change' using errcode = '22023';
  end if;
  return jsonb_build_object('saved', true);
end;
$$;
create or replace function public.pharmaco_test_stats(p_test text)
returns table (code text, result_count bigint, up_count bigint, down_count bigint)
language sql stable security definer set search_path = ''
as $$
  select t.code, count(r.id), count(r.id) filter (where r.vote = 1), count(r.id) filter (where r.vote = -1)
  from pharmaco_private.test_types t
  left join pharmaco_private.test_results r on r.test = t.test and r.code = t.code
  where t.test = p_test group by t.code;
$$;
revoke all on function public.pharmaco_record_test_result(uuid, text, smallint, text) from public, anon, authenticated;
revoke all on function public.pharmaco_test_stats(text) from public, anon, authenticated;
grant execute on function public.pharmaco_record_test_result(uuid, text, smallint, text) to anon;
grant execute on function public.pharmaco_test_stats(text) to anon;
commit;

-- PharmacoTest 확장 2: 다섯 새 테스트와 캐릭터 인기순위.
-- 결과는 (test, code)로 저장되고, character_map이 이를 50종 캐릭터(profile_id)로 묶습니다.
-- 같은 캐릭터가 여러 테스트의 결과로 쓰여도 👍/👎가 한 캐릭터로 합산됩니다.
begin;
insert into pharmaco_private.test_types (test, code) values
  ('constitution','PEACE'),('constitution','QI'),('constitution','YANG'),('constitution','YIN'),('constitution','PHLEGM'),('constitution','DAMPHEAT'),('constitution','STASIS'),('constitution','QISTAG'),('constitution','SENSE'),('ohaeng','WOOD'),('ohaeng','FIRE'),('ohaeng','EARTH'),('ohaeng','METAL'),('ohaeng','WATER'),('bigfive','O_H'),('bigfive','O_L'),('bigfive','C_H'),('bigfive','C_L'),('bigfive','E_H'),('bigfive','E_L'),('bigfive','A_H'),('bigfive','A_L'),('bigfive','N_H'),('bigfive','N_L'),('teto','TT'),('teto','TE'),('teto','ET'),('teto','EE'),('stress','LH'),('stress','LL'),('stress','HH'),('stress','HL')
on conflict do nothing;
create table if not exists pharmaco_private.character_map (
  test text not null,
  code text not null,
  profile_id text not null,
  primary key (test, code)
);
alter table pharmaco_private.character_map enable row level security;
revoke all on pharmaco_private.character_map from public, anon, authenticated;
insert into pharmaco_private.character_map (test, code, profile_id) values
  ('mbti','ESTJ','M01'),
  ('mbti','ESTP','M02'),
  ('mbti','ESFJ','M03'),
  ('mbti','ESFP','M04'),
  ('mbti','ENTJ','M05'),
  ('mbti','ENTP','M06'),
  ('mbti','ENFJ','M07'),
  ('mbti','ENFP','M08'),
  ('mbti','ISTJ','M09'),
  ('mbti','ISTP','M10'),
  ('mbti','ISFJ','M11'),
  ('mbti','ISFP','M12'),
  ('mbti','INTJ','M13'),
  ('mbti','INTP','M14'),
  ('mbti','INFJ','M15'),
  ('mbti','INFP','M16'),
  ('dnd','LG','M17'),
  ('dnd','NG','M18'),
  ('dnd','CG','M19'),
  ('dnd','LN','M20'),
  ('dnd','TN','M21'),
  ('dnd','CN','M22'),
  ('dnd','LE','M23'),
  ('dnd','NE','M24'),
  ('dnd','CE','M25'),
  ('abo','A_POS','M26'),
  ('abo','A_NEG','M27'),
  ('abo','B_POS','M28'),
  ('abo','B_NEG','M29'),
  ('abo','O_POS','M30'),
  ('abo','O_NEG','M31'),
  ('abo','AB_POS','M32'),
  ('abo','AB_NEG','M33'),
  ('enneagram','E1','M34'),
  ('enneagram','E2','M35'),
  ('enneagram','E3','M36'),
  ('enneagram','E4','M37'),
  ('enneagram','E5','M38'),
  ('enneagram','E6','M39'),
  ('enneagram','E7','M40'),
  ('enneagram','E8','M41'),
  ('enneagram','E9','M42'),
  ('constitution','PEACE','M21'),
  ('constitution','QI','M17'),
  ('constitution','YANG','M41'),
  ('constitution','YIN','M11'),
  ('constitution','PHLEGM','M46'),
  ('constitution','DAMPHEAT','M40'),
  ('constitution','STASIS','M02'),
  ('constitution','QISTAG','M44'),
  ('constitution','SENSE','M50'),
  ('ohaeng','WOOD','M08'),
  ('ohaeng','FIRE','M30'),
  ('ohaeng','EARTH','M42'),
  ('ohaeng','METAL','M20'),
  ('ohaeng','WATER','M29'),
  ('bigfive','O_H','M06'),
  ('bigfive','O_L','M09'),
  ('bigfive','C_H','M13'),
  ('bigfive','C_L','M22'),
  ('bigfive','E_H','M04'),
  ('bigfive','E_L','M38'),
  ('bigfive','A_H','M35'),
  ('bigfive','A_L','M34'),
  ('bigfive','N_H','M49'),
  ('bigfive','N_L','M21'),
  ('teto','TT','M36'),
  ('teto','TE','M01'),
  ('teto','ET','M20'),
  ('teto','EE','M16'),
  ('stress','LH','M43'),
  ('stress','LL','M47'),
  ('stress','HH','M03'),
  ('stress','HL','M15'),
  ('fortune','M01','M01'),
  ('fortune','M02','M02'),
  ('fortune','M03','M03'),
  ('fortune','M04','M04'),
  ('fortune','M05','M05'),
  ('fortune','M06','M06'),
  ('fortune','M07','M07'),
  ('fortune','M08','M08'),
  ('fortune','M09','M09'),
  ('fortune','M10','M10'),
  ('fortune','M11','M11'),
  ('fortune','M12','M12'),
  ('fortune','M13','M13'),
  ('fortune','M14','M14'),
  ('fortune','M15','M15'),
  ('fortune','M16','M16'),
  ('fortune','M17','M17'),
  ('fortune','M18','M18'),
  ('fortune','M19','M19'),
  ('fortune','M20','M20'),
  ('fortune','M21','M21'),
  ('fortune','M22','M22'),
  ('fortune','M23','M23'),
  ('fortune','M24','M24'),
  ('fortune','M25','M25'),
  ('fortune','M26','M26'),
  ('fortune','M27','M27'),
  ('fortune','M28','M28'),
  ('fortune','M29','M29'),
  ('fortune','M30','M30'),
  ('fortune','M31','M31'),
  ('fortune','M32','M32'),
  ('fortune','M33','M33'),
  ('fortune','M34','M34'),
  ('fortune','M35','M35'),
  ('fortune','M36','M36'),
  ('fortune','M37','M37'),
  ('fortune','M38','M38'),
  ('fortune','M39','M39'),
  ('fortune','M40','M40'),
  ('fortune','M41','M41'),
  ('fortune','M42','M42'),
  ('fortune','M43','M43'),
  ('fortune','M44','M44'),
  ('fortune','M45','M45'),
  ('fortune','M46','M46'),
  ('fortune','M47','M47'),
  ('fortune','M48','M48'),
  ('fortune','M49','M49'),
  ('fortune','M50','M50')
on conflict (test, code) do update set profile_id = excluded.profile_id;
create or replace function public.pharmaco_character_stats()
returns table (profile_id text, result_count bigint, up_count bigint, down_count bigint)
language sql stable security definer set search_path = ''
as $$
  with all_results as (
    select 'mbti'::text as test, r.code, r.vote from pharmaco_private.results r
    union all
    select t.test, t.code, t.vote from pharmaco_private.test_results t
  )
  select m.profile_id, count(a.code), count(a.code) filter (where a.vote = 1), count(a.code) filter (where a.vote = -1)
  from pharmaco_private.character_map m
  left join all_results a on a.test = m.test and a.code = m.code
  group by m.profile_id;
$$;
revoke all on function public.pharmaco_character_stats() from public, anon, authenticated;
grant execute on function public.pharmaco_character_stats() to anon;
commit;

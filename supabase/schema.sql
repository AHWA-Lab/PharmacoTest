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

// supabase/schema.sql의 "캐릭터 인기순위" 블록을 테스트 데이터에서 다시 만듭니다.
// 사용: node scripts/schema-character-map.cjs > /tmp/block.sql
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.join(__dirname, '..'), context = { window: {} };
for (const f of ['catalog.js', 'test-data.js', 'test-data-more.js']) vm.runInNewContext(fs.readFileSync(path.join(root, f), 'utf8'), context);
const tests = context.window.PharmacoTests, profiles = context.window.PharmacoCatalog.profiles;
const rows = [];
for (const p of profiles) if (p.test === 'mbti') rows.push(['mbti', p.resultCode, p.id]);
for (const id of Object.keys(tests)) for (const r of tests[id].results) rows.push([id, r.id, r.profile.id]);
for (const p of profiles) rows.push(['fortune', p.id, p.id]);
const extended = ['constitution', 'ohaeng', 'bigfive', 'teto', 'stress'];
const q = (v) => "'" + v + "'";
module.exports = { rows, extended, tests };
if (require.main === module) {
  const types = rows.filter(r => extended.includes(r[0])).map(r => '(' + q(r[0]) + ',' + q(r[1]) + ')').join(',');
  const map = rows.map(r => '(' + r.map(q).join(',') + ')').join(',\n  ');
  process.stdout.write(`
-- PharmacoTest 확장 2: 다섯 새 테스트와 캐릭터 인기순위.
-- 결과는 (test, code)로 저장되고, character_map이 이를 50종 캐릭터(profile_id)로 묶습니다.
-- 같은 캐릭터가 여러 테스트의 결과로 쓰여도 👍/👎가 한 캐릭터로 합산됩니다.
begin;
insert into pharmaco_private.test_types (test, code) values
  ${types}
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
  ${map}
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
`);
}

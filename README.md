# 약침 테스트 모음 (PharmacoTest)

열 가지 테스트와 50개 약침 캐릭터, 그리고 출동을 기다리는 예비 캐릭터 100종입니다.

| 테스트 | 문항 (풀) | 결과 | 링크 |
| --- | ---: | ---: | --- |
| 약침MBTI | 16 | 16 | [플레이](https://ahwa-lab.github.io/PharmacoTest/mbti/) |
| 약침D&D | 12 (62) | 9 | [플레이](https://ahwa-lab.github.io/PharmacoTest/dnd/) |
| 약침ABO± | 12 | 8 | [플레이](https://ahwa-lab.github.io/PharmacoTest/abo/) |
| 약침에니어그램 | 15 (50) | 9 | [플레이](https://ahwa-lab.github.io/PharmacoTest/enneagram/) |
| 오늘의 약침운세 | 질문 없음 | 50 | [플레이](https://ahwa-lab.github.io/PharmacoTest/fortune/) |
| 약침9체질 | 15 (72) | 9 | [플레이](https://ahwa-lab.github.io/PharmacoTest/constitution/) |
| 약침오행 | 15 (70) | 5 | [플레이](https://ahwa-lab.github.io/PharmacoTest/ohaeng/) |
| 약침빅파이브 | 15 (65) | 10 | [플레이](https://ahwa-lab.github.io/PharmacoTest/bigfive/) |
| 테토에겐 | 15 (64) | 4 | [플레이](https://ahwa-lab.github.io/PharmacoTest/teto/) |
| 약침번아웃체크 | 15 (64) | 4 | [플레이](https://ahwa-lab.github.io/PharmacoTest/stress/) |

- [캐릭터 인기순위](https://ahwa-lab.github.io/PharmacoTest/ranking/): 모든 테스트 결과의 👍·👎를 캐릭터 단위로 합산해 윌슨 점수(95% 하한)로 정렬합니다.
- [사용되지 않은 캐릭터들](https://ahwa-lab.github.io/PharmacoTest/reserve/): 예비 캐릭터 100종. `scripts/build-reserve.cjs`가 `reserve-data.js`와 이미지 프롬프트(`research/reserve-character-prompts.json`)를 만들고, `reserve-art.js`가 SVG 스티커 그림을 그립니다.
- 모든 하위 페이지 상단의 ‘약침 테스트 모음’ 배지로 첫 화면에 돌아갈 수 있습니다.

### 문항 출제 방식 (편향 방지)

- 9체질·에니어그램: 매번 무작위로 고른 3유형은 4번, 나머지는 3번 비교되도록 쌍을 고르고 같은 쌍은 반복하지 않습니다. 점수는 비교 기회 대비 선택 비율입니다.
- 오행: 10개 쌍을 한 번씩 + 무작위 5각 순환 5쌍 → 다섯 기운이 정확히 6번씩 비교됩니다.
- 빅파이브: 다섯 차원에서 3문항씩. 가장 한쪽으로 기운 차원이 대표 성향입니다.
- 테토에겐·번아웃체크·D&D: 두 축에 7~8문항(D&D는 6문항)씩 나누고, 축 안에서는 4개 세부 영역을 고르게 섞습니다. 동점이면 그 축의 마지막 응답을 따릅니다.
- 결과 약침은 기존 50종을 다시 사용하며 테스트끼리 겹칠 수 있습니다. 번아웃체크는 진단이 아님을 알리고 자살예방상담전화 109를 안내합니다.

네 성격 테스트는 다시하기 / 결과보기 / 전체보기 / 통계보기, 10초 타이머, 모르겠다, 마지막 결과 저장, 만족도 평가와 상세 팝업을 제공합니다. 오늘의 약침운세는 질문 없이 한 번 클릭하면 카드가 뒤집히며 표시됩니다.

`catalog.json`이 50종의 구성·출처·캐릭터 배정 원본입니다. [설계 근거](research/약침-캐릭터-설계.md)와 [이미지 프롬프트](research/character-prompts.json)를 함께 보관합니다. 캐릭터 시트 5개는 `assets/characters-*.png`이며 OpenAI 내장 이미지 생성 도구를 사용했습니다.

- D&D는 2개 축의 조합, ABO±는 3개 리듬 축, 에니어그램은 50개 상황 중 비교 기회를 고르게 맞춘 무작위 15개 비교 선택, 운세는 한국 날짜에 따라 50종 중 하나로 고정되는 카드입니다. 모두 자체 창작 게임입니다. 오늘의 행운·불운 캐릭터는 네 성격 체계에서 하나씩 날짜에 따라 고르며, 같은 체계에서 행운·불운이 겹치지 않습니다.
- 실제 혈액형을 예측하거나 심리·의학적 진단을 제공하지 않습니다.
- 과거 자료에만 존재하는 약침도 포함되며 현재 공급 여부를 뜻하지 않습니다.
- 기존 루트의 `?type=ESTJ` 링크는 MBTI 하위 페이지로 연결합니다.

## 개발 검증

`npm ci && npm test`

배포 전에 `node scripts/bump-asset-version.cjs`를 실행해 모든 페이지의 js/css 주소 버전(`?v=`)을 올려주세요. GitHub Pages는 스크립트를 10분간 캐시하므로, 버전을 올리지 않으면 예전 스크립트와 새 페이지가 섞여 화면이 비어 보일 수 있습니다.

별도 외부 서비스 없이 정적 파일 서버로 로컬 실행할 수 있습니다. 배포는 GitHub Pages의 main 루트 기준입니다.

- [전체 약침 도감](https://ahwa-lab.github.io/PharmacoTest/encyclopedia/): 50종의 캐릭터·성격·설명과 원료 모티프를 검색할 수 있습니다.

- 바로 하기: https://ahwa-lab.github.io/PharmacoTest/
- 결과 공유 링크: `mbti/?type=ESTJ` 형태로 친구의 결과를 볼 수 있습니다.

이름과 재료를 연결한 재미용 매칭이며, 실제 효능과는 관계가 없습니다.

## 결과·만족도 통계 연결

GitHub Pages는 정적 호스팅이므로 전체 이용자 집계에는 Supabase 연결이 필요합니다.

1. Supabase 프로젝트의 SQL Editor에서 `supabase/schema.sql`을 실행합니다.
2. `stats-config.js`에 프로젝트 URL과 공개 **publishable** 키(또는 legacy anon 키)를 입력합니다. **secret / service_role 키는 사용하지 않습니다.**
3. GitHub에 반영하면 새 테스트 결과부터 공용 집계가 동작합니다. 연결 전에 같은 브라우저에 임시 보관한 결과도 다음 통계 조회/전송 때 재시도합니다. 기존 설치에서는 schema.sql을 다시 실행하면 새 테스트용 결과 코드와 캐릭터 인기순위 RPC(`pharmaco_character_stats`)가 추가됩니다. 결과 코드를 바꾸면 `node scripts/schema-character-map.cjs`로 해당 블록을 다시 만드세요. 기존 MBTI 집계는 유지합니다.

- 결과 비율 = 해당 타입의 완료 건수 ÷ 전체 완료 건수.
- 만족도 = 👍 ÷ (👍 + 👎). 평가하지 않은 결과는 만족도 분모에 넣지 않습니다.
- 테스트를 끝낸 시점에만 1건을 기록합니다. 공유 링크 열기, 전체보기, 팝업, 결과로 돌아가기는 건수를 늘리지 않습니다.
- 같은 결과의 평가 변경·취소·재전송은 기존 결과를 수정합니다. 다시 테스트를 완료하면 새 결과로 기록합니다.
- 통계 페이지와 전체보기에 들어갈 때 서버 집계를 다시 조회합니다. 미연결/오류와 실제 0건을 구분해서 표시합니다.
- 원본 결과 UUID는 공개 조회할 수 없으며, 통계 API는 타입별 합계만 반환합니다. 무작위 UUID는 해당 결과 평가의 수정용 토큰입니다.
- 로그인 없는 재미용 통계입니다. 결과를 여러 번 만들거나 API를 직접 호출하는 행위를 완전히 차단하지는 않습니다.
- 마지막으로 본 결과 타입과 미전송 결과는 브라우저 localStorage에 보관합니다. 브라우저 데이터를 지우면 사라지며 다른 기기와 동기화되지 않습니다.

Supabase 공식 참고: [데이터베이스 함수](https://supabase.com/docs/guides/database/functions), [공개 API 키](https://supabase.com/docs/guides/getting-started/api-keys).

참고: [D&D의 성향 체계](https://www.dndbeyond.com/sources/dnd/br-2024/creating-a-character), [에니어그램 유형 설명](https://www.enneagraminstitute.com/type-descriptions/). 명칭과 체계만 참고했고 문항과 캐릭터 설명은 새로 작성했습니다.

## 오늘의 약침운세

한국 날짜(Asia/Seoul)를 UTC 일련번호로 변환하고 50일 블록마다 고정 시드로 섞은 50종 배열에 매칭합니다. 같은 날에는 모든 이용자가 같은 약침·운세·행운/불운 조합을 봅니다. 각 50일 블록 안에서는 50종을 모두 한 번씩 사용합니다. 운세는 성격 원문 대신 모티프에 맞는 전용 문장과 색·채도·장소·음악·아이템·행동·음식 힌트를 조합합니다. 같은 브라우저의 같은 날 재뽑기는 결과 건수를 늘리거나 평가를 지우지 않습니다. 운세는 사용자의 후속 요청으로 50종 전체를 공유하며, 다른 네 테스트의 결과 약침은 서로 중복되지 않습니다.

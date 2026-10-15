// 테스트에 쓰이지 않는 예비 캐릭터 100종을 만듭니다.
// 동물·성격·동작·소품·표정·말버릇은 직접 쓰고, 복장·모자·색·테마·약재·계절·오행은
// 서로 다른 간격으로 돌려 배정해 조합이 겹치지 않게 합니다.
// 사용: node scripts/build-reserve.cjs  → reserve-data.js, research/reserve-character-prompts.json
const fs = require('node:fs'), path = require('node:path');
const root = path.join(__dirname, '..');

// [kind, 동물, animal(en), 별명, 성격 키워드, 한 줄 소개, 동작, 자세, 소품, 표정, 말버릇, (모자 지정)]
const rows = [
  ['calico', '삼색고양이', 'calico cat', '낮잠감별사', '느긋함,직감,고집', '가장 따뜻한 자리를 귀신같이 찾아내는 낮잠감별사', '햇볕 드는 자리를 가리키며 찻잔을 들고 기지개를 켠다', 'hold', 'cup', 'sleepy', '여기가 오늘의 명당이야.'],
  ['shiba', '시바견', 'shiba inu', '마이웨이산책러', '독립심,충직,새침', '자기 속도를 지키면서도 약속은 꼭 지키는 마이웨이산책러', '좋아하는 나뭇잎을 꼭 쥐고 고개를 새침하게 돌린다', 'hold', 'leaf', 'smug', '산책은 내 코스로 간다.'],
  ['beagle', '비글', 'beagle', '냄새탐정', '호기심,끈기,명랑', '사소한 단서도 놓치지 않고 끝까지 따라가는 냄새탐정', '돋보기를 들고 바닥 냄새를 킁킁 맡는다', 'hold', 'magnifier', 'sparkle', '킁킁, 여기 뭔가 있어!'],
  ['corgi', '웰시코기', 'welsh corgi', '짧은다리지휘관', '리더십,활발,책임감', '작은 체구로 큰 무리를 이끄는 짧은다리지휘관', '작은 깃발을 높이 들고 앞장서 행진한다', 'hold', 'flag', 'determined', '다들 나만 따라와!'],
  ['dachshund', '닥스훈트', 'dachshund', '긴허리터널러', '집요함,용감,장난기', '좁은 틈도 끝까지 파고드는 긴허리터널러', '등불을 들고 굴 입구로 쏙 뛰어든다', 'run', 'lantern', 'grin', '끝까지 들어가 봐야 알지.'],
  ['samoyed', '사모예드', 'samoyed', '솜사탕미소천사', '다정,낙천,사교적', '누구에게나 웃어주며 차가운 분위기를 녹이는 솜사탕미소천사', '두 팔을 활짝 벌려 포옹을 기다린다', 'cheer', 'none', 'laugh', '추운 날엔 안아주면 돼!'],
  ['golden', '골든리트리버', 'golden retriever', '공물어오기장인', '성실,헌신,순수', '부탁하면 몇 번이고 기쁘게 달려가는 공물어오기장인', '바구니 가득 공을 담아 품에 안고 온다', 'hug', 'basket', 'smile', '또 던져줄 거지?'],
  ['pug', '퍼그', 'pug', '주름철학자', '여유,유머,솔직', '심각한 순간에도 한마디로 웃음을 터뜨리는 주름철학자', '찻잔을 들고 의자에 털썩 앉아 있다', 'sit', 'cup', 'flat', '인생, 뭐 있나.'],
  ['fennec', '사막여우', 'fennec fox', '큰귀레이더', '경청,예민,재치', '멀리서 들리는 작은 고민까지 알아듣는 큰귀레이더', '커다란 귀를 쫑긋 세우고 한 손을 귀에 댄다', 'wave', 'none', 'surprised', '방금 무슨 소리 들렸어.'],
  ['arcticfox', '북극여우', 'arctic fox', '눈꽃변신술사', '적응력,침착,신비', '계절마다 새 모습으로 바뀌어도 자기다움을 잃지 않는 눈꽃변신술사', '눈꽃 지팡이를 빙글 돌린다', 'hold', 'wand', 'wink', '변해도 나는 나야.'],
  ['redpanda', '레서판다', 'red panda', '위협포즈귀요미', '수줍음,용기,귀여움', '겁이 나도 두 팔을 번쩍 들어 자기를 지키는 위협포즈귀요미', '두 팔을 번쩍 들어 몸을 크게 보이려 한다', 'cheer', 'none', 'determined', '나 무서운 판다다!'],
  ['meerkat', '미어캣', 'meerkat', '망보기당번', '경계심,협동,부지런', '모두가 쉴 때 먼저 일어나 주변을 살피는 망보기당번', '망원경을 들고 까치발로 선다', 'hold', 'telescope', 'determined', '이상 없음, 쉬어도 돼!'],
  ['redsquirrel', '청설모', 'red squirrel', '도토리저축왕', '계획성,알뜰,부지런', '오늘의 작은 도토리를 내일의 든든함으로 바꾸는 도토리저축왕', '단지에 도토리를 하나씩 넣으며 품에 안는다', 'hug', 'jar', 'smile', '하나는 지금, 하나는 겨울에.'],
  ['guinea', '기니피그', 'guinea pig', '뀨뀨알람', '소심,다정,수다', '반가운 사람이 오면 뀨뀨 소리로 먼저 알리는 뀨뀨알람', '작은 종을 흔들며 폴짝 뛴다', 'cheer', 'bell', 'laugh', '뀨! 왔다 왔다!'],
  ['chinchilla', '친칠라', 'chinchilla', '먼지목욕전문가', '깔끔,섬세,야행성', '매일 밤 자기만의 의식으로 하루를 정돈하는 먼지목욕전문가', '깃털 붓으로 털을 정성껏 쓸어낸다', 'hold', 'brush', 'calm', '정리는 마음부터.'],
  ['mouse', '들쥐', 'field mouse', '치즈지도제작자', '꼼꼼,모험,재빠름', '작은 몸으로 큰 지도를 그려나가는 치즈지도제작자', '펼친 지도를 들고 길을 가리킨다', 'hold', 'scroll', 'sparkle', '이 길로 가면 지름길!'],
  ['beaver', '비버', 'beaver', '댐설계사', '근면,공학,협력', '물길을 읽고 모두가 살 집을 짓는 댐설계사', '나무토막을 어깨에 메고 걸어간다', 'hold', 'log', 'determined', '기초부터 튼튼하게.'],
  ['armadillo', '아르마딜로', 'armadillo', '동글방패', '신중,방어적,끈기', '위험하면 몸을 말아 지키고, 안전하면 누구보다 오래 버티는 동글방패', '방패를 앞세우고 조심스레 다가온다', 'hold', 'shield', 'shy', '준비됐을 때 나갈게.'],
  ['pangolin', '천산갑', 'pangolin', '비늘갑옷수집가', '수줍음,인내,고귀함', '겹겹의 비늘 속에 부드러운 마음을 숨긴 비늘갑옷수집가', '꼬리를 감싸 안고 조용히 앉아 있다', 'sit', 'none', 'shy', '천천히 친해지자.'],
  ['anteater', '큰개미핥기', 'giant anteater', '긴코미식가', '집중력,여유,독특함', '남들이 지나치는 작은 맛을 찾아내는 긴코미식가', '긴 코 앞에 찻잔을 들고 향을 음미한다', 'hold', 'cup', 'sparkle', '한 입 크기가 제일 맛있어.'],
  ['sloth', '나무늘보', 'sloth', '느림의미학자', '느긋함,평화,관찰력', '천천히 가야 보이는 것들을 알려주는 느림의미학자', '모래시계를 들고 꾸벅꾸벅 존다', 'hold', 'hourglass', 'sleepy', '서두르지 않아도 도착해.'],
  ['orangutan', '오랑우탄', 'orangutan', '숲속지혜어른', '지혜,관대,손재주', '숲의 기억을 품고 젊은 친구들을 이끌어주는 숲속지혜어른', '커다란 잎을 우산처럼 들고 앉아 있다', 'sit', 'leaf', 'calm', '비가 오면 잠깐 쉬어 가렴.'],
  ['snowmonkey', '일본원숭이', 'snow monkey', '온천명상가', '휴식,감성,여유', '김이 오르는 온천에서 마음까지 데우는 온천명상가', '머리에 작은 수건을 얹고 눈을 감는다', 'sit', 'none', 'calm', '따뜻하면 다 괜찮아져.', 'towel'],
  ['lemur', '알락꼬리여우원숭이', 'ring-tailed lemur', '해맞이체조대장', '사교적,활기,리듬감', '아침 햇살 아래 모두를 깨우는 해맞이체조대장', '두 팔을 벌려 햇빛을 받으며 체조한다', 'cheer', 'none', 'laugh', '하나 둘, 햇살 충전!'],
  ['tarsier', '안경원숭이', 'tarsier', '왕눈이야경꾼', '관찰력,내향,집중', '모두가 잠든 밤에도 반짝이는 눈으로 숲을 지키는 왕눈이야경꾼', '초를 들고 커다란 눈을 깜빡인다', 'hold', 'candle', 'surprised', '밤에만 보이는 게 있어.'],
  ['kangaroo', '캥거루', 'kangaroo', '주머니보부상', '든든함,행동력,보호본능', '필요한 건 다 주머니에 챙겨 다니는 주머니보부상', '주머니에서 꽃 한 송이를 꺼내 건넨다', 'hold', 'flower', 'grin', '필요한 거 있어? 다 있어!'],
  ['wombat', '웜뱃', 'wombat', '굴파기장인', '끈기,단단함,무덤덤', '한번 정한 굴은 끝까지 파내는 굴파기장인', '작은 삽을 들고 흙을 퍼낸다', 'hold', 'shovel', 'determined', '파다 보면 길이 나와.'],
  ['quokka', '쿼카', 'quokka', '행복전도사', '낙천,친화력,해맑음', '누구와 찍어도 사진을 환하게 만드는 행복전도사', '풍선을 들고 활짝 웃는다', 'hold', 'balloon', 'laugh', '웃으면 사진이 잘 나와!'],
  ['platypus', '오리너구리', 'platypus', '장르파괴자', '독창성,엉뚱,자신감', '어느 분류에도 갇히지 않는 장르파괴자', '물안경을 이마에 올리고 손을 흔든다', 'wave', 'none', 'grin', '나는 나라는 장르야.', 'goggles'],
  ['polarbear', '북극곰', 'polar bear', '얼음낚시명인', '인내,차분,든든함', '차가운 기다림 끝에 큰 기쁨을 낚는 얼음낚시명인', '낚싯대를 드리우고 얼음 위에 앉아 있다', 'sit', 'rod', 'calm', '기다림도 실력이야.'],
  ['moonbear', '반달가슴곰', 'asiatic black bear', '달빛산지기', '수호,과묵,따뜻함', '가슴에 달을 품고 산을 지키는 달빛산지기', '등불을 들고 산길을 비춘다', 'hold', 'lantern', 'calm', '길은 내가 비출게.'],
  ['sunbear', '말레이곰', 'sun bear', '꿀단지탐험가', '호기심,솔직,달달함', '달콤한 것을 향해서라면 어디든 오르는 꿀단지탐험가', '꿀단지를 끌어안고 혀를 날름거린다', 'hug', 'jar', 'tongue', '한 숟갈만… 아니 두 숟갈.'],
  ['tiger', '호랑이', 'tiger', '산중호걸', '용맹,정의,카리스마', '위기의 순간 맨 앞에 서는 산중호걸', '북을 둥둥 치며 기세를 올린다', 'hold', 'drum', 'determined', '어흥! 내가 앞장선다.'],
  ['cheetah', '치타', 'cheetah', '순간가속러', '순발력,집중,승부욕', '결정적 순간에 누구보다 빨리 달려나가는 순간가속러', '몸을 낮추고 출발선을 박차고 달린다', 'run', 'none', 'determined', '3초면 충분해.'],
  ['leopard', '표범', 'leopard', '나무위전략가', '신중,독립,우아함', '높은 곳에서 전체 판을 읽고 움직이는 나무위전략가', '나침반을 들여다보며 다음 수를 고른다', 'hold', 'compass', 'smug', '한 수 앞을 보자고.'],
  ['lynx', '스라소니', 'lynx', '눈숲의그림자', '신비,예리함,조용함', '소리 없이 다가와 핵심을 짚어주는 눈숲의그림자', '귀털을 쫑긋 세우고 눈송이를 바라본다', 'wave', 'none', 'calm', '조용히, 하지만 정확하게.'],
  ['manul', '마눌고양이', "pallas's cat", '심드렁표정왕', '무심,솔직,츤데레', '표정은 심드렁해도 속은 누구보다 다정한 심드렁표정왕', '털을 부풀린 채 팔짱을 끼고 앉아 있다', 'sit', 'none', 'flat', '…딱히 걱정한 건 아니고.'],
  ['skunk', '스컹크', 'skunk', '향기조향사', '개성,자존감,유쾌', '오해받던 향을 자기만의 시그니처로 바꾼 향기조향사', '향수병을 들고 윙크하며 칙 뿌린다', 'hold', 'perfume', 'wink', '나만의 향이 있다는 건 멋진 거야.'],
  ['marten', '담비', 'yellow-throated marten', '날쌘배달부', '민첩,책임감,명랑', '산 너머까지 소식을 가장 빨리 전하는 날쌘배달부', '편지 꾸러미를 들고 달려간다', 'run', 'letter', 'grin', '소식 왔어요!'],
  ['deer', '꽃사슴', 'sika deer', '숲속시인', '감수성,온화,낭만', '계절의 변화를 가장 먼저 노래하는 숲속시인', '꽃 한 송이를 들고 고개를 갸웃한다', 'hold', 'flower', 'shy', '오늘 바람은 분홍색이야.'],
  ['reindeer', '순록', 'reindeer', '썰매길안내자', '책임감,인내,따뜻함', '눈보라 속에서도 모두를 집까지 데려다주는 썰매길안내자', '종을 흔들며 썰매길을 알린다', 'hold', 'bell', 'determined', '조금만 더 가면 도착이야.'],
  ['waterdeer', '고라니', 'water deer', '소리지르기챔피언', '솔직,엉뚱,순수', '놀라면 숨기지 못하고 다 말해버리는 소리지르기챔피언', '두 팔을 번쩍 들고 크게 외친다', 'cheer', 'none', 'surprised', '으아아! 아, 미안 놀랐지?'],
  ['alpaca', '알파카', 'alpaca', '복슬패션리더', '자신감,멋,여유', '복슬한 털을 매일 다른 스타일로 연출하는 복슬패션리더', '머리털을 쓸어넘기며 포즈를 잡는다', 'wave', 'none', 'smug', '오늘 머리 어때?'],
  ['llama', '라마', 'llama', '짐꾼여행자', '끈기,솔직,모험', '무거운 짐도 묵묵히 지고 높은 길을 넘는 짐꾼여행자', '지도를 펼쳐 다음 고개를 확인한다', 'hold', 'scroll', 'flat', '높은 곳 공기가 좋아.'],
  ['camel', '낙타', 'camel', '오아시스기억자', '인내,기억력,차분함', '긴 사막 길에서도 물 있는 곳을 기억하는 오아시스기억자', '물단지를 품에 안고 천천히 걷는다', 'hug', 'jar', 'calm', '천천히 가도 멀리 가.'],
  ['zebra', '얼룩말', 'zebra', '줄무늬조정자', '공정,균형,사교적', '흑과 백 사이에서 공정한 선을 긋는 줄무늬조정자', '붓으로 바닥에 반듯한 선을 긋는다', 'hold', 'brush', 'determined', '선을 지키면 다 같이 편해.'],
  ['pony', '조랑말', 'pony', '들판달리기선수', '활기,순수,끈기', '작아도 쉬지 않고 들판을 달리는 들판달리기선수', '바람개비를 들고 힘차게 뛴다', 'run', 'pinwheel', 'laugh', '바람 따라 달리자!'],
  ['cow', '젖소', 'holstein cow', '느긋한목장주', '온화,성실,여유', '매일 같은 시간 같은 자리를 지키는 느긋한목장주', '물뿌리개로 풀밭에 물을 준다', 'hold', 'wateringcan', 'smile', '오늘도 풀이 잘 자랐네.'],
  ['buffalo', '물소', 'water buffalo', '논두렁장사', '우직함,힘,성실', '한 번 맡은 일은 끝까지 끌고 가는 논두렁장사', '큰 바구니를 번쩍 들어올린다', 'cheer', 'basket', 'determined', '영차! 이 정도쯤이야.'],
  ['pig', '아기돼지', 'piglet', '행복먹방러', '낙천,솔직,먹성', '맛있는 걸 나누면 행복도 두 배가 된다고 믿는 행복먹방러', '찻잔을 번쩍 들고 건배를 외친다', 'hold', 'cup', 'laugh', '맛있는 건 나눠야 제맛!'],
  ['boar', '아기멧돼지', 'wild boar piglet', '줄무늬돌격대', '용감,직진,장난기', '줄무늬 옷을 입고 겁 없이 숲을 누비는 줄무늬돌격대', '나무 방패를 들고 돌진한다', 'run', 'shield', 'grin', '돌격! 앞으로!'],
  ['hippo', '하마', 'hippo', '물속명상가', '평온,든든함,반전', '물속에선 한없이 평화롭지만 지킬 땐 단호한 물속명상가', '연꽃을 들고 느긋하게 앉아 있다', 'sit', 'flower', 'calm', '물 온도 딱 좋다.'],
  ['tapir', '말레이맥', 'malayan tapir', '꿈먹는수집가', '몽상,다정,수집', '밤마다 나쁜 꿈을 먹고 좋은 꿈을 남기는 꿈먹는수집가', '꿈이 담긴 유리병을 품에 안는다', 'hug', 'jar', 'sleepy', '나쁜 꿈은 내가 먹을게.'],
  ['okapi', '오카피', 'okapi', '숨은숲의비밀', '신비,내향,우아함', '깊은 숲에 숨어 있어 더 궁금해지는 숨은숲의비밀', '큰 잎 뒤에서 반쯤 얼굴을 내민다', 'hold', 'leaf', 'shy', '찾았다고? 들켰네.'],
  ['puffin', '퍼핀', 'atlantic puffin', '무지개부리어부', '성실,귀여움,가족애', '화려한 부리로 매일 가족 몫까지 챙기는 무지개부리어부', '작은 물고기 꾸러미를 자랑스럽게 든다', 'hold', 'fish', 'sparkle', '오늘 수확 대박!'],
  ['parrot', '금강앵무', 'scarlet macaw', '말따라쟁이가수', '수다,흉내,재능', '들은 말을 노래로 바꿔 돌려주는 말따라쟁이가수', '피리를 불며 리듬을 탄다', 'hold', 'flute', 'laugh', '따라 해봐, 따라 해봐!'],
  ['toucan', '큰부리새', 'toucan', '열대과일감별사', '미식,쾌활,색감', '가장 잘 익은 열매를 단번에 골라내는 열대과일감별사', '과일 바구니를 들고 하나를 골라 든다', 'hold', 'basket', 'grin', '이건 딱 오늘 먹어야 해.'],
  ['flamingo', '플라밍고', 'flamingo', '외다리발레리나', '우아함,균형,자기관리', '한 다리로도 흔들림 없이 균형을 잡는 외다리발레리나', '한 다리로 서서 부채를 펼친다', 'hold', 'fan', 'wink', '균형은 마음에서 시작돼.'],
  ['duck', '청둥오리', 'mallard duck', '물길안내원', '차분,부지런,친절', '겉은 여유롭지만 물 밑에서 열심히 발을 젓는 물길안내원', '작은 우산을 쓰고 빗속을 걷는다', 'hold', 'umbrella', 'smile', '비 오는 날이 제일 좋아.'],
  ['chick', '병아리', 'chick', '첫걸음응원단', '순수,용기,호기심', '처음 하는 일에도 삐약 소리로 용기를 내는 첫걸음응원단', '작은 깃발을 흔들며 응원한다', 'cheer', 'flag', 'laugh', '삐약! 할 수 있어!'],
  ['rooster', '수탉', 'rooster', '새벽알람장군', '성실,자신감,큰목소리', '매일 같은 시간에 하루를 여는 새벽알람장군', '가슴을 펴고 나팔을 힘차게 분다', 'hold', 'horn', 'determined', '꼬끼오! 일어날 시간!'],
  ['sparrow', '참새', 'sparrow', '방앗간단골', '수다,사교,부지런', '동네 소식은 다 알고 있는 방앗간단골', '곡식 바구니 옆에서 손을 흔들며 수다를 떤다', 'wave', 'none', 'grin', '들었어? 그 소식!'],
  ['magpie', '까치', 'magpie', '반가운소식배달부', '명랑,눈치,행운', '좋은 소식이 올 때 가장 먼저 노래하는 반가운소식배달부', '편지를 높이 들고 날개를 펼친다', 'cheer', 'letter', 'laugh', '까악! 좋은 소식이야!'],
  ['whiteeye', '동박새', 'japanese white-eye', '동백꿀배달부', '다정,섬세,부지런', '겨울에 핀 동백꽃 사이를 오가며 달콤함을 나르는 동백꿀배달부', '동백꽃 한 송이를 소중히 안고 있다', 'hug', 'flower', 'shy', '겨울에도 꽃은 피어.'],
  ['eagle', '검독수리', 'golden eagle', '하늘감독관', '통찰,책임감,자존심', '높은 곳에서 큰 흐름을 보고 방향을 잡아주는 하늘감독관', '망원경으로 먼 곳을 살핀다', 'hold', 'telescope', 'determined', '멀리 봐야 길이 보여.'],
  ['falcon', '매', 'peregrine falcon', '번개배달특급', '속도,정확,집중', '목표를 정하면 한 치 오차 없이 내려꽂히는 번개배달특급', '나침반을 쥐고 급강하하듯 달려 나간다', 'run', 'compass', 'determined', '목표 확인, 출발!'],
  ['hummingbird', '벌새', 'hummingbird', '꽃잔치호버러', '에너지,섬세,부지런', '쉬지 않는 날갯짓으로 꽃마다 인사하는 꽃잔치호버러', '꽃 앞에서 날갯짓하며 인사한다', 'hold', 'flower', 'sparkle', '꽃마다 안녕!'],
  ['kiwi', '키위새', 'kiwi bird', '밤산책탐색가', '내향,호기심,끈기', '날지 못해도 긴 부리로 세상을 꼼꼼히 탐색하는 밤산책탐색가', '등불을 들고 땅을 콕콕 짚는다', 'hold', 'lantern', 'calm', '천천히 보면 다 보여.'],
  ['ostrich', '타조', 'ostrich', '모래폭풍질주자', '대담,속도,엉뚱', '큰 발걸음으로 모래바람을 가르는 모래폭풍질주자', '고글을 쓰고 전력 질주한다', 'run', 'none', 'grin', '뛰면 생각이 정리돼!', 'goggles'],
  ['mandarinduck', '원앙', 'mandarin duck', '다정한커플매니저', '다정,의리,로맨틱', '좋은 인연을 이어주는 다정한커플매니저', '꽃 한 송이를 건네며 윙크한다', 'hold', 'flower', 'wink', '너희 둘, 잘 어울려.'],
  ['turtle', '바다거북', 'sea turtle', '천년항해사', '인내,지혜,여유', '먼 바다를 천천히, 그러나 정확히 건너는 천년항해사', '나침반을 들고 파도 위를 유유히 나아간다', 'hold', 'compass', 'calm', '느려도 길을 잃지 않아.'],
  ['iguana', '이구아나', 'green iguana', '일광욕왕', '여유,자존감,무심', '햇살 한 줄기로도 하루를 충전하는 일광욕왕', '돌 위에 앉아 눈을 감고 해바라기를 한다', 'sit', 'none', 'sleepy', '햇볕이 최고의 보약이지.'],
  ['gecko', '표범도마뱀붙이', 'leopard gecko', '벽타기곡예사', '민첩,호기심,유쾌', '어디든 붙어 올라가 새로운 시야를 찾는 벽타기곡예사', '한 손으로 벽에 붙은 채 손을 흔든다', 'wave', 'none', 'grin', '여기서 보면 다르게 보여!'],
  ['axolotl', '우파루파', 'axolotl', '웃는재생요정', '회복력,해맑음,느긋함', '상처받아도 웃으며 다시 시작하는 웃는재생요정', '물방울 지팡이를 흔든다', 'hold', 'wand', 'laugh', '괜찮아, 다시 하면 돼.'],
  ['treefrog', '청개구리', 'tree frog', '반대로점프러', '반골,재치,유연', '남들이 왼쪽이라 할 때 오른쪽에서 답을 찾는 반대로점프러', '연잎 우산을 쓰고 폴짝 뛴다', 'cheer', 'umbrella', 'wink', '반대로 가면 뭐가 있을까?'],
  ['octopus', '문어', 'octopus', '여덟손멀티태스커', '다재다능,지능,창의', '여덟 개의 손으로 동시에 여러 일을 해내는 여덟손멀티태스커', '붓을 들고 동시에 다른 손으로 박수를 친다', 'cheer', 'brush', 'sparkle', '하나씩? 아니 동시에!'],
  ['squid', '오징어', 'squid', '먹물서예가', '예술성,자유,즉흥', '먹물 한 번으로 마음을 그려내는 먹물서예가', '큰 붓으로 휘리릭 글씨를 쓴다', 'hold', 'brush', 'determined', '한 획에 마음을 담아.'],
  ['puffer', '복어', 'pufferfish', '빵빵화남주의', '감정표현,솔직,귀여움', '화가 나면 숨기지 못하고 빵빵해지는 빵빵화남주의', '볼을 잔뜩 부풀리고 팔짱을 낀 채 앉아 있다', 'sit', 'none', 'pout', '흥, 나 지금 빵빵해.'],
  ['goldfish', '금붕어', 'goldfish', '3초기억낭만파', '낭만,낙천,순간집중', '지나간 일은 잊고 지금 이 순간을 즐기는 3초기억낭만파', '거품 방울 사이에서 손을 흔든다', 'wave', 'none', 'smile', '방금 뭐였지? 아무튼 좋아!'],
  ['seahorse', '해마', 'seahorse', '품안의수호자', '헌신,섬세,차분', '소중한 것을 품에 안고 끝까지 지키는 품안의수호자', '작은 바구니를 꼭 끌어안는다', 'hug', 'basket', 'smile', '내가 지켜줄게.'],
  ['whale', '혹등고래', 'humpback whale', '바다의가수', '감성,포용,깊이', '먼 바다까지 마음을 전하는 노래를 부르는 바다의가수', '두 팔을 벌리고 눈을 감은 채 노래한다', 'cheer', 'none', 'sing', '우우~ 들리니?'],
  ['dolphin', '돌고래', 'dolphin', '파도서핑리더', '사교,장난,지능', '친구들과 파도를 타며 새로운 놀이를 만드는 파도서핑리더', '공을 높이 들고 묘기를 준비한다', 'hold', 'ball', 'laugh', '다 같이 파도 타자!'],
  ['orca', '범고래', 'orca', '바다팀장', '리더십,전략,의리', '무리의 호흡을 맞춰 큰 파도를 넘는 바다팀장', '지도를 펼쳐 작전을 설명한다', 'hold', 'scroll', 'determined', '작전은 간단해, 함께 간다.'],
  ['shark', '아기상어', 'baby shark', '겉바속촉수영선수', '반전매력,열정,솔직', '무서워 보이지만 알고 보면 수줍은 겉바속촉수영선수', '이빨을 보이며 웃다가 수줍게 손을 흔든다', 'wave', 'none', 'grin', '물진 않아, 진짜야.'],
  ['stingray', '가오리', 'stingray', '모래바닥요가강사', '유연,평온,우아', '바닥에 납작 엎드려 호흡을 고르는 모래바닥요가강사', '두 팔을 넓게 펴고 명상한다', 'cheer', 'none', 'calm', '들이쉬고, 내쉬고.'],
  ['crab', '꽃게', 'blue crab', '옆걸음협상가', '실리,유연,단호', '정면 대신 옆길로 돌아 원하는 걸 얻는 옆걸음협상가', '집게로 열쇠를 들고 옆으로 걷는다', 'hold', 'key', 'smug', '정면만 길은 아니지.'],
  ['lobster', '바닷가재', 'lobster', '껍질갈이성장가', '성장,용기,끈기', '낡은 껍질을 벗을 때마다 더 단단해지는 껍질갈이성장가', '방패 같은 껍질을 들고 자랑한다', 'hold', 'shield', 'grin', '벗을수록 커지는 중이야.'],
  ['hermitcrab', '소라게', 'hermit crab', '이사전문가', '신중,적응,실용', '나에게 꼭 맞는 집을 찾아 기꺼이 이사하는 이사전문가', '예쁜 소라껍데기를 들고 크기를 재본다', 'hold', 'shell', 'surprised', '이 집, 딱 내 사이즈!'],
  ['ladybug', '무당벌레', 'ladybug', '행운점박이', '행운,명랑,보호', '앉는 곳마다 작은 행운을 남기는 행운점박이', '네잎클로버를 들고 날개를 편다', 'hold', 'clover', 'laugh', '오늘 운 좋은 날이야!'],
  ['stagbeetle', '사슴벌레', 'stag beetle', '큰턱씨름왕', '승부욕,의리,힘', '정정당당한 씨름으로 친구를 사귀는 큰턱씨름왕', '두 팔을 들어 힘자랑을 한다', 'cheer', 'none', 'determined', '한판 붙자, 정정당당히!'],
  ['firefly', '반딧불이', 'firefly', '밤길등불지기', '따뜻함,희망,조용함', '어두운 밤 작은 빛으로 길을 밝히는 밤길등불지기', '초롱을 들고 꼬리 불빛을 반짝인다', 'hold', 'lantern', 'smile', '작은 빛도 길이 돼.'],
  ['silkworm', '누에', 'silkworm', '비단실장인', '장인정신,인내,섬세', '오래 공들인 실로 가장 부드러운 결을 짜는 비단실장인', '실타래를 품에 안고 천천히 감는다', 'hug', 'yarn', 'calm', '천천히 감아야 곱게 나와.'],
  ['ant', '개미', 'ant', '협동물류반장', '협동,근면,책임감', '작은 힘을 모아 큰 일을 해내는 협동물류반장', '자기보다 큰 바구니를 번쩍 들어 나른다', 'cheer', 'basket', 'determined', '다 같이 들면 가벼워!'],
  ['mantis', '사마귀', 'praying mantis', '무림고수', '집중,침착,기품', '고요히 기다리다 단 한 수로 끝내는 무림고수', '한 손을 들어 무술 자세를 잡는다', 'wave', 'none', 'calm', '한 수면 충분하다.'],
  ['cicada', '매미', 'cicada', '여름콘서트가수', '열정,인내,무대체질', '긴 기다림 끝에 여름 한가운데서 노래하는 여름콘서트가수', '마이크를 들고 목청껏 노래한다', 'hold', 'mic', 'sing', '맴맴~ 이번 여름 내 무대!'],
  ['gumiho', '구미호', 'nine-tailed fox', '아홉꼬리이야기꾼', '매혹,재치,신비', '아홉 개의 꼬리만큼 다양한 이야기를 품은 아홉꼬리이야기꾼', '부채를 펼치고 꼬리를 살랑인다', 'hold', 'fan', 'wink', '이야기 하나 들려줄까?'],
  ['samjogo', '삼족오', 'three-legged crow', '태양의전령', '사명감,빛,결단', '해의 빛을 품고 새벽을 알리는 태양의전령', '해 모양 원반을 높이 들어 올린다', 'cheer', 'sun', 'determined', '해가 뜬다, 일어나자.'],
  ['griffin', '아기그리핀', 'baby griffin', '보물창고수호자', '충성,용기,자존심', '소중한 것을 지키기 위해 날개를 펴는 보물창고수호자', '열쇠를 꼭 쥐고 당당히 선다', 'hold', 'key', 'determined', '이 보물은 내가 지킨다.'],
  ['hyeonmu', '현무', 'black tortoise guardian', '북쪽바다수문장', '신중,인내,수호', '차가운 북쪽 물길을 지키는 단단한 북쪽바다수문장', '방패를 세우고 묵직하게 서 있다', 'hold', 'shield', 'calm', '천천히, 하지만 단단하게.'],
  ['sealion', '바다사자', 'sea lion', '박수갈채응원단장', '응원,쾌활,무대체질', '누구의 무대든 가장 크게 박수 쳐주는 박수갈채응원단장', '공을 높이 들고 박수를 친다', 'cheer', 'ball', 'laugh', '브라보! 한 번 더!']
];

const OUTFITS = [['hanbok', '저고리 한복', 'Korean hanbok jacket with a long ribbon tie'], ['cape', '망토', 'flowing short cape with a round clasp'], ['apron', '앞치마', 'cute apron with a front pocket'], ['hoodie', '후드티', 'cozy hoodie with a front pocket'], ['scarf', '목도리', 'long knitted scarf'], ['overall', '멜빵바지', 'denim-style overalls with buttons'], ['robe', '도포', 'traditional robe with a sash belt'], ['vest', '조끼', 'open vest with buttons'], ['sailor', '세일러 칼라', 'sailor collar top with a neck tie'], ['raincoat', '우비', 'glossy raincoat with buttons'], ['armor', '가슴 갑옷', 'small chest armor plate with rivets'], ['sweater', '줄무늬 스웨터', 'striped knit sweater']];
const HATS = [['none', '없음', 'no hat'], ['gat', '갓', 'Korean traditional gat hat'], ['beret', '베레모', 'tilted beret'], ['crown', '작은 왕관', 'tiny golden crown'], ['beanie', '방울 비니', 'knit beanie with a pompom'], ['flowercrown', '화관', 'flower crown'], ['headband', '머리띠', 'headband with a bow'], ['strawhat', '밀짚모자', 'straw hat with a ribbon'], ['goggles', '고글', 'adventure goggles on the forehead'], ['ribbon', '리본', 'big ribbon bow'], ['sprout', '새싹', 'little sprout growing on the head'], ['starpin', '별 핀', 'star hairpin'], ['none', '없음', 'no hat']];
const PALETTES = [['홍시빛', '#e86f6f', '#ffd76a'], ['하늘빛', '#5b8def', '#ffffff'], ['쑥빛', '#6cc49a', '#fff3b0'], ['라일락빛', '#9b7be0', '#ffd1e8'], ['귤빛', '#f29b52', '#5b4a8a'], ['청록빛', '#3e8e8a', '#f6c85f'], ['진달래빛', '#e76fa3', '#ffffff'], ['남색', '#4a5a8c', '#e8c26a'], ['보리빛', '#c9a46a', '#7a4f2a'], ['물빛', '#8fc1e3', '#2f5d8a'], ['연두빛', '#b5d86a', '#4f7a2a'], ['복숭아빛', '#f4b6c2', '#c24f6a'], ['보랏빛', '#7a6bb0', '#b8f0d8'], ['단풍빛', '#d65a4a', '#2f2f3a'], ['비취빛', '#58b3c9', '#ffe08a'], ['유채빛', '#f2d16b', '#c05a3a']];
const THEMES = [['spring', '봄꽃 정원', 'spring flower garden with falling petals'], ['sea', '여름 바다', 'summer seaside with gentle waves'], ['autumn', '가을 단풍', 'autumn maple leaves'], ['winter', '겨울 눈꽃', 'winter snowflakes'], ['night', '별밤 산책', 'starry night walk'], ['herb', '약초밭', 'herb field with sprouts'], ['cloud', '구름 마을', 'fluffy cloud village'], ['rain', '비 오는 골목', 'rainy alley with raindrops'], ['festival', '등불 축제', 'lantern festival lights'], ['palace', '고궁 산책', 'Korean palace stroll with dancheong patterns']];
const HERBS = ['감초', '계피', '생강', '대추', '오미자', '구기자', '결명자', '박하', '국화', '연꽃', '쑥', '도라지', '더덕', '둥굴레', '칡', '인삼', '황기', '당귀', '작약', '산수유', '복령', '진피', '매실', '오가피', '천궁'];
const SEASONS = ['봄', '여름', '가을', '겨울'];
const ELEMENTS = ['목', '화', '토', '금', '수'];
const EXPRESSIONS = { smile: ['방긋 미소', 'gentle smile'], grin: ['장난스런 웃음', 'mischievous toothy grin'], laugh: ['함박웃음', 'big open-mouthed laugh with closed happy eyes'], wink: ['윙크', 'playful wink'], sleepy: ['졸린 눈', 'sleepy half-closed eyes'], sparkle: ['반짝이는 눈', 'sparkling starry eyes'], determined: ['결연한 눈빛', 'determined look with firm eyebrows'], shy: ['수줍은 홍조', 'shy blushing glance'], surprised: ['깜짝 놀란 눈', 'wide surprised eyes and round mouth'], calm: ['평온한 미소', 'calm content closed-eye smile'], flat: ['심드렁', 'deadpan unimpressed face'], smug: ['으쓱한 표정', 'smug confident smirk'], pout: ['뾰로통', 'puffed-cheek pout'], tongue: ['혀 날름', 'happy face with tongue out'], sing: ['노래하는 입', 'singing with eyes closed and round mouth'] };
const PROPS = { none: ['없음', 'empty hands'], cup: ['찻잔', 'teacup'], leaf: ['나뭇잎', 'large leaf'], magnifier: ['돋보기', 'magnifying glass'], flag: ['깃발', 'small flag'], lantern: ['등불', 'glowing lantern'], basket: ['바구니', 'woven basket'], wand: ['지팡이', 'star wand'], telescope: ['망원경', 'brass telescope'], jar: ['단지', 'round clay jar'], bell: ['종', 'small bell'], brush: ['붓', 'calligraphy brush'], scroll: ['지도', 'rolled map'], log: ['나무토막', 'wooden log'], shield: ['방패', 'round shield'], hourglass: ['모래시계', 'hourglass'], candle: ['초', 'candle'], flower: ['꽃', 'flower'], shovel: ['삽', 'small shovel'], balloon: ['풍선', 'balloon'], rod: ['낚싯대', 'fishing rod'], drum: ['북', 'Korean drum'], compass: ['나침반', 'compass'], perfume: ['향수병', 'perfume bottle'], letter: ['편지', 'letter envelope'], pinwheel: ['바람개비', 'pinwheel'], wateringcan: ['물뿌리개', 'watering can'], fan: ['부채', 'folding fan'], umbrella: ['우산', 'umbrella'], fish: ['물고기 꾸러미', 'bundle of small fish'], flute: ['피리', 'bamboo flute'], horn: ['나팔', 'little trumpet'], key: ['열쇠', 'golden key'], shell: ['소라껍데기', 'spiral seashell'], clover: ['네잎클로버', 'four-leaf clover'], yarn: ['실타래', 'ball of silk yarn'], mic: ['마이크', 'microphone'], sun: ['해 원반', 'sun disc'], ball: ['공', 'striped ball'] };
const POSES = { hold: '한 손에 소품', cheer: '두 팔 번쩍', wave: '손 흔들기', hug: '품에 안기', sit: '앉은 자세', run: '달리는 자세' };

if (rows.length !== 100) throw new Error('Expected 100 rows, got ' + rows.length);
const characters = rows.map((r, i) => {
  const [kind, animal, animalEn, nick, traits, core, action, pose, prop, expression, catchphrase, hatOverride] = r;
  if (!EXPRESSIONS[expression]) throw new Error('expression ' + expression);
  if (!PROPS[prop]) throw new Error('prop ' + prop);
  if (!POSES[pose]) throw new Error('pose ' + pose);
  const outfit = OUTFITS[(i * 5) % OUTFITS.length];
  const hat = hatOverride ? (hatOverride === 'towel' ? ['towel', '온천 수건', 'folded hot-spring towel'] : HATS.find(h => h[0] === hatOverride)) : HATS[(i * 7 + 3) % HATS.length];
  const palette = PALETTES[(i * 3 + Math.floor(i / 16)) % PALETTES.length];
  const theme = THEMES[(i * 3 + Math.floor(i / 10)) % THEMES.length];
  return {
    id: 'R' + String(i + 1).padStart(3, '0'), kind, animal, animalEn, nick,
    traits: traits.split(','), core, action, pose, poseName: POSES[pose], prop, propName: PROPS[prop][0],
    expression, expressionName: EXPRESSIONS[expression][0], catchphrase,
    outfit: outfit[0], outfitName: outfit[1], hat: hat[0], hatName: hat[1],
    palette: { name: palette[0], main: palette[1], accent: palette[2] },
    theme: theme[0], themeName: theme[1], herb: HERBS[(i * 7) % HERBS.length], season: SEASONS[(i * 3 + Math.floor(i / 4)) % 4], element: ELEMENTS[(i * 2 + Math.floor(i / 5)) % 5],
    _en: { outfit: outfit[2], hat: hat[2], theme: theme[2], expression: EXPRESSIONS[expression][1], prop: PROPS[prop][1] }
  };
});
const nicks = new Set(characters.map(c => c.nick)), animals = new Set(characters.map(c => c.animal));
if (nicks.size !== 100 || animals.size !== 100) throw new Error('Duplicate nick or animal');

const style = 'Use case: stylized-concept. Cute chibi mascot character for a Korean pharmacopuncture personality-test site. Match the existing PharmacoTest art: bold clean dark outlines, chibi proportions with a big head, soft pastel colors, warm cream background, full body, centered, no text, no logos.';
const prompts = {
  style,
  characters: characters.map(c => ({
    id: c.id, nick: c.nick,
    prompt: `${style}\nSubject: ${c.animalEn} (${c.animal}). Personality: ${c.traits.join(', ')}.\nFacial expression: ${c._en.expression}.\nAction and pose (Korean): ${c.action}.\nOutfit: ${c._en.outfit} in ${c.palette.main} with ${c.palette.accent} accents, subtle ${c.herb} herb motif pattern. Headwear: ${c._en.hat}. Prop: ${c._en.prop}.\nMood/theme accents around the character: ${c._en.theme}. Keep the background mostly plain warm cream.`
  })),
  sheets: Array.from({ length: 10 }, (_, s) => {
    const group = characters.slice(s * 10, s * 10 + 10);
    return { sheet: 'reserve-' + String(s + 1).padStart(2, '0'), ids: group.map(c => c.id), prompt: `${style}\nCreate EXACTLY 5 columns and 2 rows, 10 EQUAL cells, row-major order, 2:1 canvas. No labels, text, numbers, borders or gutters. Each full-body subject centered in its own cell with 10% padding.\n` + group.map((c, k) => `Cell ${k + 1}: ${c.animalEn}; expression: ${c._en.expression}; action (Korean): ${c.action}; outfit: ${c._en.outfit} (${c.palette.main}/${c.palette.accent}); headwear: ${c._en.hat}; prop: ${c._en.prop}.`).join('\n') };
  })
};
characters.forEach(c => { delete c._en; });
fs.writeFileSync(path.join(root, 'reserve-data.js'), '// scripts/build-reserve.cjs로 생성합니다. 직접 고치지 말고 스크립트를 고친 뒤 다시 실행하세요.\nwindow.PharmacoReserve = ' + JSON.stringify(characters, null, 0).replace(/\},\{/g, '},\n{') + ';\n');
fs.writeFileSync(path.join(root, 'research/reserve-character-prompts.json'), JSON.stringify(prompts, null, 2) + '\n');
console.log('wrote', characters.length, 'characters');

(function () {
  'use strict';
  var definitions = {
  "dnd": {
    "id": "dnd",
    "title": "약침D&D",
    "eyebrow": "내 안의 모험가",
    "emoji": "⚔️",
    "count": 12,
    "columns": 3,
    "lead": "험난한 세상 한복판에 맨몸으로 던져진 당신. 몸은 작고 약하지만 마음만은 누구보다 굳세다. 믿을 수 있는 동료들과 지도 밖으로 떠난 모험길, 보물과 갈림길과 흔들리는 우정 앞에서 당신은 어떤 선택을 할 것인가?",
    "note": "질서·중립·혼돈 × 선·중립·악의 9가지 성향을 빌린 창작 게임입니다. 현실의 도덕성을 판단하지 않아요.",
    "questions": [
      {
        "id": "DO01",
        "axis": "order",
        "prompt": "모험 전야, 여관 구석 탁자에 일행이 모였다. 출발 전 무엇부터 할까?",
        "choices": [
          "역할과 순서, 위급할 때의 신호부터 정해둔다",
          "일단 출발하고 길 위에서 손발을 맞춰간다"
        ]
      },
      {
        "id": "DO02",
        "axis": "order",
        "prompt": "동굴 깊은 곳에서 보물 상자를 열었다. 리더인 당신은 어떻게 나눌까?",
        "choices": [
          "출발 전 약속한 비율대로 정확히 나눈다",
          "오늘 활약을 보고 즉석에서 새 분배안을 낸다"
        ]
      },
      {
        "id": "DO03",
        "axis": "order",
        "prompt": "갈림길 앞, 지도의 큰길과 지도에 없는 오솔길을 두고 동료들이 다툰다.",
        "choices": [
          "검증된 큰길로 가자고 정리한다",
          "지도에 없는 오솔길을 직접 확인하러 간다"
        ]
      },
      {
        "id": "DO04",
        "axis": "order",
        "prompt": "폭풍우가 몰아쳐 계획한 야영지에 갈 수 없게 되었다.",
        "choices": [
          "미리 정해둔 예비 계획을 꺼내 그대로 따른다",
          "눈앞의 폐허 성당에 즉흥으로 짐을 푼다"
        ]
      },
      {
        "id": "DO05",
        "axis": "order",
        "prompt": "성문 경비병이 ‘해가 지면 출입 금지’라며 막아선다. 성 안에서는 동료가 기다린다.",
        "choices": [
          "규칙대로 내일 아침까지 성 밖에서 기다린다",
          "하수로를 찾아 몰래 성 안으로 들어간다"
        ]
      },
      {
        "id": "DO06",
        "axis": "order",
        "prompt": "길드에 가입하면 안정된 의뢰를 받지만 엄격한 규약을 지켜야 한다.",
        "choices": [
          "규약에 서명하고 길드의 일원이 된다",
          "자유 모험가로 남아 의뢰를 골라 받는다"
        ]
      },
      {
        "id": "DO07",
        "axis": "order",
        "prompt": "동료가 정해진 경계 순번을 어기고 잠들어 버렸다.",
        "choices": [
          "아침 회의에서 순번 규칙을 다시 확인시킨다",
          "서로 편할 때 자는 걸로 순번을 아예 없앤다"
        ]
      },
      {
        "id": "DO08",
        "axis": "order",
        "prompt": "고대 유적 입구에 ‘세 번 절하고 들어오라’는 비문이 새겨져 있다.",
        "choices": [
          "의미를 몰라도 전해진 대로 세 번 절한다",
          "비문은 무시하고 벽을 두드려 다른 입구를 찾는다"
        ]
      },
      {
        "id": "DO09",
        "axis": "order",
        "prompt": "마을 장로가 이 마을의 법이라며 당신의 무기를 맡기라고 한다.",
        "choices": [
          "그 땅의 법이니 무기를 맡기고 들어간다",
          "무기는 내 몸이라며 정중히 거절하고 떠난다"
        ]
      },
      {
        "id": "DO10",
        "axis": "order",
        "prompt": "잠든 용의 둥지를 지나야 한다. 작전을 두고 동료들의 의견이 갈린다.",
        "choices": [
          "발소리 박자까지 맞춘 침투 순서를 짠다",
          "각자 감대로 흩어져 지나간 뒤 반대편에서 만난다"
        ]
      },
      {
        "id": "DO11",
        "axis": "order",
        "prompt": "꿈속의 숲에서 길을 잃었다. 나무들이 ‘규칙을 지키면 길을 열어주겠다’고 속삭인다.",
        "choices": [
          "나무들이 말하는 규칙을 하나하나 따라본다",
          "규칙 대신 가장 높은 나무에 올라 길을 찾는다"
        ]
      },
      {
        "id": "DO12",
        "axis": "order",
        "prompt": "왕국의 기사단이 당신에게 정식 작위를 내리겠다고 제안한다.",
        "choices": [
          "맹세를 하고 왕국의 질서 안으로 들어간다",
          "작위는 사양하고 떠돌이 모험가로 남는다"
        ]
      },
      {
        "id": "DO13",
        "axis": "order",
        "prompt": "모닥불 앞, 동료와의 믿음은 무엇으로 쌓이는지 이야기가 이어진다.",
        "choices": [
          "매번 약속을 지키는 한결같은 행동으로 쌓인다",
          "서로의 자유와 다름을 인정할 때 자란다"
        ]
      },
      {
        "id": "DO14",
        "axis": "order",
        "prompt": "어제 세운 원칙 때문에 오늘 동료가 곤란해졌다.",
        "choices": [
          "원칙은 원칙, 예외를 만들면 전부 무너진다",
          "어제의 원칙도 오늘 필요하면 바꿀 수 있다"
        ]
      },
      {
        "id": "DO15",
        "axis": "order",
        "prompt": "시장 뒷골목에서 정가의 절반 값에 마법 물약을 파는 암상인을 만났다.",
        "choices": [
          "허가받은 약재상에서 제값을 주고 산다",
          "흥정 끝에 암시장 물약을 손에 넣는다"
        ]
      },
      {
        "id": "DO16",
        "axis": "order",
        "prompt": "작전 회의 중 신입 동료가 기존 전술을 전부 뒤엎자는 파격적인 제안을 했다.",
        "choices": [
          "검증된 전술을 기본으로 일부만 반영한다",
          "재밌는데? 이번 전투는 그 방식으로 간다"
        ]
      },
      {
        "id": "DO17",
        "axis": "order",
        "prompt": "마법 학원 금서 서고의 열쇠가 발밑에 떨어져 있다.",
        "choices": [
          "사서에게 돌려주고 정식 열람을 신청한다",
          "오늘 밤만 몰래 들어가 읽고 제자리에 둔다"
        ]
      },
      {
        "id": "DO18",
        "axis": "order",
        "prompt": "사막 한가운데서 물이 떨어져 간다. 하루 배급량을 정해야 한다.",
        "choices": [
          "정한 배급표대로 모두 같은 양만 마신다",
          "그날그날 각자 상태를 보며 유연하게 나눈다"
        ]
      },
      {
        "id": "DO19",
        "axis": "order",
        "prompt": "전설의 검이 바위에 꽂혀 있다. 옆 팻말에 ‘시험을 통과한 자만 뽑을 것’이라 적혀 있다.",
        "choices": [
          "마을에 가서 시험 절차부터 알아본다",
          "일단 한번 뽑아본다, 뽑히면 그게 자격이다"
        ]
      },
      {
        "id": "DO20",
        "axis": "order",
        "prompt": "동료들이 매일 아침 같은 순서로 하루를 시작하는 루틴을 제안했다.",
        "choices": [
          "좋다, 루틴이 있어야 위기에도 흔들리지 않는다",
          "매일 똑같으면 숨 막힌다, 그때그때 하자"
        ]
      },
      {
        "id": "DO21",
        "axis": "order",
        "prompt": "하늘을 나는 고래 등 위의 마을. 이곳 주민들은 모든 일을 제비뽑기로 정한다.",
        "choices": [
          "그들의 방식을 존중해 나도 제비를 뽑는다",
          "운에 맡기기 싫어 내 선택을 끝까지 설득한다"
        ]
      },
      {
        "id": "DO22",
        "axis": "order",
        "prompt": "적국의 정찰병을 사로잡았다. 군율에는 본부로 압송하라고 적혀 있다.",
        "choices": [
          "군율대로 본부까지 직접 호송한다",
          "필요한 정보만 듣고 상황을 봐서 풀어준다"
        ]
      },
      {
        "id": "DO23",
        "axis": "order",
        "prompt": "누군가 모험 일지를 쓰자는 의견을 냈다.",
        "choices": [
          "날짜와 장소, 수입과 지출까지 꼼꼼히 기록한다",
          "기억에 남는 순간만 그림처럼 남긴다"
        ]
      },
      {
        "id": "DO24",
        "axis": "order",
        "prompt": "시간이 멈춘 시계탑에 갇혔다. 탈출할 방법은 두 가지뿐이다.",
        "choices": [
          "탑 관리인이 남긴 순서대로 장치를 돌린다",
          "시계 바늘을 거꾸로 돌려 무슨 일이 생기는지 본다"
        ]
      },
      {
        "id": "DO25",
        "axis": "order",
        "prompt": "국경 검문소에서 통행증이 나오려면 사흘이 걸린다고 한다.",
        "choices": [
          "사흘을 기다려 정식 통행증을 받는다",
          "험한 산을 넘어 검문소를 우회한다"
        ]
      },
      {
        "id": "DO26",
        "axis": "order",
        "prompt": "왕의 칙령으로 이 숲의 사냥이 금지되었다. 일행은 사흘째 굶고 있다.",
        "choices": [
          "칙령을 지키고 열매와 뿌리로 버틴다",
          "들키지 않게 작은 사냥감 하나만 잡는다"
        ]
      },
      {
        "id": "DO27",
        "axis": "order",
        "prompt": "축제 날, 광장에 ‘오늘만은 모든 규칙이 없다’는 깃발이 걸렸다.",
        "choices": [
          "그래도 최소한의 질서는 지키며 즐긴다",
          "기회다! 평소 못 하던 일을 전부 해본다"
        ]
      },
      {
        "id": "DO28",
        "axis": "order",
        "prompt": "신전의 신탁은 동쪽으로 가라 했지만, 당신의 직감은 서쪽을 가리킨다.",
        "choices": [
          "신탁이 내려진 데는 이유가 있다, 동쪽으로 간다",
          "내 직감을 믿고 서쪽으로 발길을 돌린다"
        ]
      },
      {
        "id": "DO29",
        "axis": "order",
        "prompt": "새로 꾸린 파티의 리더를 정해야 한다.",
        "choices": [
          "경험과 서열에 따라 리더를 정한다",
          "리더 없이 상황마다 잘하는 사람이 이끈다"
        ]
      },
      {
        "id": "DO30",
        "axis": "order",
        "prompt": "거울 미궁 속, 거울에 비친 내가 ‘규칙을 깨면 출구가 보인다’고 속삭인다.",
        "choices": [
          "유혹을 무시하고 벽을 따라 차근차근 걷는다",
          "거울 속 나를 믿고 거울 안으로 걸어 들어간다"
        ]
      },
      {
        "id": "DO31",
        "axis": "order",
        "prompt": "오래 함께한 파티가 해산 위기다. 새로운 길을 원하는 동료가 늘었다.",
        "choices": [
          "처음 맺은 계약을 끝까지 지키자고 설득한다",
          "각자의 길을 존중하며 자유롭게 흩어지자고 한다"
        ]
      },
      {
        "id": "DC01",
        "axis": "care",
        "prompt": "해 질 무렵, 마차 바퀴가 부서져 발이 묶인 여행자 가족을 만났다.",
        "choices": [
          "일정이 늦어져도 마차 수리를 돕는다",
          "갈 길이 바쁘니 마을 방향만 알려주고 지나간다"
        ]
      },
      {
        "id": "DC02",
        "axis": "care",
        "prompt": "함정 방이 무너지고 있다. 출구는 하나, 뒤처진 동료가 보인다.",
        "choices": [
          "뒤처진 동료부터 끌어올린다",
          "내가 먼저 빠져나가 밖에서 밧줄을 내린다"
        ]
      },
      {
        "id": "DC03",
        "axis": "care",
        "prompt": "의뢰 보상으로 금화 100닢을 받았다. 가장 많이 싸운 건 당신이다.",
        "choices": [
          "공평하게 모두 똑같이 나눈다",
          "기여한 만큼 내 몫을 더 챙긴다"
        ]
      },
      {
        "id": "DC04",
        "axis": "care",
        "prompt": "마을을 위협하던 괴물이 사실은 새끼를 지키려던 어미였다.",
        "choices": [
          "괴물과 마을이 공존할 방법을 찾는다",
          "의뢰는 의뢰, 퇴치하고 보상을 받는다"
        ]
      },
      {
        "id": "DC05",
        "axis": "care",
        "prompt": "전리품에서 강력한 마법 반지가 나왔다. 동료 한 명에게 꼭 필요한 물건이다.",
        "choices": [
          "필요한 동료에게 먼저 건넨다",
          "내가 끼고 더 강해져서 팀을 지킨다"
        ]
      },
      {
        "id": "DC06",
        "axis": "care",
        "prompt": "적의 성에서 탈출하던 중, 감옥에 갇힌 낯선 포로들을 발견했다.",
        "choices": [
          "위험해도 포로들을 함께 데리고 나간다",
          "우리 탈출이 먼저, 나중에 구조대를 보낸다"
        ]
      },
      {
        "id": "DC07",
        "axis": "care",
        "prompt": "거상이 마을 우물을 사들여 물값을 올리려 한다. 그가 당신에게 큰돈을 내민다.",
        "choices": [
          "제안을 거절하고 마을 편에 선다",
          "돈을 받고 이 일에서 손을 뗀다"
        ]
      },
      {
        "id": "DC08",
        "axis": "care",
        "prompt": "동료가 몰래 당신의 비상식량을 먹어버린 걸 알았다.",
        "choices": [
          "오죽 배고팠으면, 모른 척 넘어간다",
          "다음 보급 때 내 몫을 확실히 돌려받는다"
        ]
      },
      {
        "id": "DC09",
        "axis": "care",
        "prompt": "마왕을 쓰러뜨린 공로로 왕이 단 한 명만 기사로 임명하겠다고 한다.",
        "choices": [
          "가장 고생한 동료를 추천한다",
          "리더였던 내가 받는 게 맞다고 말한다"
        ]
      },
      {
        "id": "DC10",
        "axis": "care",
        "prompt": "꿈의 상인이 ‘슬픈 기억 하나’를 받고 소원 하나를 들어주겠다고 한다.",
        "choices": [
          "앓고 있는 동료의 병을 낫게 해달라고 빈다",
          "내 오랜 꿈을 이루게 해달라고 빈다"
        ]
      },
      {
        "id": "DC11",
        "axis": "care",
        "prompt": "쓰러진 적군 부상병이 물 한 모금만 달라고 애원한다.",
        "choices": [
          "적이어도 물을 나눠주고 상처를 싸맨다",
          "정보를 먼저 말하면 물을 주겠다고 한다"
        ]
      },
      {
        "id": "DC12",
        "axis": "care",
        "prompt": "고아 소년이 일행을 따라오며 함께 모험하고 싶다고 조른다.",
        "choices": [
          "안전한 마을까지 데려다주고 보살펴준다",
          "짐이 될 뿐이니 단호하게 돌려보낸다"
        ]
      },
      {
        "id": "DC13",
        "axis": "care",
        "prompt": "폐광에서 거대한 보석을 캐냈다. 주인 없는 땅이지만 근처 마을은 몹시 가난하다.",
        "choices": [
          "마을 재건에 쓰도록 보석을 내놓는다",
          "발견한 사람이 임자, 내 금고에 넣는다"
        ]
      },
      {
        "id": "DC14",
        "axis": "care",
        "prompt": "동료의 실수로 의뢰를 망쳤다. 화가 난 의뢰인이 책임자를 찾는다.",
        "choices": [
          "리더인 내가 책임지겠다고 나선다",
          "사실대로 실수한 동료를 지목한다"
        ]
      },
      {
        "id": "DC15",
        "axis": "care",
        "prompt": "눈보라 치는 설산, 담요가 하나 남았다. 동료가 오한에 떨고 있다.",
        "choices": [
          "망설임 없이 담요를 동료에게 덮어준다",
          "내가 쓰러지면 모두 위험하다며 내가 덮는다"
        ]
      },
      {
        "id": "DC16",
        "axis": "care",
        "prompt": "별이 쏟아지는 밤, 동료가 묻는다. 힘이 생긴다면 무엇을 하고 싶어?",
        "choices": [
          "주변 사람들이 더 안전하게 살게 하고 싶다",
          "누구도 나를 함부로 못 하게 하고 싶다"
        ]
      },
      {
        "id": "DC17",
        "axis": "care",
        "prompt": "라이벌 파티가 함정에 빠져 도움을 청한다. 구하면 보물 경쟁에서 진다.",
        "choices": [
          "라이벌이라도 일단 구하고 본다",
          "이번엔 지나치고 보물을 먼저 차지한다"
        ]
      },
      {
        "id": "DC18",
        "axis": "care",
        "prompt": "약초꾼 할머니가 귀한 약초를 건네며 ‘필요한 사람에게 쓰라’고 한다.",
        "choices": [
          "길에서 만난 아픈 이에게 아낌없이 쓴다",
          "비싸게 팔아 장비를 업그레이드한다"
        ]
      },
      {
        "id": "DC19",
        "axis": "care",
        "prompt": "동료가 현상금이 걸린 몰락 왕족이라는 비밀을 알게 되었다.",
        "choices": [
          "비밀을 지켜주고 끝까지 함께한다",
          "비밀을 지켜주는 대가를 넌지시 요구한다"
        ]
      },
      {
        "id": "DC20",
        "axis": "care",
        "prompt": "격전 끝에 승리했다. 항복한 적 기사가 무릎을 꿇었다.",
        "choices": [
          "무기를 거두고 살려서 돌려보낸다",
          "몸값을 받을 수 있게 포로로 잡아둔다"
        ]
      },
      {
        "id": "DC21",
        "axis": "care",
        "prompt": "상금이 걸린 마을 축제 대회 결승에서 동료와 맞붙게 되었다.",
        "choices": [
          "동료의 꿈을 알기에 살짝 져준다",
          "승부는 승부, 전력을 다해 이긴다"
        ]
      },
      {
        "id": "DC22",
        "axis": "care",
        "prompt": "달빛 호수의 요정이 ‘가장 소중한 것을 내놓으면 일행 모두를 지켜주겠다’고 한다.",
        "choices": [
          "내 가장 소중한 것을 내놓는다",
          "다른 방법을 찾아 내 것은 지킨다"
        ]
      },
      {
        "id": "DC23",
        "axis": "care",
        "prompt": "모험 길드에 성과 보고서를 낸다. 성공의 열쇠는 동료의 아이디어였다.",
        "choices": [
          "동료의 이름을 맨 앞에 적는다",
          "팀 리더로서 내 이름으로 보고한다"
        ]
      },
      {
        "id": "DC24",
        "axis": "care",
        "prompt": "흉년을 틈타 식량 값이 세 배로 뛰었다. 당신의 창고에는 남는 식량이 있다.",
        "choices": [
          "원가에 굶주린 이웃들에게 나눈다",
          "시세대로 팔아 여비를 두둑이 마련한다"
        ]
      },
      {
        "id": "DC25",
        "axis": "care",
        "prompt": "팀의 핵심 전력인 동료가 이번 모험을 끝으로 고향에 돌아가겠다고 한다.",
        "choices": [
          "아쉽지만 그의 선택을 진심으로 응원한다",
          "더 큰 보상을 약속해서라도 붙잡는다"
        ]
      },
      {
        "id": "DC26",
        "axis": "care",
        "prompt": "저주받은 마을 사람들이 돌로 변하고 있다. 해독제는 일행의 치료 물약뿐이다.",
        "choices": [
          "물약을 마을 사람들에게 모두 나눈다",
          "다음 전투를 대비해 물약을 아껴둔다"
        ]
      },
      {
        "id": "DC27",
        "axis": "care",
        "prompt": "적의 첩자가 큰 보상을 약속하며 일행의 정보를 팔라고 한다.",
        "choices": [
          "단칼에 거절하고 동료들에게 알린다",
          "쓸모없는 정보만 팔아 보상을 챙긴다"
        ]
      },
      {
        "id": "DC28",
        "axis": "care",
        "prompt": "발을 다친 동료 때문에 일정이 자꾸 늦어진다.",
        "choices": [
          "속도를 맞추고 그의 짐을 나눠 든다",
          "다음 마을에서 만나자며 먼저 출발한다"
        ]
      },
      {
        "id": "DC29",
        "axis": "care",
        "prompt": "하늘섬 끝에서 떨어지는 아이를 봤다. 잡으려면 당신의 비행 날개가 찢어질지 모른다.",
        "choices": [
          "망설임 없이 뛰어들어 아이를 붙잡는다",
          "날개를 지키고 아래쪽 사람들에게 소리친다"
        ]
      },
      {
        "id": "DC30",
        "axis": "care",
        "prompt": "떠돌이 마법사가 당신의 수명 1년을 대가로 동료의 목숨을 살릴 수 있다고 한다.",
        "choices": [
          "기꺼이 내 1년을 내준다",
          "다른 치료법이 없는지 끝까지 흥정한다"
        ]
      },
      {
        "id": "DC31",
        "axis": "care",
        "prompt": "긴 모험의 끝, 왕이 당신의 소원 하나를 들어주겠다고 한다.",
        "choices": [
          "모두가 굶지 않는 나라를 만들어 달라고 한다",
          "나만의 성과 넓은 영지를 달라고 한다"
        ]
      }
    ],
    "labels": {
      "LG": "질서 선",
      "NG": "중립 선",
      "CG": "혼돈 선",
      "LN": "질서 중립",
      "TN": "완전 중립",
      "CN": "혼돈 중립",
      "LE": "질서 악",
      "NE": "중립 악",
      "CE": "혼돈 악"
    }
  },
  "abo": {
    "id": "abo",
    "title": "약침ABO±",
    "eyebrow": "내 마음의 리듬",
    "emoji": "🩸",
    "count": 12,
    "columns": 4,
    "lead": "정리하는 방식, 사람을 만나는 리듬, 에너지를 쓰는 속도. 여덟 가지 상상의 혈액형 중 나와 닮은 타입을 찾아요.",
    "note": "실제 ABO·Rh 혈액형을 측정하거나 추정하지 않는 창작 성격 게임입니다.",
    "questions": [
      {
        "axis": "rhythm",
        "choices": [
          "새 일을 시작하면 순서부터 정한다",
          "새 일을 시작하면 끌리는 부분부터 해본다"
        ]
      },
      {
        "axis": "rhythm",
        "choices": [
          "약속 장소와 시간을 미리 확정하면 편하다",
          "약속은 당일 분위기에 맞춰 바꿔도 좋다"
        ]
      },
      {
        "axis": "rhythm",
        "choices": [
          "물건은 정해둔 자리에 두는 편이다",
          "그때그때 쓰기 좋은 곳에 두는 편이다"
        ]
      },
      {
        "axis": "rhythm",
        "choices": [
          "여행에서는 안정적인 동선이 좋다",
          "여행에서는 뜻밖의 발견이 좋다"
        ]
      },
      {
        "axis": "expression",
        "choices": [
          "생각을 정리한 뒤 조용히 꺼낸다",
          "대화를 나누면서 생각을 정리한다"
        ]
      },
      {
        "axis": "expression",
        "choices": [
          "좋은 소식은 가까운 몇 사람에게 전한다",
          "좋은 소식은 여러 사람과 나누고 싶다"
        ]
      },
      {
        "axis": "expression",
        "choices": [
          "편한 휴식은 혼자 또는 소수와 함께다",
          "편한 휴식은 함께 웃을 사람이 있는 자리다"
        ]
      },
      {
        "axis": "expression",
        "choices": [
          "새 모임에서는 분위기를 먼저 지켜본다",
          "새 모임에서는 먼저 인사를 건넨다"
        ]
      },
      {
        "axis": "charge",
        "choices": [
          "기회가 오면 일단 손을 들고 본다",
          "기회가 오면 내 여유부터 확인한다"
        ]
      },
      {
        "axis": "charge",
        "choices": [
          "바쁜 날에도 재미있으면 일정을 하나 더 넣는다",
          "바쁜 날에는 다음 일정을 줄여 균형을 맞춘다"
        ]
      },
      {
        "axis": "charge",
        "choices": [
          "기분이 좋아지면 바로 행동하고 싶다",
          "기분이 좋아져도 나만의 속도로 움직인다"
        ]
      },
      {
        "axis": "charge",
        "choices": [
          "새로운 자극을 받으면 에너지가 살아난다",
          "익숙하고 편안한 공간에서 에너지가 돌아온다"
        ]
      }
    ],
    "labels": {
      "A_POS": "A+",
      "A_NEG": "A−",
      "B_POS": "B+",
      "B_NEG": "B−",
      "O_POS": "O+",
      "O_NEG": "O−",
      "AB_POS": "AB+",
      "AB_NEG": "AB−"
    }
  },
  "enneagram": {
    "id": "enneagram",
    "title": "약침에니어그램",
    "eyebrow": "행동 뒤의 마음",
    "emoji": "✳️",
    "count": 15,
    "columns": 3,
    "lead": "같은 상황에서 두 마음 중 평소 더 우선하는 쪽을 골라보세요. 50개 상황 중 유형별 비교 기회를 고르게 맞춘 15문항이 무작위로 나옵니다.",
    "note": "9가지 동기 유형을 참고해 직접 만든 재미용 문항입니다. 공인 심리검사나 진단 결과가 아니에요.",
    "questions": [
      {
        "id": "EN01",
        "prompt": "친한 동료가 반복해서 규칙을 어겨 곤란해할 때",
        "choices": [
          "관계가 불편해져도 같은 기준을 적용한다",
          "기준을 잠시 늦추더라도 동료의 사정을 돌본다"
        ],
        "types": [
          "E1",
          "E2"
        ]
      },
      {
        "id": "EN02",
        "prompt": "마감 직전, 결과물에 작은 결함을 발견했을 때",
        "choices": [
          "평가가 늦어져도 기준에 맞게 고친다",
          "작은 결함은 남겨도 약속한 성과를 제때 낸다"
        ],
        "types": [
          "E1",
          "E3"
        ]
      },
      {
        "id": "EN03",
        "prompt": "내 작품을 완성할 때 더 포기하기 어려운 것은",
        "choices": [
          "내 취향보다 누구에게나 납득될 완성도다",
          "보편적인 완성도보다 내 감정이 드러나는 표현이다"
        ],
        "types": [
          "E1",
          "E4"
        ]
      },
      {
        "id": "EN04",
        "prompt": "팀의 작업 방식이 잘못됐다고 느낄 때",
        "choices": [
          "분석이 덜 끝나도 기준을 세워 바로잡는다",
          "바로 고치기보다 원인을 충분히 이해할 때까지 살핀다"
        ],
        "types": [
          "E1",
          "E5"
        ]
      },
      {
        "id": "EN05",
        "prompt": "팀의 결정이 내 원칙과 어긋날 때",
        "choices": [
          "팀의 지지가 없어도 옳다고 보는 기준을 따른다",
          "혼자 확신하기보다 믿을 사람들과 판단을 다시 확인한다"
        ],
        "types": [
          "E1",
          "E6"
        ]
      },
      {
        "id": "EN06",
        "prompt": "휴일에 끝내지 못한 일이 떠오를 때",
        "choices": [
          "마음이 가벼워지도록 해야 할 일부터 끝낸다",
          "할 일은 남겨두고 오늘 가능한 즐거움을 먼저 즐긴다"
        ],
        "types": [
          "E1",
          "E7"
        ]
      },
      {
        "id": "EN07",
        "prompt": "불합리한 지시를 바꿔야 할 때",
        "choices": [
          "상대도 따라야 할 공통 기준을 근거로 설득한다",
          "기준 논쟁보다 내가 결정권을 확보해 바꾼다"
        ],
        "types": [
          "E1",
          "E8"
        ]
      },
      {
        "id": "EN08",
        "prompt": "모임에서 잘못된 관행을 발견했을 때",
        "choices": [
          "분위기가 어색해져도 문제를 분명히 지적한다",
          "당장 지적하기보다 분위기를 지키며 천천히 바꾼다"
        ],
        "types": [
          "E1",
          "E9"
        ]
      },
      {
        "id": "EN09",
        "prompt": "바쁜 날 팀에 한 시간만 더 쓸 수 있다면",
        "choices": [
          "내 실적은 미루고 힘들어하는 동료를 돕는다",
          "개별 도움은 미루고 내 몫의 성과를 마무리한다"
        ],
        "types": [
          "E2",
          "E3"
        ]
      },
      {
        "id": "EN10",
        "prompt": "친한 사람과 원하는 것이 다를 때",
        "choices": [
          "내 바람을 접더라도 상대에게 필요한 사람이 되고 싶다",
          "상대가 서운해해도 내 진짜 마음을 표현하고 싶다"
        ],
        "types": [
          "E2",
          "E4"
        ]
      },
      {
        "id": "EN11",
        "prompt": "가까운 사람이 예정 없이 긴 상담을 원할 때",
        "choices": [
          "혼자 쓸 시간을 줄여서라도 곁을 내준다",
          "당장 곁을 내주기보다 내 시간을 확보하고 약속을 잡는다"
        ],
        "types": [
          "E2",
          "E5"
        ]
      },
      {
        "id": "EN12",
        "prompt": "새 팀에서 내가 안심하는 순간은",
        "choices": [
          "사람들이 나에게 도움을 청하며 필요로 할 때다",
          "서로의 역할과 약속이 분명해 믿고 의지할 수 있을 때다"
        ],
        "types": [
          "E2",
          "E6"
        ]
      },
      {
        "id": "EN13",
        "prompt": "친구가 힘든 이야기를 오래 털어놓을 때",
        "choices": [
          "다른 계획을 미루고 그 마음 곁에 머문다",
          "이야기에 오래 머물기보다 함께 기분을 바꿀 일을 제안한다"
        ],
        "types": [
          "E2",
          "E7"
        ]
      },
      {
        "id": "EN14",
        "prompt": "가까운 사람이 내 제안을 거절했을 때",
        "choices": [
          "다시 마음을 열도록 상대에게 맞춰 다가간다",
          "관계를 달래기보다 내 입장과 한계를 분명히 한다"
        ],
        "types": [
          "E2",
          "E8"
        ]
      },
      {
        "id": "EN15",
        "prompt": "모임에서 한 사람의 부탁이 전체 흐름과 어긋날 때",
        "choices": [
          "분위기가 흔들려도 그 사람이 원하는 도움을 챙긴다",
          "그 부탁을 다 들어주기보다 모두 편한 접점을 찾는다"
        ],
        "types": [
          "E2",
          "E9"
        ]
      },
      {
        "id": "EN16",
        "prompt": "많이 주목받을 기회가 내 취향과 맞지 않을 때",
        "choices": [
          "내 색을 조정해서라도 성과와 인정을 얻는다",
          "주목을 덜 받아도 내 색을 유지한다"
        ],
        "types": [
          "E3",
          "E4"
        ]
      },
      {
        "id": "EN17",
        "prompt": "새 일을 시작할 준비가 충분하지 않을 때",
        "choices": [
          "완벽히 이해하지 못해도 실행하며 성과를 만든다",
          "성과가 늦어져도 구조를 이해한 뒤 실행한다"
        ],
        "types": [
          "E3",
          "E5"
        ]
      },
      {
        "id": "EN18",
        "prompt": "성과는 크지만 실패 위험도 큰 제안을 받았을 때",
        "choices": [
          "확실한 대비가 부족해도 도전해 성과를 노린다",
          "큰 성과를 놓쳐도 대비책이 생길 때까지 보류한다"
        ],
        "types": [
          "E3",
          "E6"
        ]
      },
      {
        "id": "EN19",
        "prompt": "잘되지만 반복적인 일과 재미있는 새 일 중 고른다면",
        "choices": [
          "재미가 줄어도 성과가 쌓이는 일을 이어간다",
          "성과가 불확실해도 새로운 가능성이 있는 일로 옮긴다"
        ],
        "types": [
          "E3",
          "E7"
        ]
      },
      {
        "id": "EN20",
        "prompt": "공동 프로젝트의 얼굴이 될 기회를 받았을 때",
        "choices": [
          "주도권을 나눠도 성과가 잘 드러나는 역할을 맡는다",
          "주목은 덜 받아도 실제 결정권이 있는 역할을 맡는다"
        ],
        "types": [
          "E3",
          "E8"
        ]
      },
      {
        "id": "EN21",
        "prompt": "친구들과의 여유로운 시간이 내 목표 일정과 겹치면",
        "choices": [
          "분위기를 깨더라도 내 목표를 위해 먼저 자리를 뜬다",
          "목표를 조금 늦추고 함께하는 흐름에 머문다"
        ],
        "types": [
          "E3",
          "E9"
        ]
      },
      {
        "id": "EN22",
        "prompt": "속상한 일을 이해하려 할 때 먼저 하는 것은",
        "choices": [
          "감정을 충분히 느끼며 내게 어떤 의미인지 표현하는 것이다",
          "감정에서 거리를 두고 원인과 구조를 정리하는 것이다"
        ],
        "types": [
          "E4",
          "E5"
        ]
      },
      {
        "id": "EN23",
        "prompt": "사람들이 권하는 안정적인 길이 나답지 않게 느껴지면",
        "choices": [
          "불안정해도 내 정체성에 맞는 길을 고른다",
          "내 색을 조금 접어도 믿을 근거가 있는 길을 고른다"
        ],
        "types": [
          "E4",
          "E6"
        ]
      },
      {
        "id": "EN24",
        "prompt": "우울한 기분이 드는 저녁에 더 가까운 선택은",
        "choices": [
          "기분을 빨리 바꾸기보다 그 감정에 어울리는 시간을 보낸다",
          "그 감정에 머물기보다 즐거운 계획으로 기분을 바꾼다"
        ],
        "types": [
          "E4",
          "E7"
        ]
      },
      {
        "id": "EN25",
        "prompt": "상처받은 마음을 상대에게 전할 때 더 중요한 것은",
        "choices": [
          "상대가 내 감정의 깊이와 의미를 이해하는 것이다",
          "상대가 넘지 말아야 할 선을 분명히 아는 것이다"
        ],
        "types": [
          "E4",
          "E8"
        ]
      },
      {
        "id": "EN26",
        "prompt": "내 취향이 모임의 다수 의견과 다를 때",
        "choices": [
          "분위기가 어색해져도 내 취향이 지워지지 않게 말한다",
          "내 취향을 강하게 드러내기보다 함께 편한 쪽에 맞춘다"
        ],
        "types": [
          "E4",
          "E9"
        ]
      },
      {
        "id": "EN27",
        "prompt": "불확실한 일을 맡았을 때 먼저 확보하고 싶은 것은",
        "choices": [
          "다른 사람 의견보다 스스로 이해할 정보와 시간이다",
          "혼자 이해할 시간보다 믿고 확인할 사람과 대비책이다"
        ],
        "types": [
          "E5",
          "E6"
        ]
      },
      {
        "id": "EN28",
        "prompt": "관심 가는 주제가 여러 개 생겼을 때",
        "choices": [
          "다른 기회를 놓쳐도 하나를 깊이 파고든다",
          "하나의 깊이는 줄어도 여러 가능성을 넓게 경험한다"
        ],
        "types": [
          "E5",
          "E7"
        ]
      },
      {
        "id": "EN29",
        "prompt": "정보가 부족한 상태에서 어려운 협상을 해야 한다면",
        "choices": [
          "주도권을 잠시 내줘도 물러서서 더 파악한다",
          "정보가 덜 모여도 앞으로 나서 결정권을 잡는다"
        ],
        "types": [
          "E5",
          "E8"
        ]
      },
      {
        "id": "EN30",
        "prompt": "주말에 별로 내키지 않는 공동 일정이 잡혔을 때",
        "choices": [
          "분위기가 불편해져도 혼자 쓸 시간을 분명히 확보한다",
          "혼자 쓸 시간을 줄여도 큰 마찰 없이 일정에 맞춘다"
        ],
        "types": [
          "E5",
          "E9"
        ]
      },
      {
        "id": "EN31",
        "prompt": "갑자기 여행 기회가 생겼지만 변수가 많을 때",
        "choices": [
          "일정을 늦추더라도 위험과 대비책을 먼저 확인한다",
          "대비가 덜 되어도 기회를 잡고 현장에서 풀어간다"
        ],
        "types": [
          "E6",
          "E7"
        ]
      },
      {
        "id": "EN32",
        "prompt": "중요한 결정을 두고 모두 주저할 때",
        "choices": [
          "내가 확신해도 반대 근거와 동료의 확인을 더 구한다",
          "반대 가능성을 다 확인하기보다 내가 책임지고 결정한다"
        ],
        "types": [
          "E6",
          "E8"
        ]
      },
      {
        "id": "EN33",
        "prompt": "모임의 계획에 걱정되는 허점이 보일 때",
        "choices": [
          "분위기가 불편해져도 위험을 꺼내 확인한다",
          "당장 위험을 따지기보다 불안을 가라앉히고 흐름을 따른다"
        ],
        "types": [
          "E6",
          "E9"
        ]
      },
      {
        "id": "EN34",
        "prompt": "다른 사람이 내 계획을 가로막았을 때",
        "choices": [
          "정면 대결에 시간을 쓰기보다 재미있는 다른 길을 찾는다",
          "다른 길로 피하기보다 맞서서 내 선택권을 지킨다"
        ],
        "types": [
          "E7",
          "E8"
        ]
      },
      {
        "id": "EN35",
        "prompt": "아무 일정 없는 편안한 주말에 더 끌리는 쪽은",
        "choices": [
          "조금 번거로워져도 새로운 즐길 거리를 찾아 나선다",
          "새 자극을 찾기보다 지금의 편안한 흐름을 이어간다"
        ],
        "types": [
          "E7",
          "E9"
        ]
      },
      {
        "id": "EN36",
        "prompt": "가까운 사람과 내 요구가 정면으로 충돌할 때",
        "choices": [
          "충돌이 커져도 내 요구를 직접 밀고 나간다",
          "내 요구를 조금 낮춰도 갈등이 잦아들 접점을 찾는다"
        ],
        "types": [
          "E8",
          "E9"
        ]
      },
      {
        "id": "EN37",
        "prompt": "부탁받은 일을 해주면 정해둔 원칙을 어기게 될 때",
        "choices": [
          "서운해할 수 있어도 원칙 때문에 거절한다",
          "원칙에 예외를 두더라도 부탁한 사람을 챙긴다"
        ],
        "types": [
          "E1",
          "E2"
        ]
      },
      {
        "id": "EN38",
        "prompt": "발표 자료를 고칠 시간이 한 번만 남았다면",
        "choices": [
          "개인적인 색을 줄여도 평가받기 쉬운 성과를 강조한다",
          "성과 강조를 줄여도 내 생각과 색이 드러나게 고친다"
        ],
        "types": [
          "E3",
          "E4"
        ]
      },
      {
        "id": "EN39",
        "prompt": "낯선 장비를 혼자 다뤄야 할 때",
        "choices": [
          "누군가의 확답보다 직접 원리를 이해해야 안심된다",
          "혼자 원리를 파기보다 믿을 담당자의 확인이 있어야 안심된다"
        ],
        "types": [
          "E5",
          "E6"
        ]
      },
      {
        "id": "EN40",
        "prompt": "원하던 활동이 금지됐을 때 더 먼저 드는 마음은",
        "choices": [
          "다투는 데 묶이기보다 다른 즐거움을 찾고 싶다",
          "다른 즐거움보다 내 자유를 제한한 결정에 맞서고 싶다"
        ],
        "types": [
          "E7",
          "E8"
        ]
      },
      {
        "id": "EN41",
        "prompt": "함께 만든 약속을 사람들이 대충 넘기려 할 때",
        "choices": [
          "작은 어긋남은 넘기고 서로 편한 분위기를 지킨다",
          "분위기가 굳어져도 정한 기준대로 하자고 말한다"
        ],
        "types": [
          "E9",
          "E1"
        ]
      },
      {
        "id": "EN42",
        "prompt": "내가 애쓴 일을 아무도 알아주지 않을 때 더 아쉬운 것은",
        "choices": [
          "나에게 기대고 마음을 나누는 사람이 없다는 점이다",
          "내 성과와 능력이 제대로 인정되지 않았다는 점이다"
        ],
        "types": [
          "E2",
          "E3"
        ]
      },
      {
        "id": "EN43",
        "prompt": "누군가 내 생각을 이해하지 못할 때",
        "choices": [
          "내 마음이 전해지도록 개인적인 경험과 감정을 더 이야기한다",
          "개인적인 감정은 덜어내고 개념과 근거를 더 설명한다"
        ],
        "types": [
          "E4",
          "E5"
        ]
      },
      {
        "id": "EN44",
        "prompt": "앞으로의 일정이 갑자기 비었을 때 먼저 하고 싶은 것은",
        "choices": [
          "예상 가능한 계획을 다시 세워 불확실함을 줄이는 것이다",
          "계획을 바로 채우기보다 새로운 기회를 열어두는 것이다"
        ],
        "types": [
          "E6",
          "E7"
        ]
      },
      {
        "id": "EN45",
        "prompt": "팀 안에서 내 의견이 계속 묻힐 때",
        "choices": [
          "어색해지더라도 강하게 말해 영향력을 되찾는다",
          "강하게 주장하기보다 다른 사람과 무리 없는 합의를 찾는다"
        ],
        "types": [
          "E8",
          "E9"
        ]
      },
      {
        "id": "EN46",
        "prompt": "누가 봐도 성공적인 결과지만 과정이 원칙에 어긋났다면",
        "choices": [
          "좋은 평가를 잃어도 과정의 잘못을 먼저 바로잡는다",
          "과정의 아쉬움보다 달성한 성과를 먼저 살린다"
        ],
        "types": [
          "E1",
          "E3"
        ]
      },
      {
        "id": "EN47",
        "prompt": "친구가 내 취향과 전혀 다른 선물을 원할 때",
        "choices": [
          "내 색이 드러나지 않아도 친구가 원하는 것을 고른다",
          "친구의 요구에 다 맞추기보다 내 진심과 취향이 담긴 것을 고른다"
        ],
        "types": [
          "E2",
          "E4"
        ]
      },
      {
        "id": "EN48",
        "prompt": "남은 자유 시간이 한 시간뿐일 때",
        "choices": [
          "새 경험 하나를 포기해도 궁금하던 것을 끝까지 이해한다",
          "이해를 마무리하기보다 아직 안 해본 경험을 해본다"
        ],
        "types": [
          "E5",
          "E7"
        ]
      },
      {
        "id": "EN49",
        "prompt": "처음 맡은 일에서 책임자를 정해야 할 때",
        "choices": [
          "혼자 책임지기보다 함께 검토하고 책임질 체계를 원한다",
          "검토 체계를 기다리기보다 내가 결정하고 책임지겠다고 한다"
        ],
        "types": [
          "E6",
          "E8"
        ]
      },
      {
        "id": "EN50",
        "prompt": "휴식 중인데 내 목표를 앞당길 일이 생겼을 때",
        "choices": [
          "목표가 늦어져도 지금의 여유와 평온을 유지한다",
          "여유를 깨더라도 기회가 왔을 때 목표를 앞당긴다"
        ],
        "types": [
          "E9",
          "E3"
        ]
      }
    ],
    "labels": {
      "E1": "1번 · 개혁가",
      "E2": "2번 · 조력가",
      "E3": "3번 · 성취가",
      "E4": "4번 · 개성가",
      "E5": "5번 · 탐구가",
      "E6": "6번 · 충실가",
      "E7": "7번 · 낙천가",
      "E8": "8번 · 도전가",
      "E9": "9번 · 평화가"
    }
  }
};
  function axis(answers, questions, name, neutral) {
    var sum = 0, count = 0;
    questions.forEach(function (q, i) { if (q.axis === name && answers[i] !== null) { sum += answers[i] === 0 ? -1 : 1; count++; } });
    if (!count) return 0;
    return neutral ? (sum < -1 ? -1 : sum > 1 ? 1 : 0) : (sum <= 0 ? -1 : 1);
  }
  // 62개 상황 중 질서·배려 축에서 6문항씩 무작위로 고릅니다.
  definitions.dnd.selectQuestions = function (random) { return axisQuestions(definitions.dnd.questions, ['order', 'care'], definitions.dnd.count, random); };
  definitions.dnd.score = function (a, q) {
    var order = axis(a, q, 'order', true), care = axis(a, q, 'care', true);
    var id = (order < 0 ? 'L' : order > 0 ? 'C' : 'T') + (care < 0 ? 'G' : care > 0 ? 'E' : 'N');
    if (id === 'TG') id = 'NG'; if (id === 'TE') id = 'NE';
    return { id: id, summary: '질서·자유와 배려·자기 이익의 두 축을 조합한 결과예요.' };
  };
  definitions.abo.score = function (a, q) {
    var rhythm = axis(a, q, 'rhythm'), expression = axis(a, q, 'expression'), charge = axis(a, q, 'charge');
    var group = rhythm < 0 ? (expression < 0 ? 'A' : 'O') : (expression < 0 ? 'AB' : 'B');
    return { id: group + (charge < 0 ? '_POS' : '_NEG'), summary: '정돈·즉흥, 표현 방식, 에너지 리듬을 조합한 상상의 혈액형이에요.' };
  };
  function shuffled(items, random) {
    var a = items.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(random() * (i + 1)), v = a[i]; a[i] = a[j]; a[j] = v; }
    return a;
  }
  // Havel–Hakimi: builds a simple comparison graph with the requested exposure count per type.
  function pairSchedule(degrees, random) {
    var nodes = shuffled(Object.keys(degrees), random).map(function (id) { return { id: id, left: degrees[id] }; }), pairs = [];
    while (nodes.some(function (n) { return n.left > 0; })) {
      nodes = shuffled(nodes, random).sort(function (a, b) { return b.left - a.left; });
      var first = nodes.shift(), count = first.left;
      for (var i = 0; i < count; i++) { if (!nodes[i] || nodes[i].left <= 0) throw new Error('Invalid comparison balance'); pairs.push([first.id, nodes[i].id]); nodes[i].left--; }
    }
    return pairs;
  }
  // 같은 유형 쌍이 두 번 나오더라도 같은 문항은 다시 고르지 않습니다.
  function pickPairQuestions(pool, pairs, random) {
    var used = {};
    return pairs.map(function (pair) {
      var choices = pool.filter(function (q) { return !used[q.id] && q.types.indexOf(pair[0]) !== -1 && q.types.indexOf(pair[1]) !== -1; });
      if (!choices.length) throw new Error('Missing question for ' + pair.join(':'));
      var q = choices[Math.floor(random() * choices.length)]; used[q.id] = true; return q;
    });
  }
  // 무작위로 고른 extra개 유형만 한 번 더 비교합니다. 9유형·15문항이면 3유형 4회, 6유형 3회.
  function balancedPairs(pool, ids, count, random) {
    random = random || Math.random;
    var total = count * 2, base = Math.floor(total / ids.length), extra = total % ids.length, degrees = {};
    shuffled(ids, random).forEach(function (id, i) { degrees[id] = base + (i < extra ? 1 : 0); });
    return shuffled(pickPairQuestions(pool, pairSchedule(degrees, random), random), random);
  }
  // 비교 기회 대비 선택 비율 → 선택 수 → 마지막 선택 순서.
  function ratioScore(ids, answers, questions) {
    var scores = {}, last = {}, opportunities = {};
    ids.forEach(function (id) { scores[id] = 0; last[id] = -1; opportunities[id] = 0; });
    questions.forEach(function (question, i) { if (answers[i] !== null) { question.types.forEach(function (id) { opportunities[id]++; }); var id = question.types[answers[i]]; scores[id]++; last[id] = i; } });
    var ranked = ids.slice().sort(function (x, y) { return (opportunities[y] ? scores[y] / opportunities[y] : 0) - (opportunities[x] ? scores[x] / opportunities[x] : 0) || scores[y] - scores[x] || last[y] - last[x] || x.localeCompare(y); });
    return { id: ranked[0], scores: scores, opportunities: opportunities };
  }
  // 축마다 문항 수를 고르게 나누고, 축 안에서는 세부 영역(facet)을 고르게 섞습니다.
  function axisQuestions(pool, axes, count, random) {
    random = random || Math.random;
    var base = Math.floor(count / axes.length), extra = count % axes.length, picked = [];
    shuffled(axes, random).forEach(function (axisId, i) {
      var need = base + (i < extra ? 1 : 0), groups = {};
      pool.filter(function (q) { return q.axis === axisId; }).forEach(function (q) { var f = q.facet || '-'; (groups[f] = groups[f] || []).push(q); });
      var facets = shuffled(Object.keys(groups), random), per = Math.floor(need / facets.length), rest = need % facets.length;
      facets.forEach(function (f, j) { picked = picked.concat(shuffled(groups[f], random).slice(0, per + (j < rest ? 1 : 0))); });
    });
    return shuffled(picked, random);
  }
  // 선택지 0쪽을 +1로 셉니다. 동점이면 그 축에서 마지막으로 고른 쪽을 따릅니다.
  function lean(answers, questions, axisId) {
    var first = 0, count = 0, last = 0;
    questions.forEach(function (q, i) { if (q.axis === axisId && answers[i] !== null) { count++; if (answers[i] === 0) { first++; last = 1; } else last = -1; } });
    var sum = first * 2 - count;
    return { count: count, first: first, mean: count ? sum / count : 0, pole: sum > 0 ? 0 : sum < 0 ? 1 : last > 0 ? 0 : last < 0 ? 1 : null };
  }
  definitions.enneagram.selectQuestions = function (random) {
    return balancedPairs(definitions.enneagram.questions, ['E1','E2','E3','E4','E5','E6','E7','E8','E9'], definitions.enneagram.count, random);
  };
  definitions.enneagram.score = function (a, q) {
    var r = ratioScore(['E1','E2','E3','E4','E5','E6','E7','E8','E9'], a, q);
    return { id: r.id, summary: '응답한 비교 횟수에 대한 선택 비율로 살펴본 동기예요. 비슷한 점수의 다른 유형도 전체보기에서 살펴보세요.', scores: r.scores };
  };
  var byId = {};
  window.PharmacoCatalog.profiles.forEach(function (p) { byId[p.id] = p; });
  function build(key, config) {
    config.id = config.id || key;
    var entries = config.mapping
      ? Object.keys(config.mapping).map(function (code) { return [code, byId[config.mapping[code]]]; })
      : window.PharmacoCatalog.profiles.filter(function (p) { return p.test === key; }).map(function (p) { return [p.resultCode, p]; });
    config.results = entries.map(function (e) {
      var code = e[0], p = e[1];
      if (!p) throw new Error('Unknown profile for ' + key + ':' + code);
      return { id: code, name: p.displayName, category: p.category, label: config.labels[code], nick: p.nick, core: p.core, paragraphs: p.paragraphs, pos: p.pos, sheet: p.sheet, columns: p.columns, rows: p.rows, profile: p, info: config.typeInfo ? config.typeInfo[code] : null };
    });
    return config;
  }
  Object.keys(definitions).forEach(function (key) { build(key, definitions[key]); });
  window.PharmacoTestKit = { shuffled: shuffled, balancedPairs: balancedPairs, pickPairQuestions: pickPairQuestions, ratioScore: ratioScore, axisQuestions: axisQuestions, lean: lean, build: build };
  window.PharmacoTests = definitions;
})();

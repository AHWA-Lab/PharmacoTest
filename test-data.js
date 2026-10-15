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
    "lead": "보물을 나누고, 규칙을 마주하고, 동료를 만나는 순간. 당신의 선택은 어느 진영을 향하나요?",
    "note": "질서·중립·혼돈 × 선·중립·악의 9가지 성향을 빌린 창작 게임입니다. 현실의 도덕성을 판단하지 않아요.",
    "questions": [
      {
        "axis": "order",
        "choices": [
          "팀 규칙이 불편해도 먼저 합의한 절차로 바꾼다",
          "상황이 급하면 규칙 밖의 새로운 길부터 찾는다"
        ]
      },
      {
        "axis": "order",
        "choices": [
          "모험을 떠나기 전에 역할과 순서를 정한다",
          "모험은 길에서 만나는 변수에 맞춰 움직인다"
        ]
      },
      {
        "axis": "order",
        "choices": [
          "약속한 방식대로 보물을 나누는 편이다",
          "이번 상황에 맞는 새로운 분배안을 제안한다"
        ]
      },
      {
        "axis": "order",
        "choices": [
          "검증된 길을 따라가며 빈틈을 줄인다",
          "지도에 없는 지름길을 직접 확인해본다"
        ]
      },
      {
        "axis": "order",
        "choices": [
          "믿음은 일관된 행동에서 쌓인다고 느낀다",
          "믿음은 서로의 자유를 인정할 때 자란다고 느낀다"
        ]
      },
      {
        "axis": "order",
        "choices": [
          "내가 정한 원칙을 꾸준히 지키고 싶다",
          "어제의 원칙도 오늘 필요하면 바꿀 수 있다"
        ]
      },
      {
        "axis": "care",
        "choices": [
          "시간이 걸려도 곤란한 여행자를 도와준다",
          "내 여정과 자원을 먼저 지키고 여유가 있으면 돕는다"
        ]
      },
      {
        "axis": "care",
        "choices": [
          "내 몫이 조금 줄어도 동료가 안전하면 좋다",
          "각자가 맡은 위험만큼 자기 몫을 챙기면 좋다"
        ]
      },
      {
        "axis": "care",
        "choices": [
          "누군가 손해 보는 제안이라면 다른 해법을 찾는다",
          "나에게 유리한 제안이라면 먼저 가능성을 살핀다"
        ]
      },
      {
        "axis": "care",
        "choices": [
          "힘이 생기면 주변을 더 안전하게 만들고 싶다",
          "힘이 생기면 내 선택권부터 확실히 넓히고 싶다"
        ]
      },
      {
        "axis": "care",
        "choices": [
          "공을 나눠도 함께한 사람이 인정받으면 기쁘다",
          "기여한 만큼 내 공로가 분명히 드러나면 좋겠다"
        ]
      },
      {
        "axis": "care",
        "choices": [
          "위험한 상황에서는 뒤처진 동료부터 살핀다",
          "위험한 상황에서는 내가 빠져나갈 길부터 확보한다"
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
  // Random simple comparison graph: three types appear four times, six appear three times.
  // Havel–Hakimi preserves this degree sequence; each chosen pair gets a random scenario.
  definitions.enneagram.selectQuestions = function (random) {
    random = random || Math.random;
    function shuffled(items) { var a=items.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(random()*(i+1)),v=a[i];a[i]=a[j];a[j]=v;} return a; }
    var nodes=shuffled([1,2,3,4,5,6,7,8,9]).map(function(n,i){return {id:'E'+n,left:i<3?4:3};}), pairs=[];
    while(nodes.some(function(n){return n.left>0;})) {
      nodes=shuffled(nodes).sort(function(a,b){return b.left-a.left;});
      var first=nodes.shift(), count=first.left;
      for(var i=0;i<count;i++){if(!nodes[i]||nodes[i].left<=0)throw new Error('Invalid comparison balance');pairs.push([first.id,nodes[i].id]);nodes[i].left--;}
    }
    return shuffled(pairs.map(function(pair){var choices=definitions.enneagram.questions.filter(function(q){return q.types.indexOf(pair[0])!==-1&&q.types.indexOf(pair[1])!==-1;});return choices[Math.floor(random()*choices.length)];}));
  };
  definitions.enneagram.score = function (a, q) {
    var scores = {}, last = {}, opportunities = {};
    for (var n = 1; n <= 9; n++) { scores['E' + n] = 0; last['E' + n] = -1; opportunities['E' + n] = 0; }
    q.forEach(function (question, i) { if (a[i] !== null) { question.types.forEach(function(id){opportunities[id]++;}); var id = question.types[a[i]]; scores[id]++; last[id] = i; } });
    var ids = Object.keys(scores).sort(function (x, y) { return (opportunities[y] ? scores[y]/opportunities[y] : 0) - (opportunities[x] ? scores[x]/opportunities[x] : 0) || scores[y] - scores[x] || last[y] - last[x] || x.localeCompare(y); });
    return { id: ids[0], summary: '응답한 비교 횟수에 대한 선택 비율로 살펴본 동기예요. 비슷한 점수의 다른 유형도 전체보기에서 살펴보세요.', scores: scores };
  };
  Object.keys(definitions).forEach(function (key) {
    var config = definitions[key];
    config.results = window.PharmacoCatalog.profiles.filter(function (p) { return p.test === key; }).map(function (p) {
      return { id: p.resultCode, name: p.displayName, category: p.category, label: config.labels[p.resultCode], nick: p.nick, core: p.core, paragraphs: p.paragraphs, pos: p.pos, sheet: p.sheet, columns: p.columns, rows: p.rows, profile: p };
    });
  });
  window.PharmacoTests = definitions;
})();

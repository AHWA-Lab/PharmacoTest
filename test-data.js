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
    "count": 18,
    "columns": 3,
    "lead": "무엇을 하는 사람인지보다, 왜 그쪽으로 마음이 움직이는지. 나를 움직이는 동기를 찾아보세요.",
    "note": "9가지 동기 유형을 참고해 직접 만든 재미용 문항입니다. 공인 심리검사나 진단 결과가 아니에요.",
    "questions": [
      {
        "choices": [
          "일이 제대로 되도록 기준을 꼼꼼히 확인하고 싶다",
          "누군가 나를 믿고 찾아오면 기쁘다"
        ],
        "types": [
          "E1",
          "E2"
        ]
      },
      {
        "choices": [
          "소중한 사람에게 필요한 도움이 되고 싶다",
          "잘하는 일로 인정받으며 성장하고 싶다"
        ],
        "types": [
          "E2",
          "E3"
        ]
      },
      {
        "choices": [
          "목표를 정하고 눈에 보이는 성과를 내고 싶다",
          "다른 사람과 구별되는 나만의 의미를 찾고 싶다"
        ],
        "types": [
          "E3",
          "E4"
        ]
      },
      {
        "choices": [
          "내가 느끼는 감정과 취향을 나답게 표현하고 싶다",
          "혼자 깊이 탐구할 시간과 공간이 필요하다"
        ],
        "types": [
          "E4",
          "E5"
        ]
      },
      {
        "choices": [
          "충분히 이해하고 준비한 뒤 참여하고 싶다",
          "서로 믿고 의지할 수 있는 팀이 있으면 좋겠다"
        ],
        "types": [
          "E5",
          "E6"
        ]
      },
      {
        "choices": [
          "예상할 수 있는 위험을 미리 점검하고 싶다",
          "답답해지면 새로운 계획을 떠올리고 싶다"
        ],
        "types": [
          "E6",
          "E7"
        ]
      },
      {
        "choices": [
          "새로운 경험과 즐거운 가능성을 놓치고 싶지 않다",
          "필요한 순간에는 앞장서서 상황을 바꾸고 싶다"
        ],
        "types": [
          "E7",
          "E8"
        ]
      },
      {
        "choices": [
          "내 선택은 내가 결정하고 싶다",
          "급한 결정보다 평온한 흐름을 유지하고 싶다"
        ],
        "types": [
          "E8",
          "E9"
        ]
      },
      {
        "choices": [
          "서로 다른 입장도 편하게 공존하면 좋겠다",
          "내가 옳다고 믿는 방향으로 조금씩 개선하고 싶다"
        ],
        "types": [
          "E9",
          "E1"
        ]
      },
      {
        "choices": [
          "내가 옳다고 믿는 방향으로 조금씩 개선하고 싶다",
          "평범한 순간에도 특별한 분위기를 발견하고 싶다"
        ],
        "types": [
          "E1",
          "E4"
        ]
      },
      {
        "choices": [
          "누군가 나를 믿고 찾아오면 기쁘다",
          "왜 그런지 원리부터 납득하고 싶다"
        ],
        "types": [
          "E2",
          "E5"
        ]
      },
      {
        "choices": [
          "잘하는 일로 인정받으며 성장하고 싶다",
          "중요한 선택에서는 근거와 대비책이 필요하다"
        ],
        "types": [
          "E3",
          "E6"
        ]
      },
      {
        "choices": [
          "다른 사람과 구별되는 나만의 의미를 찾고 싶다",
          "앞으로 해볼 수 있는 일이 많으면 힘이 난다"
        ],
        "types": [
          "E4",
          "E7"
        ]
      },
      {
        "choices": [
          "혼자 깊이 탐구할 시간과 공간이 필요하다",
          "내 편이 부당한 일을 당하면 확실히 나서고 싶다"
        ],
        "types": [
          "E5",
          "E8"
        ]
      },
      {
        "choices": [
          "서로 믿고 의지할 수 있는 팀이 있으면 좋겠다",
          "상대의 이야기를 듣고 무리 없는 접점을 찾고 싶다"
        ],
        "types": [
          "E6",
          "E9"
        ]
      },
      {
        "choices": [
          "답답해지면 새로운 계획을 떠올리고 싶다",
          "누구도 보지 않아도 내 원칙은 지키고 싶다"
        ],
        "types": [
          "E7",
          "E1"
        ]
      },
      {
        "choices": [
          "필요한 순간에는 앞장서서 상황을 바꾸고 싶다",
          "가까운 사람의 작은 변화를 먼저 알아채고 싶다"
        ],
        "types": [
          "E8",
          "E2"
        ]
      },
      {
        "choices": [
          "급한 결정보다 평온한 흐름을 유지하고 싶다",
          "시간을 효율적으로 써서 다음 단계에 도달하고 싶다"
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
  definitions.enneagram.score = function (a, q) {
    var scores = {}, last = {};
    for (var n = 1; n <= 9; n++) { scores['E' + n] = 0; last['E' + n] = -1; }
    q.forEach(function (question, i) { if (a[i] !== null) { var id = question.types[a[i]]; scores[id]++; last[id] = i; } });
    var ids = Object.keys(scores).sort(function (x, y) { return scores[y] - scores[x] || last[y] - last[x] || x.localeCompare(y); });
    return { id: ids[0], summary: '선택에서 가장 자주 드러난 동기예요. 비슷한 점수의 다른 유형도 전체보기에서 살펴보세요.', scores: scores };
  };
  Object.keys(definitions).forEach(function (key) {
    var config = definitions[key];
    config.results = window.PharmacoCatalog.profiles.filter(function (p) { return p.test === key; }).map(function (p) {
      return { id: p.resultCode, name: p.displayName, category: p.category, label: config.labels[p.resultCode], nick: p.nick, core: p.core, paragraphs: p.paragraphs, pos: p.pos, sheet: p.sheet, columns: p.columns, rows: p.rows, profile: p };
    });
  });
  window.PharmacoTests = definitions;
})();

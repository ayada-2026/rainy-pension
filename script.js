const initialState = () => ({
  currentSceneId: "arrival",
  clues: [],
  flags: {},
});

const CLUES = {
  wetUmbrella: {
    title: "젖은 우산",
    text: "현관 우산꽂이에 있는 검은 우산 하나만 손잡이까지 빗물에 젖어 있었다. 누군가 방금 밖에 다녀온 흔적이다.",
  },
  tornMemo: {
    title: "찢긴 메모",
    text: "프런트 데스크 아래에서 '11:30, 뒤편 온실'이라고 적힌 메모 조각을 찾았다.",
  },
  coldTea: {
    title: "식어버린 차",
    text: "실종된 소설가 한서윤의 방 탁자 위 차는 거의 식지 않은 상태였다. 사라진 시점이 오래되지 않았다는 뜻이다.",
  },
  muddyBoots: {
    title: "진흙 묻은 장화",
    text: "창고 앞 장화 밑창에 붉은 흙이 묻어 있었다. 펜션 뒤편 비탈에서만 보이는 흙색이다.",
  },
  phoneRecord: {
    title: "짧은 통화 기록",
    text: "휴대전화 통화 목록에는 밤 11시 14분, 단 8초짜리 발신 기록이 남아 있었다.",
  },
  greenhouseLight: {
    title: "온실의 흔적",
    text: "비에 젖은 온실 문고리와 바닥의 긁힌 자국. 누군가 서둘러 무언가를 옮긴 듯하다.",
  },
  locket: {
    title: "은색 로켓 목걸이",
    text: "온실 화분 옆에서 오래된 가족 사진이 들어 있는 로켓 목걸이를 발견했다. 소유자는 펜션 주인 윤지애였다.",
  },
  confessionHint: {
    title: "숨긴 대화",
    text: "관리인 박도윤은 서윤이 '투자 사기 기사'를 쓰고 있었다는 사실을 숨기고 있었다.",
  },
  mountainPath: {
    title: "산책로 표식",
    text: "온실 뒤 비상문으로 이어지는 좁은 산책로에 손전등으로 남긴 하얀 분필 표식이 보였다.",
  },
};

// 장면 데이터는 이 객체에 모아두었습니다.
// 새 장면을 추가할 때는 아래 형식을 복사해서 id, title, text, choices만 채우면 됩니다.
// text는 문단 배열이며, choices는 버튼 목록입니다.
const scenes = {
  arrival: {
    title: "도착",
    tag: "Scene 1",
    text: [
      "산길을 휘감는 비가 와이퍼를 둔탁하게 두드린다. 당신은 지방 취재를 마치고 서울로 돌아가던 중, 산중 펜션 '호은재'에서 도로 통제가 풀리길 기다리게 된다.",
      "자정이 가까워질 무렵, 펜션 안은 조용하지만 어딘가 어수선하다. 로비 시계 초침 소리만 또렷하다. 그때 주인 윤지애가 창백한 얼굴로 당신에게 다가온다.",
      "\"죄송하지만, 혹시 사람 찾는 걸 좀 도와주실 수 있나요? 투숙객 한서윤 씨가 방에서 사라졌어요.\"",
    ],
    choices: [
      {
        label: "로비부터 둘러본다",
        next: "lobby",
        effect: { setFlag: "startedInvestigation" },
      },
      {
        label: "실종자의 방으로 간다",
        next: "room",
        effect: { addClue: "coldTea" },
      },
    ],
  },
  lobby: {
    title: "로비 조사",
    tag: "Scene 2",
    text: [
      "벽난로 불은 약하지만 아직 꺼지지 않았다. 현관 쪽 바닥에는 물방울이 길게 이어져 있고, 프런트 데스크 서랍은 덜 닫힌 채 삐뚤어져 있다.",
      "주인 윤지애는 침착하려 애쓰지만 손끝이 떨린다. 관리인 박도윤은 로비 창문 밖만 바라보며 입을 다문다.",
    ],
    choices: [
      {
        label: "우산꽂이를 살핀다",
        next: "umbrella",
        effect: { addClue: "wetUmbrella" },
      },
      {
        label: "프런트 데스크를 조사한다",
        next: "desk",
        effect: { addClue: "tornMemo" },
      },
      {
        label: "윤지애와 대화한다",
        next: "ownerTalk",
      },
    ],
  },
  room: {
    title: "한서윤의 객실",
    tag: "Scene 3",
    text: [
      "방 안은 지나치게 단정하다. 침대 위 열린 공책에는 두 줄만 적혀 있다. '비는 기억을 지워주지 않는다. 누군가는 오늘 반드시 입을 연다.'",
      "창문은 잠겨 있지만 커튼 끝이 젖어 있고, 탁자 위 찻잔에서는 아직 희미한 온기가 남아 있다.",
    ],
    choices: [
      {
        label: "휴대전화를 확인한다",
        next: "phone",
        effect: { addClue: "phoneRecord" },
      },
      {
        label: "복도로 나가 관리인을 찾는다",
        next: "caretakerTalk",
      },
      {
        label: "다시 로비로 돌아간다",
        next: "lobby",
      },
    ],
  },
  umbrella: {
    title: "젖은 우산",
    tag: "Scene 4",
    text: [
      "여러 개의 우산 중 하나만 유난히 젖어 있다. 빗줄기는 몇 시간째 이어졌지만, 이 우산은 막 접은 듯 손잡이까지 차갑다.",
      "손잡이 안쪽에는 희미한 흙먼지가 묻어 있다. 실내 바닥의 물자국과 연결되는 듯 보인다.",
    ],
    choices: [
      {
        label: "물자국을 따라 창고 쪽으로 간다",
        next: "storage",
      },
      {
        label: "로비로 돌아간다",
        next: "lobby",
      },
    ],
  },
  desk: {
    title: "프런트 데스크",
    tag: "Scene 5",
    text: [
      "서랍 틈에 끼어 있던 메모 조각을 꺼내자 잉크가 번진 글씨가 드러난다. '11:30, 뒤편 온실.'",
      "그 아래에는 체크인 명부가 놓여 있는데, 한서윤의 서명 옆에 작은 별표가 하나 더해져 있다. 누가 그려 넣은 것인지는 알 수 없다.",
    ],
    choices: [
      {
        label: "온실로 향한다",
        next: "greenhouse",
      },
      {
        label: "윤지애에게 메모를 보여준다",
        next: "ownerTalk",
      },
    ],
  },
  ownerTalk: {
    title: "주인 윤지애",
    tag: "Scene 6",
    text: [
      "윤지애는 한서윤이 이틀 전부터 머물렀고, 조용히 원고 작업만 했다고 말한다. 하지만 온실 이야기가 나오자 잠시 시선을 피한다.",
      "\"그곳은 오래 비워 둔 곳이에요. 밤에 갈 이유는 없었을 텐데...\"",
      "그녀의 목덜미에는 목걸이를 벗은 듯한 희미한 자국이 보인다.",
    ],
    choices: [
      {
        label: "목걸이 자국에 대해 묻는다",
        next: "ownerNecklace",
      },
      {
        label: "관리인 박도윤을 찾아간다",
        next: "caretakerTalk",
      },
      {
        label: "온실로 간다",
        next: "greenhouse",
      },
    ],
  },
  ownerNecklace: {
    title: "지워진 장식",
    tag: "Scene 7",
    text: [
      "윤지애는 잠시 망설이다 가족에게서 물려받은 로켓 목걸이를 잃어버렸다고 털어놓는다. 그런데 어째서 지금까지 말하지 않았는지에 대해선 입을 다문다.",
      "\"그 목걸이는 별 의미 없어요. 그냥... 오늘은 일이 많았을 뿐이에요.\"",
      "사소한 물건을 굳이 감추는 태도가 이상하다.",
    ],
    choices: [
      {
        label: "온실에서 목걸이를 찾아본다",
        next: "greenhouse",
      },
      {
        label: "서윤의 방으로 돌아간다",
        next: "room",
      },
    ],
  },
  caretakerTalk: {
    title: "관리인 박도윤",
    tag: "Scene 8",
    text: [
      "박도윤은 처음에는 '아는 게 없다'고 잘라 말한다. 그러나 한서윤의 공책 문장을 전하자 표정이 굳는다.",
      "\"그 사람, 원고만 쓴 게 아닙니다. 예전 투자 건을 캐고 있었어요. 누군가를 찾아내겠다고 했죠.\"",
      "그는 더 말하려다 입을 다물지만, 이미 중요한 사실 하나를 숨기고 있었다는 건 분명하다.",
    ],
    choices: [
      {
        label: "숨긴 사실을 더 추궁한다",
        next: "storage",
        effect: { addClue: "confessionHint" },
      },
      {
        label: "온실로 먼저 가본다",
        next: "greenhouse",
      },
      {
        label: "로비로 돌아간다",
        next: "lobby",
      },
    ],
  },
  phone: {
    title: "짧은 발신 기록",
    tag: "Scene 9",
    text: [
      "한서윤의 휴대전화는 침대 아래 떨어져 있다. 마지막 발신 기록은 밤 11시 14분, 단 8초.",
      "번호는 저장되지 않았지만 펜션 내선표의 관리인 방 번호와 마지막 네 자리가 일치한다.",
      "전화를 건 뒤 바로 밖으로 나갔다면, 누군가를 만나러 간 셈이다.",
    ],
    choices: [
      {
        label: "박도윤을 다시 찾아간다",
        next: "caretakerTalk",
      },
      {
        label: "메모 속 온실을 확인하러 간다",
        next: "greenhouse",
      },
    ],
  },
  storage: {
    title: "창고 앞",
    tag: "Scene 10",
    text: [
      "창고 문은 반쯤 열린 채로 삐걱거린다. 안쪽에는 제설용 삽과 장화가 가지런히 놓여 있지만, 한 켤레만 진흙투성이이다.",
      "바닥에는 젖은 우산 끝이 긁고 지나간 선이 남아 있고, 선은 뒤편 온실 방향으로 이어진다.",
    ],
    choices: [
      {
        label: "진흙 묻은 장화를 확인한다",
        next: "boots",
        effect: { addClue: "muddyBoots" },
      },
      {
        label: "온실로 향한다",
        next: "greenhouse",
      },
    ],
  },
  boots: {
    title: "붉은 흙",
    tag: "Scene 11",
    text: [
      "장화 밑창의 붉은 흙을 손전등으로 비추자, 낮에 지나온 펜션 뒤편 비탈의 흙과 같은 색이다. 정문 쪽 흙은 이런 색이 아니다.",
      "누군가 뒷길을 이용해 움직였다. 폭우 속에서도 굳이 그 길을 택한 이유가 있었던 셈이다.",
    ],
    choices: [
      {
        label: "온실로 이동한다",
        next: "greenhouse",
      },
      {
        label: "윤지애에게 이 사실을 전한다",
        next: "ownerTalk",
      },
    ],
  },
  greenhouse: {
    title: "뒤편 온실",
    tag: "Scene 12",
    text: [
      "비닐 지붕 위로 떨어지는 빗방울 소리가 방 안보다 훨씬 선명하다. 온실 문고리는 젖어 있고, 안쪽 흙바닥에는 무언가 끌린 자국이 희미하게 남아 있다.",
      "화분 사이를 비추자 은색 물체가 번뜩인다. 그리고 뒤편 비상문은 살짝 열린 채 빗바람을 들여보내고 있다.",
    ],
    choices: [
      {
        label: "은색 물체를 확인한다",
        next: "locket",
        effect: { addClue: "greenhouseLight" },
      },
      {
        label: "비상문 밖 산책로를 조사한다",
        next: "path",
      },
      {
        label: "모든 단서를 정리해 추리를 시도한다",
        next: "deductionGate",
      },
    ],
  },
  locket: {
    title: "로켓 목걸이",
    tag: "Scene 13",
    text: [
      "흙에 반쯤 묻혀 있던 것은 윤지애가 숨기려 했던 로켓 목걸이다. 안쪽에는 어린 윤지애와 또 다른 소녀가 웃고 있는 사진이 있다.",
      "한서윤은 오래전 지역 투자 사기 사건의 피해자 유가족을 추적 중이었다. 사진 속 다른 소녀의 얼굴이, 한서윤과 닮아 있다.",
    ],
    choices: [
      {
        label: "산책로로 나간다",
        next: "path",
        effect: { addClue: "locket" },
      },
      {
        label: "윤지애를 다시 추궁한다",
        next: "deductionGate",
        effect: { addClue: "locket" },
      },
    ],
  },
  path: {
    title: "뒤편 산책로",
    tag: "Scene 14",
    text: [
      "빗속 손전등 불빛이 좁은 산책로를 훑는다. 펜션 뒤 사면으로 이어지는 길목 돌담에는 급히 그린 듯한 하얀 분필 표식이 남아 있다.",
      "표식은 누군가 길을 잃지 않기 위해 남긴 것처럼 보인다. 그 끝에는 작은 비상 대피소가 있다.",
    ],
    choices: [
      {
        label: "대피소로 향한다",
        next: "shelter",
        effect: { addClue: "mountainPath" },
      },
      {
        label: "로비로 돌아가 모두를 모은다",
        next: "deductionGate",
        effect: { addClue: "mountainPath" },
      },
    ],
  },
  shelter: {
    title: "산책로 끝 대피소",
    tag: "Scene 15",
    text: [
      "작은 대피소 안에는 한서윤이 젖은 담요를 두른 채 앉아 있다. 다친 곳은 없지만 표정은 복잡하다.",
      "\"누가 저를 해친 건 아니에요. 하지만 누군가가 진실을 덮으려 했죠. 제가 먼저 숨어서 그 반응을 보고 싶었어요.\"",
      "이제 당신은 누구에게 어떤 결론을 내릴지 선택해야 한다.",
    ],
    choices: [
      {
        label: "윤지애가 실종을 꾸민 공범이라고 몰아붙인다",
        next: "endingFalseAccusation",
      },
      {
        label: "박도윤이 사건을 숨기려 했다고 지적하고 모두를 로비로 부른다",
        next: "endingPartialTruth",
        requires: ["confessionHint", "phoneRecord"],
        fallback: "단서가 아직 부족하다. 왜 서윤이 박도윤을 만나려 했는지 더 확인해야 한다.",
      },
      {
        label: "서윤의 잠적은 진실을 끌어내기 위한 선택이었고, 윤지애와 박도윤 모두 과거 사건을 숨겨 왔다고 밝힌다",
        next: "endingTruth",
        requires: ["locket", "mountainPath", "tornMemo", "confessionHint"],
        fallback: "핵심 연결고리가 아직 빠져 있다. 온실과 대피소로 이어지는 이유를 더 모아야 한다.",
      },
    ],
  },
  deductionGate: {
    title: "정리의 시간",
    tag: "Scene 16",
    text: [
      "빗소리를 들으며 지금까지의 조각들을 맞춰 본다. 우산, 메모, 온실, 전화 기록, 그리고 감추어진 과거.",
      "성급하게 결론을 내리면 누군가를 잘못 몰 수 있다. 하지만 단서를 충분히 모았다면, 이제 사건의 윤곽이 보일지도 모른다.",
    ],
    choices: [
      {
        label: "아직 부족하다. 대피소까지 확인한다",
        next: "path",
      },
      {
        label: "모인 사람들 앞에서 추리를 시작한다",
        next: "shelter",
      },
    ],
  },
  endingFalseAccusation: {
    title: "엔딩 1 - 너무 빠른 단정",
    tag: "Ending",
    text: [
      "당신은 윤지애가 실종극을 꾸민 장본인이라고 단정한다. 하지만 한서윤은 고개를 젓는다. 윤지애는 진실을 숨기긴 했어도, 오늘 밤 그녀를 해치거나 유인하지는 않았다.",
      "윤지애가 숨긴 것은 자신의 가족이 과거 투자 사기 사건에 연루되었다는 사실이었다. 당신의 성급한 추리는 펜션 안의 불신만 키우고, 한서윤 역시 인터뷰를 거부한 채 떠난다.",
      "비는 새벽까지 내리고, 사건은 반쯤만 드러난 채 남는다.",
    ],
    endingLabel: "배드 엔딩",
    choices: [
      {
        label: "처음부터 다시 추리한다",
        next: "arrival",
        effect: { reset: true },
      },
    ],
  },
  endingPartialTruth: {
    title: "엔딩 2 - 절반의 진실",
    tag: "Ending",
    text: [
      "당신은 박도윤이 한서윤의 취재를 알고 있었고, 그녀를 말리려 했다는 점을 밝혀낸다. 그는 결국 과거 투자 사기 사건의 관련자를 보호하려 했다고 인정한다.",
      "다만 한서윤의 잠적은 폭로를 극적으로 만들기 위한 그녀 자신의 선택이었다. 윤지애 역시 과거를 덮기 위해 침묵했지만, 직접적인 가담자는 아니었다.",
      "사건의 큰 줄기는 풀렸지만, 왜 모두가 그토록 오래 침묵했는지에 대한 씁쓸함은 남는다.",
    ],
    endingLabel: "노멀 엔딩",
    choices: [
      {
        label: "다른 결말을 보러 다시 시작한다",
        next: "arrival",
        effect: { reset: true },
      },
    ],
  },
  endingTruth: {
    title: "엔딩 3 - 빗속의 증언",
    tag: "Ending",
    text: [
      "당신은 온실의 메모, 잃어버린 로켓 목걸이, 짧은 통화, 그리고 산책로의 표식을 한 줄로 엮어낸다. 한서윤은 윤지애의 가족과 자신의 가족이 같은 사건의 피해자였음을 밝히고, 윤지애는 더는 숨기지 않겠다고 말한다.",
      "박도윤은 예전 투자 모집을 도왔던 사람의 친척으로서 사건을 덮으려 했지만, 오늘 밤 결국 실패했다. 한서윤의 잠적은 누가 먼저 진실을 감추려 드는지 확인하려는 마지막 시험이었다.",
      "새벽 무렵 비가 잦아들자, 세 사람은 로비 창가에 선 채 오래된 사건을 공식적으로 증언하기로 한다. 당신은 젖은 공책 첫 장에 이렇게 적는다. '비 오는 밤에도, 진실은 결국 모습을 드러낸다.'",
    ],
    endingLabel: "트루 엔딩",
    choices: [
      {
        label: "처음부터 다시 플레이한다",
        next: "arrival",
        effect: { reset: true },
      },
    ],
  },
};

const state = initialState();

const sceneTitle = document.getElementById("scene-title");
const sceneTag = document.getElementById("scene-tag");
const storyText = document.getElementById("story-text");
const choicesContainer = document.getElementById("choices");
const clueList = document.getElementById("clue-list");
const clueCount = document.getElementById("clue-count");
const cluePanel = document.getElementById("clue-panel");
const toggleCluesButton = document.getElementById("toggle-clues");
const restartButton = document.getElementById("restart-button");

function resetState() {
  const fresh = initialState();
  state.currentSceneId = fresh.currentSceneId;
  state.clues = fresh.clues;
  state.flags = fresh.flags;
}

function addClue(clueId) {
  if (!clueId || state.clues.includes(clueId)) {
    return;
  }

  state.clues.push(clueId);
}

function setFlag(flagName) {
  if (flagName) {
    state.flags[flagName] = true;
  }
}

function hasRequiredClues(required = []) {
  return required.every((clueId) => state.clues.includes(clueId));
}

function applyEffect(effect = {}) {
  if (effect.reset) {
    resetState();
    return;
  }

  addClue(effect.addClue);
  setFlag(effect.setFlag);
}

function goToScene(sceneId, effect) {
  applyEffect(effect);
  state.currentSceneId = sceneId;
  render();
}

function renderStory(scene) {
  sceneTitle.textContent = scene.title;
  sceneTag.textContent = scene.tag || "Scene";

  storyText.innerHTML = "";
  scene.text.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    storyText.appendChild(p);
  });

  if (scene.endingLabel) {
    const note = document.createElement("div");
    note.className = "ending-note";
    note.textContent = scene.endingLabel;
    storyText.appendChild(note);
  }
}

function renderChoices(scene) {
  choicesContainer.innerHTML = "";

  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice.label;

    if (choice.requires && !hasRequiredClues(choice.requires)) {
      button.classList.add("locked");

      const meta = document.createElement("span");
      meta.className = "choice-meta";
      meta.textContent = choice.fallback || "아직 필요한 단서가 부족하다.";
      button.appendChild(meta);
    }

    button.addEventListener("click", () => {
      if (choice.requires && !hasRequiredClues(choice.requires)) {
        return;
      }

      goToScene(choice.next, choice.effect);
    });

    choicesContainer.appendChild(button);
  });
}

function renderClues() {
  clueList.innerHTML = "";
  clueCount.textContent = `${state.clues.length}개`;

  if (state.clues.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-clue";
    empty.textContent = "아직 확보한 단서가 없습니다. 로비, 객실, 온실을 차례로 조사해 보세요.";
    clueList.appendChild(empty);
    return;
  }

  state.clues.forEach((clueId) => {
    const clue = CLUES[clueId];
    if (!clue) {
      return;
    }

    const item = document.createElement("li");
    item.className = "clue-item";
    item.innerHTML = `<strong>${clue.title}</strong><span>${clue.text}</span>`;
    clueList.appendChild(item);
  });
}

function render() {
  const scene = scenes[state.currentSceneId];
  renderStory(scene);
  renderChoices(scene);
  renderClues();
}

toggleCluesButton.addEventListener("click", () => {
  cluePanel.classList.toggle("open");
});

restartButton.addEventListener("click", () => {
  resetState();
  render();
});

render();

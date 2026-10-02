---
name: AGORA Design System
version: 0.1.0
updated: 2026-10-02
colors:
  # Canvas & Surface
  canvas: '#F0F4F8'
  surface: '#FFFFFF'
  surface-subtle: '#F7F8FA'
  surface-muted: '#ECEDF0'
  line: '#E6E9EE'
  line-strong: '#D5DAE1'
  # Ink (text on light)
  ink-strong: '#111418'
  ink: '#2B3036'
  ink-sub: '#5C6370'
  ink-muted: '#8A919C'
  ink-disabled: '#B8BEC7'
  # Stage (dark hero / media)
  stage: '#0C1014'
  stage-raised: '#1A1F26'
  on-stage: '#FFFFFF'
  on-stage-sub: '#C9CED6'
  # Accent (single brand action color)
  accent: '#FC4C28'
  accent-hover: '#E63E1C'
  accent-pressed: '#C9341A'
  accent-soft: '#FFF1EC'
  accent-on-stage: '#EB653D'
  on-accent: '#FFFFFF'
  # Editorial
  editorial: '#001058'
  # Category (tag chips: bg / text pairs)
  cat-webinar-bg: '#FFF1EC'
  cat-webinar-fg: '#C2381A'
  cat-vod-bg: '#EEEFFC'
  cat-vod-fg: '#3B3FB8'
  cat-briefing-bg: '#FCEDD6'
  cat-briefing-fg: '#8A5A1E'
  cat-product-bg: '#E8F4EE'
  cat-product-fg: '#1F7A4D'
  cat-event-bg: '#F5ECF6'
  cat-event-fg: '#86368B'
  cat-news-bg: '#E8ECF5'
  cat-news-fg: '#001058'
  # Status
  live: '#FC4C28'
  success: '#1F7A4D'
  warning: '#B26A00'
  error: '#D92D20'
typography:
  display-hero:
    fontFamily: Pretendard
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Pretendard
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-section:
    fontFamily: Pretendard
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Pretendard
    fontSize: 17px
    fontWeight: '700'
    lineHeight: 25px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Pretendard
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Pretendard
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  meta:
    fontFamily: Pretendard
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  caption:
    fontFamily: Pretendard
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  badge:
    fontFamily: Pretendard
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  unit: 4px
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 20px
  space-6: 24px
  space-8: 32px
  space-10: 40px
  gutter: 24px
  section-gap: 16px
  card-padding: 20px
---

# AGORA Design System

> 안국약품 HCP 디지털 플랫폼 **AGORA**의 디자인 기준 문서.
> 화면 시안(Stitch / Figma), 프론트엔드 구현, 외주 업체 전달에 공통으로 쓴다.

## 0. 문서 사용 규칙

**근거 표기.** 모든 규칙 옆에 출처를 단다. 출처 없는 규칙은 넣지 않는다.

| 표기 | 출처 |
|---|---|
| `[시안]` | 메인 대시보드 참고 시안 — `design/reference/main-dashboard-ref.webp` (색상값은 픽셀 샘플링 실측) |
| `[회의록]` | 노션 AGORA › 02-3. 회의록 › 2026.09.23 피드백 v3 |
| `[개요]` | 노션 AGORA › 01-1. 프로젝트 개요 |
| `[디지털MR]` | 노션 AGORA › 01-4. 디지털 MR |
| `[제안]` | 근거 문서에 값이 없어 이 문서가 새로 정한 항목. 리뷰 후 확정 필요 |

**상태 표기.** 노션 문서 규칙과 동일하게 섹션마다 `확정 / 방향만 / 미정 / 업체 제안 요청` 중 하나를 붙인다. v0.1.0 시점에서는 모든 섹션이 `방향만`이다. 시안 리뷰 후 섹션 단위로 `확정` 처리한다.

**토큰 우선.** 화면과 코드에서는 HEX를 직접 쓰지 않고 front matter의 토큰 이름을 쓴다. 값이 바뀌면 이 문서의 front matter만 고친다.

---

## 1. Brand & Tone — `방향만`

### 컨셉 `[개요]`
- **AGORA = AG(안국) + Agora(광장).** 슬로건: *지식이 모이고, 새로운 가치가 시작되는 곳*
- 키워드 3개: **모이는 광장 / 연결과 소통 / 성장과 미래**
- 포지셔닝: *넓은 종합포털이 아니라 강한 전담 디지털 MR. 찾지 않아도 알아서 보여주고 추천하는 플랫폼.*
- 타겟: HMP(의료진), CMR, MR

### 화면 톤
| 원칙 | 의미 | 근거 |
|---|---|---|
| **학술 권위** | 학회·심포지엄 수준의 신뢰감. 연자·소속·일시를 정확하게 보여준다 | `[시안]` 연자 카드, 일시 표기 |
| **프리미엄** | 하늘색·쨍한 톤 배제. 다크 스테이지 + 뉴트럴 캔버스 + 단일 액센트 | `[회의록]` |
| **응대받는 감각** | 접속 순간부터 "안국이 나를 응대한다"는 인상. 개인화 인사·추천을 화면 최상단에 | `[디지털MR]` |
| **전문적 절제** | 캐릭터·모션·문구 모두 장난스럽지 않게 | `[디지털MR]` "장난스럽지 않은 전문적 톤 유지" |

### 하지 않는 것
- 하늘색(sky/cyan) 계열을 면적 컬러로 쓰지 않는다 `[회의록]`
- 그라디언트 배경, 네온, 글로우 효과를 UI 크롬(버튼·카드·탭)에 쓰지 않는다. 그라디언트는 사진·일러스트 이미지 안에서만 허용 `[제안]`
- 이모지, 말풍선형 일러스트, 캐주얼 마스코트 톤 `[디지털MR]`

---

## 2. Color — `방향만`

### 2-1. 구조
화면은 **세 개의 층**으로 나뉜다.

```
┌───────────── canvas  #F0F4F8 ─────────────┐
│ ┌── stage #0C1014 ──┐ ┌─ surface #FFF ──┐ │
│ │  다크 히어로       │ │  섹션 카드       │ │
│ │  (심포지엄·미디어) │ │  (리스트·그리드) │ │
│ └───────────────────┘ └─────────────────┘ │
└───────────────────────────────────────────┘
```

| 층 | 토큰 | 값 | 용도 | 근거 |
|---|---|---|---|---|
| 캔버스 | `canvas` | `#F0F4F8` | 페이지 배경 | `[시안]` 실측 |
| 서피스 | `surface` | `#FFFFFF` | 섹션 카드 | `[시안]` |
| 서피스 서브 | `surface-subtle` | `#F7F8FA` | 카드 안 리스트 행, 호버 | `[시안]` 웨비나 행 실측 `#F8F8F8` |
| 서피스 뮤트 | `surface-muted` | `#ECEDF0` | 보조 버튼, 비활성 배지 | `[시안]` "사전 예약하기" 회색 버튼 실측 |
| 스테이지 | `stage` | `#0C1014` | 히어로, 미디어 썸네일 오버레이 | `[시안]` 히어로 배경 실측 |
| 스테이지 레이즈드 | `stage-raised` | `#1A1F26` | 스테이지 위 카드, 페이저 | `[제안]` |

### 2-2. 액센트 (단일)
| 토큰 | 값 | 용도 | 근거 |
|---|---|---|---|
| `accent` | `#FC4C28` | 주요 CTA(바로 입장하기, 사전 예약하기 1순위), LIVE | `[시안]` 실측 |
| `accent-hover` | `#E63E1C` | 호버 | `[제안]` |
| `accent-pressed` | `#C9341A` | 눌림 | `[제안]` |
| `accent-soft` | `#FFF1EC` | D-1 배지 배경, 액센트 틴트 | `[제안]` |
| `accent-on-stage` | `#EB653D` | 다크 히어로 위 제목 강조어 ("혈압변동성 케어") | `[시안]` 실측 |

**액센트 사용 규칙** `[제안]` — 회의록 "쨍한 톤 제외"와의 충돌을 막기 위한 장치
1. 한 섹션 카드 안에서 `accent` 채움 버튼은 **최대 1개**. 나머지는 `surface-muted` 보조 버튼.
   - 시안 근거: 웨비나 리스트에서 D-1 행만 주황, D-2·D-3은 회색.
2. `accent`를 **면 배경**(섹션 배경, 배너 전체 배경)으로 쓰지 않는다. 버튼·배지·텍스트 강조에만.
3. 히어로 제목 강조는 한 문장당 **한 구절**만.

### 2-3. 텍스트
| 토큰 | 값 | 용도 |
|---|---|---|
| `ink-strong` | `#111418` | 섹션 제목, 카드 제목 |
| `ink` | `#2B3036` | 본문 |
| `ink-sub` | `#5C6370` | 연자·소속, 보조 정보 |
| `ink-muted` | `#8A919C` | 날짜, 출처, 플레이스홀더 |
| `ink-disabled` | `#B8BEC7` | 비활성 |
| `on-stage` | `#FFFFFF` | 다크 위 제목 |
| `on-stage-sub` | `#C9CED6` | 다크 위 연자·소속·일시 |

텍스트 값은 시안 해상도(775px 축소본)에서 정확 실측이 불가해 `[제안]` 값이다. 대비 실측값은 9장 참고. `ink-muted`는 흰 배경 대비 3.18:1로 AA(4.5:1) 미달이므로 **날짜·출처 등 보조 캡션 전용**, 본문·제목·버튼 금지.

### 2-4. 카테고리 컬러 `[회의록]` + `[제안]`
회의록: *"카테고리별 색상·배경·아이콘 등의 대비를 강화하여 정보 구분성 강화. 전체 프리미엄 톤 유지."*

시안의 아고라 브리핑 태그(내과·신장·심혈관질환)는 **세 개 모두 같은 베이지**(`#FCEDD6` 실측)다. 회의록 요구와 맞지 않으므로 콘텐츠 유형별로 분리한다. 진료과 태그(내과·신장 등)는 유형이 아니므로 2-5 규칙을 따른다.

| 카테고리 | 배경 | 텍스트 | 근거 |
|---|---|---|---|
| 웨비나 | `cat-webinar-bg` `#FFF1EC` | `cat-webinar-fg` `#C2381A` | 액센트 계열 |
| VOD | `cat-vod-bg` `#EEEFFC` | `cat-vod-fg` `#3B3FB8` | 시안 VOD 썸네일 퍼플 계열 |
| 아고라 브리핑 | `cat-briefing-bg` `#FCEDD6` | `cat-briefing-fg` `#8A5A1E` | 시안 태그 베이지 실측 유지 |
| 제품(브랜드관) | `cat-product-bg` `#E8F4EE` | `cat-product-fg` `#1F7A4D` | `[제안]` |
| 이벤트·포인트 | `cat-event-bg` `#F5ECF6` | `cat-event-fg` `#86368B` | `[제안]` |
| 뉴스·기획특집 | `cat-news-bg` `#E8ECF5` | `cat-news-fg` `#001058` | 시안 "기획특집" 배지 네이비 실측 |

- 모든 카테고리 컬러는 **저채도 틴트 배경 + 진한 텍스트** 조합. 채움 원색 칩 금지.
- 아이콘을 함께 쓸 때 아이콘 색 = 텍스트 색.

### 2-5. 진료과 태그 `[제안]`
진료과(내과, 신장, 심혈관질환 …)는 수가 많아 색으로 구분하지 않는다. `surface-muted` 배경 + `ink-sub` 텍스트의 뉴트럴 칩 하나로 통일. 구분은 텍스트로 한다.

### 2-6. 추천 웨비나 카드 톤 `[회의록]`
*"이번주 추천 웨비나 콘텐츠의 카드 톤을 하나의 색 계열로 수정 (ex: 블루 → 블루그레이 → 딥블루)"*

- 웨비나 리스트·카드는 **뉴트럴 한 계열**(`surface` → `surface-subtle` → `surface-muted`)로만 단계를 준다. 시안이 이미 이 방식이다.
- D-day 강조는 색 면적이 아니라 **D-1 배지 + 1순위 버튼 1개**로만 한다.

---

## 3. Typography — `방향만`

### 3-1. 서체
- **Pretendard** (국문·영문·숫자 통합). 웹폰트 미로드 시 `-apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`.
- 숫자(일시, 러닝타임, 포인트, D-day)는 `font-variant-numeric: tabular-nums` 고정.
- Stitch에는 Pretendard 옵션이 없다. Stitch 등록 시에는 `NOTO_SANS`로 대체하고, 구현은 Pretendard로 한다.

### 3-2. 스케일 (데스크톱 1440 기준)
| 토큰 | 크기 / 행간 / 굵기 | 용도 | 시안 대응 |
|---|---|---|---|
| `display-hero` | 40 / 52 / 700, -0.02em | 히어로 제목 | "고혈압 치료에서 혈압변동성 케어의 중요성" |
| `headline-lg` | 28 / 38 / 700 | 페이지 제목, 웰컴 인사 | — |
| `headline-section` | 18 / 26 / 700 | 섹션 카드 제목 | "이번주 추천 웨비나", "오늘의 VOD" |
| `title-lg` | 17 / 25 / 700 | 대표 카드 제목 | 브리핑 카드, 기획특집 |
| `title-md` | 15 / 22 / 600 | 리스트 행 제목 | 웨비나 강의명, 뉴스 제목 |
| `body-md` | 14 / 22 / 400 | 본문 | — |
| `meta` | 13 / 18 / 400 | 연자·소속, 일시 | "김지은 교수 \| 서울대학교병원 순환기내과" |
| `caption` | 12 / 16 / 500 | 날짜, 출처, 전체보기 | "2026.02.03" |
| `badge` | 11 / 14 / 600 | 배지, 칩 | "D-1", "WEB SYMPOSIUM", "내과" |

### 3-3. 규칙
- 제목은 최대 **2줄**, 넘치면 말줄임. 의학 강의명이 길기 때문에 3줄 이상 허용 시 카드 높이가 깨진다 `[시안]`
- 메타 구분자는 ` | ` (앞뒤 공백, `line-strong` 색 세로 바) `[시안]`
- 일시 포맷: `YYYY-MM-DD (요일) HH:MM` — 리스트 / `M.DD (요일) HH:MM–HH:MM` — 히어로 `[시안]`
- 히어로 제목 강조어만 `accent-on-stage` 컬러 + 동일 굵기. 밑줄·배경 하이라이트 금지 `[시안]`

---

## 4. Layout — `방향만`

### 4-1. 브레이크포인트
| 구간 | 폭 | 컬럼 | 마진 / 거터 |
|---|---|---|---|
| Wide | ≥ 1920 | 12 | 48 / 24, 콘텐츠 최대 1760 |
| Desktop | 1280–1919 | 12 | 32 / 24 |
| Tablet | 768–1279 | 8 | 24 / 16 |
| Mobile | < 768 | 4 | 16 / 12 |

Stitch 메인 시안이 2560 와이드로 만들어져 있어 Wide 구간을 별도로 둔다. `[제안]`

### 4-2. 메인 대시보드 골격
```
┌──────┬──────────────────────────────────────────┬──────────┐
│ 사이드│  개인화 인사 + ORA                         │ 디지털 MR │
│ 탭    ├────────────────────┬─────────────────────┤ 컬럼      │
│       │  히어로 (stage)     │ 이번주 추천 웨비나   │ · 날씨    │
│ 240   │  6 / 12             │ 오늘의 VOD          │ · 오늘의  │
│       │                     │ 최신 뉴스           │   요약 3건│
│       │                     │ 아고라 브리핑       │ · 출석 →  │
│       │                     │  6 / 12             │   포인트  │
└──────┴────────────────────┴─────────────────────┴──────────┘
```
- 히어로 : 우측 스택 = 1 : 1 `[시안]` (775px 축소본 기준 360 : 360)
- 우측 섹션 카드 간격 `section-gap` 16px `[시안]`
- 디지털 MR 컬럼은 메인 우측 상주, 폭 320 `[디지털MR]` "메인페이지 우측 컬럼에 상주"
- 디지털 MR 컬럼 순서: 날씨 → 오늘의 요약 3건(날씨 / 오늘의 퀴즈 / 당일 웹심포·브랜드 업데이트) → **연속 출석 챌린지 → 보유 포인트** `[디지털MR]` `[회의록]` "연속출석챌린지 – 보유포인트 표기의 위로 재배치"
- 날씨 위젯 하단 `웨비나/VOD/콘텐츠/제품/이벤트` 탭은 **두지 않는다** `[회의록]` "탭 삭제"

### 4-3. 사이드 탭 `[회의록]`
*"전체 컬러 톤 조정 후, 좌측 화면 톤보다 한단계 진한 톤으로 잘보이게 변경."*
- 사이드 탭 배경: `stage` (`#0C1014`) — 캔버스보다 확실히 진한 단계 `[제안]`
- 활성 탭: `stage-raised` 배경 + `on-stage` 텍스트 + 좌측 3px `accent` 인디케이터
- 비활성 탭: `on-stage-sub` 텍스트

---

## 5. Shape & Elevation — `방향만`

### 5-1. Radius
| 토큰 | 값 | 적용 | 근거 |
|---|---|---|---|
| `xs` | 4 | D-day 배지, 카테고리 칩 | `[시안]` |
| `sm` | 6 | 소형 버튼, 러닝타임 필 | `[시안]` |
| `md` | 8 | 버튼, 썸네일, 리스트 행 | `[시안]` |
| `lg` | 12 | 섹션 카드 | `[시안]` |
| `xl` | 16 | 히어로, 모달 | `[시안]` |
| `full` | 9999 | 아바타, 페이저 버튼, "WEB SYMPOSIUM" 라벨 | `[시안]` |

### 5-2. Elevation
캔버스(`#F0F4F8`)와 서피스(`#FFFFFF`)의 명도 차로 카드를 분리한다. 그림자는 보조.

| 레벨 | 값 | 적용 |
|---|---|---|
| 0 | 없음 | 카드 안 행, 썸네일 |
| 1 | `0 1px 2px rgba(17,20,24,.04), 0 1px 3px rgba(17,20,24,.04)` | 섹션 카드 기본 |
| 2 | `0 8px 24px -6px rgba(17,20,24,.10)` | 카드 호버, 드롭다운 |
| 3 | `0 24px 48px -12px rgba(17,20,24,.24)` | 모달, 웰컴 화면 |

`[제안]` — 시안에서 그림자는 육안으로 거의 보이지 않는 수준이라 레벨 1을 최소값으로 잡았다.

---

## 6. Components — `방향만`

### 6-1. 버튼
| 종류 | 스타일 | 예시 | 근거 |
|---|---|---|---|
| Primary | `accent` 채움, `on-accent` 텍스트, `md` radius, 우측 `›` 아이콘 | 바로 입장하기, 사전 예약하기(1순위) | `[시안]` |
| Secondary | `surface-muted` 채움, `ink` 텍스트 | 사전 예약하기(2순위 이하) | `[시안]` |
| Text link | 배경 없음, `ink-sub` `caption`, 우측 `›` | 전체보기 | `[시안]` |
| Pager | `stage-raised` 원형 32, `on-stage` 화살표 + `1 / 5` 카운터 | 히어로 슬라이드 | `[시안]` |

- 높이: L 48 (히어로) / M 36 (리스트) / S 28 (전체보기)
- 상태: hover `accent-hover` / pressed `accent-pressed` / disabled `surface-muted` + `ink-disabled`

### 6-2. 히어로 — 웹 심포지엄 `[시안]`
- 배경 `stage`, radius `xl`, 키비주얼 이미지 + 연자 사진 컷아웃
- 상단 라벨: `WEB SYMPOSIUM` — `full` radius 아웃라인 필, `on-stage` 1px 보더
- 제목 `display-hero`, 강조어 `accent-on-stage`
- 일시 `title-lg` `on-stage`
- 연자 블록: 역할(좌장/연자) `caption` `on-stage-sub` → 이름 `title-md` `on-stage` → 소속 `meta` `on-stage-sub`. 최대 3인 가로 배열
- 하단: 좌 Primary L 버튼 / 우 페이저
- 하단 30% 영역에 `stage` → 투명 그라디언트 스크림을 깔아 텍스트 대비 확보 (이미지 위 텍스트 전용 예외)

### 6-3. 섹션 카드 `[시안]`
- `surface`, radius `lg`, padding `card-padding` 20, elevation 1
- 헤더: 좌 제목 `headline-section` / 우 `전체보기 ›` 텍스트 링크
- 헤더–본문 간격 12

### 6-4. 웨비나 리스트 행 `[시안]`
```
[D-1] [연자 사진 48] 2024-09-10 (화) 19:00            [사전 예약하기 ›]
                    내과의 최신 약물치료 전략과 선택의 중요성
                    김지은 교수 | 서울대학교병원 순환기내과
```
- 행 배경 `surface-subtle`, radius `md`, 행 간격 8
- D-day 배지: D-1 = `accent-soft` 배경 + `cat-webinar-fg` 텍스트 (`accent` 텍스트는 대비 3.07:1로 미달) / D-2 이상 = `surface-muted` + `ink-sub`
- 연자 사진 48×48, radius `md`
- 일시 `caption` `ink-muted` → 제목 `title-md` `ink-strong` → 연자 `meta` `ink-sub`

### 6-5. VOD 카드 `[시안]`
- 16:9 썸네일, radius `md`, 이미지 위 좌하단 제목 2줄 `title-md` `on-stage` + 연자 `caption`
- 우하단 러닝타임 필: `stage` 80% 불투명 배경, `on-stage` `badge`, radius `sm`, tabular-nums
- 2열 그리드

### 6-6. 뉴스 `[시안]`
- 좌: 대표 기사 — 다크 이미지 카드, 좌상단 카테고리 배지(`cat-news`), 제목 `title-lg` `on-stage`, 날짜 | 출처 `caption`
- 우: 썸네일 리스트 2건 — 썸네일 112×64 `md`, 제목 `title-md`, 날짜 | 분류 `caption` `ink-muted`

### 6-7. 아고라 브리핑 카드 `[시안]`
- 3열. 상단 이미지 16:10 radius `md` → 카테고리 칩 → 제목 `title-lg` 2줄 → 날짜 `caption`
- 칩은 2-4 / 2-5 규칙 적용 (시안의 단일 베이지에서 변경)

### 6-8. 개인화 인사 `[회의록]` `[디지털MR]`
```
[ORA]  김안국 교수님, 안녕하세요
       AGORA 12번째 방문을 환영합니다
```
- **ORA를 인사말 바로 옆(좌측)에 배치** `[회의록]` "[김안국 교수님 안녕하세요] 옆에 'ORA' 배치"
- 이름 + 인사 `headline-lg`
- 방문 횟수 문구에서 **"12번째 방문"만** `title-lg` 700 + `ink-strong`로 키우고 굵게 `[회의록]` "폰트 크기 UP, 굵게"
- 인사 분기: 첫 방문 / 오랜만 / 평시 `[디지털MR]`

### 6-9. ORA (디지털 MR 캐릭터) — `미정`
- 형태: 3D 반실사 남성 → **구체(orb)** 형태로 검토 중 `[디지털MR]`
- 톤: 장난스럽지 않은 전문적 톤 `[디지털MR]`
- 이 문서는 형태 확정 전까지 **자리(slot)만 정의**한다: 인사 영역 48×48, 웰컴 화면 120×120, 원형 마스크
- orb 확정 시 제안 방향 `[제안]`: `stage` 기반 구체 + `accent` 미세 하이라이트, 정지 상태 기본·호흡형 미세 모션만

### 6-10. 웰컴 화면 `[디지털MR]`
- 하루 1회, 첫 로그인 시 모달 (elevation 3, radius `xl`)
- 순서: 방문 인사 → 금일 웹심포지엄 추천 → 웰컴 메시지 + 확인 시 출석 포인트 지급
- **NEXT와 별개로 나가기(스킵) 버튼 필수** — 우상단 텍스트 버튼

### 6-11. 출석 · 포인트 위젯 `[회의록]` `[개요]`
- 순서: 연속 출석 챌린지 → 보유 포인트 (세로)
- 출석: 7칸 스트릭, 달성 칸 `accent`, 미달성 `surface-muted`, 오늘 칸 `accent` 2px 아웃라인
- 포인트: 숫자 `headline-lg` tabular-nums + 단위 `P` `meta`

### 6-12. 배지 · 칩 공통
| 종류 | 스타일 |
|---|---|
| LIVE | `live` 채움, `on-accent`, 좌측 6px 점(1.2s 펄스), `xs` |
| D-day | 6-4 참조 |
| 카테고리 | 2-4 참조 |
| 진료과 | 2-5 참조 |
| WEB SYMPOSIUM | 6-2 참조 |

---

## 7. Imagery — `방향만`
- 연자 사진: 흰 가운 + 단색 배경, 어깨선 위 크롭. 리스트 48 정사각 / 히어로 컷아웃 `[시안]`
- 질환 키비주얼: 3D 해부·의학 렌더 (심장, 신장, 혈관, 뇌) `[시안]`
- VOD·뉴스 썸네일은 이미지 위에 텍스트가 올라가므로 하단 스크림 필수
- 스톡 느낌의 웃는 인물 단체 사진, 일러스트 캐릭터 금지 `[제안]`

---

## 8. 회의록 반영 체크 (2026.09.23 피드백 v3)

| # | 피드백 원문 | 반영 위치 | 상태 |
|---|---|---|---|
| 1 | 전체 컬러 톤 조정 – 하늘색 톤과 쨍한 톤 제외, 프리미엄 톤으로 변경 / 가안 3가지 이상 (버건디, 네이비, 블랙) | 2-1, 2-2 | ⚠️ 아래 참고 |
| 2 | 사이드 탭 강조 – 좌측 화면 톤보다 한단계 진한 톤 | 4-3 | 반영 |
| 3 | 카테고리 분류 가시성 개선 – 색상·배경·아이콘 대비 강화 | 2-4 | 반영 (시안에서 변경) |
| 4 | 이번주 추천 웨비나 카드 톤을 하나의 색 계열로 | 2-6 | 반영 |
| 5 | 연속출석챌린지 – 보유포인트 위로 재배치 | 4-2, 6-11 | 반영 |
| 6 | 개인화메시지 "12번째 방문" 강조 – 폰트 크기 UP, 굵게 | 6-8 | 반영 |
| 7 | [김안국 교수님 안녕하세요] 옆에 ORA 배치 | 6-8 | 반영 |
| 8 | 날씨 하단 웨비나/VOD/콘텐츠/제품/이벤트 탭 삭제 | 4-2 | 반영 |

**⚠️ #1 확인 필요**
- 시안의 `accent` `#FC4C28`은 고채도 주황이다. 회의록의 "쨍한 톤 제외"와 충돌할 수 있다.
- 이 문서는 시안 값을 유지하되 **2-2 액센트 사용 규칙**(섹션당 1개, 면 배경 금지)으로 면적을 제한했다.
- 회의록이 요구한 **가안 3종(버건디 / 네이비 / 블랙)** 비교는 아직 없다. 액센트 교체가 결정되면 front matter의 `accent*` 5개 토큰만 바꾸면 전체에 반영된다.

---

## 9. 접근성 — 대비 실측 (WCAG 2.1)

| 전경 / 배경 | 대비 | AA 본문 4.5 | 판정 |
|---|---|---|---|
| `ink` / `surface` | 13.30 | ✅ | 본문 |
| `ink-sub` / `surface` | 6.05 | ✅ | 메타 |
| `ink-sub` / `surface-subtle` | 5.69 | ✅ | 리스트 행 메타 |
| `ink-muted` / `surface` | 3.18 | ❌ | 캡션 전용 |
| `on-stage-sub` / `stage` | 12.08 | ✅ | |
| `accent-on-stage` / `stage` | 5.87 | ✅ | 히어로 강조어 |
| **`on-accent` / `accent`** | **3.39** | ❌ | ⚠️ 아래 참고 |
| `accent` / `accent-soft` | 3.07 | ❌ | 사용 금지 → `cat-webinar-fg` 사용 |
| 카테고리 6종 fg / bg | 4.71 – 14.61 | ✅ | |

**⚠️ Primary 버튼 대비**
- 시안 값 `#FC4C28` 위 흰 텍스트는 3.39:1로 AA 본문 기준(4.5:1)에 미달한다. 대형 텍스트 기준(3:1, 18.66px bold 이상)만 통과한다.
- 현재 규칙: Primary 버튼 텍스트는 **16px 700 이상**으로 쓴다(L 버튼 18px).
- 의료진 대상 공공성·연령대를 고려하면 `accent`를 `#E5401E`(4.13:1, 대형 텍스트 여유 확보) 또는 `#D1361A`(4.94:1, AA 본문 통과)로 한 단계 어둡게 조정하는 것을 권장한다. 회의록 "쨍한 톤 제외"와도 방향이 맞는다. — `업체 제안 요청` / 리뷰 시 결정

---

## 10. 변경 이력
| 버전 | 날짜 | 내용 |
|---|---|---|
| 0.1.0 | 2026-10-02 | 초안. 메인 대시보드 참고 시안 실측 + 노션 개요·디지털 MR·회의록 반영 |

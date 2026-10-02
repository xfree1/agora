---
name: AGORA
colors:
  primary: '#FF4F1A'
  primary-hover: '#E8440F'
  primary-soft: '#FFF1E8'
  primary-text: '#F2511B'
  gold: '#B8873E'
  gold-deep: '#8A5A22'
  gold-soft: '#EFE3CC'
  gold-tint: '#F7F0E3'
  ink: '#111111'
  ink-sub: '#4B4F57'
  ink-muted: '#8A8F98'
  line: '#ECEEF2'
  canvas: '#F3F5F8'
  surface: '#FFFFFF'
  hero-dark: '#120C08'
  alert: '#FF3B30'
typography:
  logo:
    fontFamily: Didone Serif (Bodoni 계열)
    fontSize: 34px
    fontWeight: '500'
    letterSpacing: 0.02em
  gnb:
    fontFamily: Pretendard
    fontSize: 17px
    fontWeight: '600'
  hero-title:
    fontFamily: Pretendard
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  section-title:
    fontFamily: Pretendard
    fontSize: 17px
    fontWeight: '800'
    letterSpacing: -0.01em
  welcome-name:
    fontFamily: Pretendard
    fontSize: 20px
    fontWeight: '800'
  welcome-count:
    fontFamily: Pretendard
    fontSize: 22px
    fontWeight: '900'
  card-title:
    fontFamily: Pretendard
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  body:
    fontFamily: Pretendard
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 19px
  caption:
    fontFamily: Pretendard
    fontSize: 11px
    fontWeight: '500'
  money:
    fontFamily: Pretendard
    fontSize: 26px
    fontWeight: '800'
rounded:
  chip: 4px
  button: 8px
  card: 12px
  hero: 14px
  pill: 9999px
spacing:
  page-margin: 24px
  gutter: 12px
  card-padding: 14px
  section-gap: 12px
  right-panel-width: 330px
  canvas-width: 1920px
  canvas-height: 900px
  icon-rail-width: 48px
---

## 출처

- Figma `AGORA` 파일(r5sjX5hjImYGt4VQfi11I0) Page 1의 최신 메인 시안 `Group 624590`(node 341:230), 사용자가 공유한 레퍼런스 보드(메인 V 시리즈 7종).
- 색상 hex는 Figma 변수·스타일이 아니라 시안 이미지에서 읽은 값이다. Figma MCP 호출 한도(Starter 플랜) 때문에 변수 추출을 하지 못했다. 디자이너 확정 값이 나오면 교체한다.

## Brand & Style

- **화이트 베이스 + 오렌지 레드 포인트 + 골드/브라운 프리미엄 액센트.** 밝고 깨끗한 포털 위에 강한 오렌지 CTA로 행동을 유도한다.
- 프리미엄 톤은 **골드·브라운**이 담당한다(로고의 O, GNB 활성 바, 출석 체크 원, 리워드 탭, 히어로 골드 웨이브). 하늘색·비비드 블루를 UI 색으로 쓰지 않는다(2026.09.23 피드백 v3).
- 실사 의료진 사진과 고해상도 의학 일러스트(혈관·세포·DNA·장기)가 화면의 시각적 주인공이다. UI 크롬은 최대한 절제한다.

## Colors

- **Primary Orange `#FF4F1A`**: CTA 버튼(바로 입장하기, 신청하기, 바로 참여하기, 참여하기), 섹션 타이틀 강조어(PICK!, 브리핑, VOD), 히어로 강조 문구, "12번째" 방문 수. 한 화면에서 채움 버튼은 1~2개로 제한한다.
- **Primary Soft `#FFF1E8`**: 퀴즈 배너, 생일 카드, 카테고리 태그 배경.
- **Gold `#B8873E` / Gold Deep `#8A5A22`**: GNB 활성 언더바(골드→브라운 그라데이션), 출석 체크 원, 히어로 태그 테두리, 로고 O.
- **Gold Soft `#EFE3CC` / Gold Tint `#F7F0E3`**: 리워드 탭 선택 상태, 적립내역 칩, 유효기간 진도바.
- **Ink `#111111`**: 타이틀, 본문 강조. **Ink Sub `#4B4F57`**: 본문. **Ink Muted `#8A8F98`**: 날짜, 부제, 메타.
- **Canvas `#F3F5F8`**: 본문 영역 배경. 카드는 **Surface `#FFFFFF`**.
- **Hero Dark `#120C08`**: 메인 히어로 카드 배경. 블랙~딥브라운 위에 골드 웨이브 그래픽.
- **Alert `#FF3B30`**: 알림 벨 배지만.

## Typography

- 한글: **Pretendard**. 로고만 **Didone 계열 세리프**(Bodoni 느낌, 굵은 획 대비).
- 히어로 타이틀 34px/800, 3줄 이내, 핵심 구절만 오렌지.
- 섹션 타이틀은 `AGORA` + 오렌지 키워드 조합(`AGORA PICK!`, `AGORA 브리핑`, `AGORA VOD`). 오른쪽에 12px 회색 부제, 맨 오른쪽 `전체보기 >` 아웃라인 미니 버튼.
- 숫자(날짜, 포인트, 재생시간)는 tabular figures.

## Layout & Spacing

- **기준 캔버스 1920×900 (Figma 프레임과 동일), 화면 폭을 꽉 채우는 풀블리드 레이아웃.** 고정 폭 컨테이너·max-width 중앙 정렬을 쓰지 않는다. 레퍼런스는 네이버페이 증권 홈.
- **헤더 2단, 화면 전체 폭**
  - 1단(높이 68): 좌측 세리프 로고 + 통합검색 바(라운드 pill, 약 260px) + 가운데 서비스 메뉴 `홈 / VOD / 교육실 / 자료실 / 학회정보` + 우측 아이콘(알림 배지, 프로필).
  - 2단(높이 52): 현재 메뉴의 하위 탭(예: VOD → `전체 / 학술 심포지엄 / 교육 웨비나 / 병원경영 / 내 시청기록`), 활성 탭은 굵게 + 하단 바. 우측 끝에 오렌지 pill 공지(예: `오늘 19:00 라이브`) + 회색 공지 한 줄.
  - 그 아래 상태 줄(높이 36): `• 오늘 라이브 19:00  • 이번 주 신규 VOD 5편  • 시청 중 3편` 같은 요약을 작은 배지와 함께.
- **본문 = 유동 2열 + 우측 고정 사이드바**
  - 메인 열(남는 폭의 약 62%): 대표 콘텐츠 카드 묶음. 상단에 가로 스크롤 요약 카드 줄(질환별 카드: 이름·편수·신규 배지·미니 그래프), 그 아래 큰 대표 카드(좌 대표 영상 / 우 순위·현황 리스트), 그 아래 그리드.
  - 보조 열(약 38%): `캘린더`(웹심포 일정), `최근 업로드`, `최근 본 / 북마크 / 시청완료` 탭 리스트 같은 세로 스택 카드.
  - 우측 사이드바(약 330px + 아이콘 레일 48px): 화면 오른쪽 끝에 붙는다. 디지털 MR(ORA) 인사·출석·포인트. 상단에 접기(`»`) 버튼.
- **첫 화면 900px 안에 핵심을 모두 넣는다.** 세로로 길게 늘어놓지 않는다. 카드 간격 12px, 카드 내부 패딩 14~16px, 정보 밀도는 높게.
- 섹션 구분은 큰 여백 대신 얇은 1px 라인과 카드 경계로 한다.

## Elevation & Shapes

- 카드: 흰 배경, radius 12px, 아주 옅은 그림자(`0 1px 2px rgba(17,17,17,0.04)`), 테두리 없음.
- 버튼 radius 8px, 태그 칩 radius 4px, 출석/날짜 배지·토글은 pill.
- 히어로 radius 14px.

## Components

- **GNB**: 흰 배경, 좌측 세리프 로고 `AGORA`, 메뉴 `홈 / VOD / 교육실 / 자료실 / 학회정보`(17px/600, 넓은 간격). 활성 메뉴는 굵게 + 하단 짧은 골드-브라운 그라데이션 바. 우측 햄버거.
- **히어로 카드**: 다크 배경 + 골드 웨이브. 상단 날짜·시간(`2026.10.05(월) 19:00 - 20:30`) + 골드 아웃라인 태그(`심혈관·고혈압`). 타이틀(강조어 오렌지), 2줄 설명, 연자 3인 실사 컷아웃(이름 굵게, 소속 2줄). 하단 오렌지 CTA `바로 입장하기 >`, 우측 캐러셀(`< 1 / 4 >`, 원형 아웃라인 화살표).
- **콘텐츠 카드(PICK!/브리핑)**: 상단 의학 이미지(radius 8px), 작은 카테고리 태그(옅은 오렌지 배경 + 오렌지 글씨), 굵은 제목 2줄, 회색 날짜.
- **VOD 카드**: 세로형(약 4:5) 풀블리드 의학 이미지 또는 연자 사진. 하단 블랙 그라데이션 위 흰 굵은 제목 3줄, 연자명·소속 캡션, 우하단 재생시간 배지(`32:18`, 다크 반투명).
- **퀴즈 배너**: Primary Soft 배경, 전구 아이콘, `TODAY QUIZ` 오렌지 라벨, 문구 중 포인트(`200P`) 오렌지. 우측 `다음에 보기`(회색 아웃라인) + `바로 참여하기 >`(오렌지 채움).
- **우측 개인화 패널(디지털 MR)**:
  - 인사: `김안국 교수님` 20px/800 + 다음 줄 `12번째`(오렌지, 22px/900) `방문을 환영합니다!`. 인사말 옆에 `ORA` 배치(피드백 v3).
  - 연속 출석 챌린지: 트로피 아이콘, `5일 연속 출석 >`(오렌지 아웃라인 pill + 불꽃 아이콘), 요일 원 7개(체크 = 골드브라운 채움, 미체크 = 연회색). 보유 포인트 위에 배치.
  - 날씨: 옅은 회색 카드, 지역·기온 크게, 안내 문구 강조 오렌지(`우산을 챙겨주세요!`), 3일 예보. 하단 탭 없음.
  - 생일 축하 카드: Primary Soft 배경, 케이크 일러스트, 닫기 X.
  - 이번 주 추천 웨비나: 날짜(`12.07 (토)`) + 연자 사진 + 제목 + 버튼. 가장 가까운 일정만 오렌지 `신청하기`, 나머지는 회색. 카드 톤은 한 색 계열.
  - 리워드: `리워드 / 마이활동` 탭(선택 = Gold Soft), `아고라머니 12,450원 >`, `적립내역`(Gold Soft 칩) `포인트몰` 칩, 유효기간 진도바.
- **아이콘 레일**: 흰 배경, 라인 아이콘 + 11px 라벨. 알림 벨만 Alert 레드.

## Do / Don't

- Do: 흰 배경, 오렌지는 행동 유도에만, 골드는 프리미엄 장식에만, 실사·의학 이미지를 크게.
- Don't: 하늘색·코발트 블루 UI, 네이비 단색 배경 패널, 무지개 카테고리 색, 텍스트만 있는 썸네일.

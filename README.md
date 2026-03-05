# ⏪ 다시(re) 기록하는 방문 일지, 리코드

> 내가 좋아하는 장소를 아카이빙하고, 방문의 기억을 기록하는 나만의 재방문 일지

<br/>

## 🎯 서비스 소개

**re.cord**는 즐겨 찾는 테마별 장소를 아카이빙하고, 장소마다 방문 일지를 남길 수 있는 개인 기록 서비스입니다.

카페, 전시, 맛집 등 나만의 테마로 **레코드(컬렉션)** 를 만들고, 그 안에 **핀(장소)** 을 추가해 방문 메모와 별점을 남겨보세요. 아직 가보지 못한 곳은 **위시리스트**에 저장해두고 언제든지 꺼내볼 수 있습니다.

나만의 레코드판에 핀을 더하고 기록을 재생해보세요!💽🎵

🔗 **배포 링크**: [https://re-cord-log.vercel.app](https://re-cord-log.vercel.app)

<br/><br/><br/>

## ✨ 주요 기능

### 📁 레코드 (Record)

- 테마별로 장소 컬렉션 생성·관리
- 레코드별 핀 목록 및 지도 모아보기

### 📌 핀 (Pin)

- 카카오맵 장소 검색으로 핀 추가 (3단계 폼)
- 장소 메모 및 별점 등록
- 핀별 평균 별점 및 메모 수 자동 집계

### 💭 위시 (Wish)

- 방문 예정 장소 위시리스트 저장

### 🗺️ 지도 시각화

- 레코드 내 전체 핀을 카카오맵으로 시각화하여 위치 파악 가능

<br/>

## 🛠️ 기술 스택

| 구분             | 사용 기술                                     |
| ---------------- | --------------------------------------------- |
| **Frontend**     | React 19, React Router v7                     |
| **Backend / DB** | Firebase Authentication, Firebase Firestore   |
| **Map**          | Kakao Maps SDK (`react-kakao-maps-sdk`)       |
| **Styling**      | CSS Modules, CSS Variables, Pretendard 웹폰트 |
| **아이콘**       | react-icons                                   |
| **빌드 도구**    | Create React App (react-scripts)              |
| **배포**         | Vercel                                        |

<br/>

## 📂 프로젝트 구조

```
src/
├── Assets/              # SVG 아이콘 및 이미지
├── Components/          # 공통 UI 컴포넌트
│   ├── Header.js / TitleHeader.js / Navbar.js
│   ├── RecordCard.js / WishCard.js / RecordPinCard.js
│   ├── KakaoMap.js      # 카카오맵 래퍼
│   ├── StarRating.js    # 별점 컴포넌트
│   ├── EditModal.js / EditInputModal.js
│   └── ...
├── Pages/
│   ├── Greeting.js      # 온보딩 / 닉네임 로그인
│   ├── Records.js       # 레코드 목록 메인 화면
│   ├── AddRecord.js     # 레코드 생성
│   ├── RecordDetail.js  # 레코드 상세 (핀 목록 + 지도)
│   ├── Wish.js          # 위시리스트
│   └── Pin/
│       ├── AddPin.js    # 핀 추가 (멀티스텝 폼)
│       ├── PinDetail.js # 핀 상세 (메모 목록)
│       ├── AddMemo.js   # 메모 작성
│       └── Steps/       # 장소 검색 → 지도 확인 → 최종 입력
├── Hooks/
│   ├── useModal.js      # 모달 상태 관리 커스텀 훅
│   └── useDrawer.js     # 드로어 상태 관리 커스텀 훅
├── firebase/
│   ├── firebase.js      # Firebase 초기화
│   ├── auth.js          # 인증 (익명 로그인)
│   └── firestore/
│       ├── recordsCRUD.js
│       ├── pinsCRUD.js
│       └── wishesCRUD.js
├── App.js
└── MainLayout.js        # 라우팅 및 인증 상태 관리
```

<br/>

## 🗄️ Firestore 데이터 구조

```
users/{userId}
├── records/{recordId}
│   ├── name, description, totalMemoCount
│   └── pins/{pinId}
│       ├── place_name, address, lat, lng, pinDesc
│       ├── memoCount, avgRating, lastUpdated
│       └── memos/{memoId}
│           └── rating, content, image, date
└── wishes/{wishId}
    └── place_name, address, lat, lng
```

<br/>

## 🚀 시작하기

### 🔑 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 아래 값을 설정합니다.

```env
REACT_APP_KAKAOMAP_KEY=your_kakao_map_key
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 💻 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:3000)
npm start

# 프로덕션 빌드
npm run build
```

<br/>

## 🎨 화면 구성

| 화면           | 설명                                               |
| -------------- | -------------------------------------------------- |
| 👋 온보딩      | 닉네임 입력 후 익명 로그인으로 시작                |
| 📁 레코드 목록 | 생성한 컬렉션을 바이닐 레코드 카드 형태로 표시     |
| 📍 레코드 상세 | 레코드 내 핀 목록 및 지도 모아보기                 |
| ➕ 핀 추가     | 카카오맵 장소 검색 → 지도 확인 → 설명 입력 (3단계) |
| 📝 핀 상세     | 방문 메모 목록, 평균 별점, 장소 지도               |
| 💭 위시        | 방문 예정 장소 목록                                |

<br/>

## 🔐 인증 방식

Firebase **익명 인증(Anonymous Authentication)** 을 사용합니다. 별도 회원가입 없이 닉네임만 입력하면 고유한 사용자 ID가 발급되어 데이터가 개인화됩니다.

⚠️ **주의사항**:

- 브라우저 데이터 삭제 시 계정 복구 불가
- 다른 브라우저/기기에서는 동일 데이터 접근 불가

<br/> <br/>

## 📸 스크린샷

> 주요 화면 스크린샷 추가 예정

<br/>

## 🎯 향후 개선 계획

- [ ] 이메일 계정 연동 기능(데이터 백업)
- [ ] 이미지 업로드 기능
- [ ] 방문 통계 대시보드
- [ ] 공유 기능 (친구와 레코드 공유)

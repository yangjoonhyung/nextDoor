# NextDoor Frontend

Next.js + TypeScript + Tailwind CSS로 구축된 현대적인 웹 애플리케이션입니다.

## 🚀 기술 스택

- **Next.js 15** - React 기반 풀스택 프레임워크 (App Router)
- **TypeScript** - 정적 타입 검사
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅

## 📁 프로젝트 구조

```
frontend/
├── src/
│   ├── app/                 # App Router 디렉토리
│   │   ├── layout.tsx      # 루트 레이아웃
│   │   ├── page.tsx        # 홈페이지
│   │   ├── about/          # 소개 페이지
│   │   │   └── page.tsx
│   │   └── globals.css     # 전역 스타일
│   └── components/         # 재사용 가능한 컴포넌트
│       └── Header.tsx
├── public/                 # 정적 파일
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── eslint.config.mjs
└── .prettierrc
```

## 🛠️ 개발 환경 설정

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. 의존성 설치:

```bash
npm install
```

2. 개발 서버 실행:

```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 📜 사용 가능한 스크립트

- `npm run dev` - 개발 서버 실행 (Turbopack 사용)
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint로 코드 검사
- `npm run lint:fix` - ESLint로 코드 검사 및 자동 수정
- `npm run format` - Prettier로 코드 포맷팅
- `npm run format:check` - Prettier 포맷팅 검사

## 🎨 스타일링

이 프로젝트는 Tailwind CSS를 사용하여 스타일링됩니다. 다크 모드도 지원합니다.

### 주요 Tailwind 클래스

- `bg-white dark:bg-gray-900` - 다크 모드 지원 배경색
- `text-gray-900 dark:text-white` - 다크 모드 지원 텍스트 색상
- `hover:bg-blue-700` - 호버 효과
- `transition-colors` - 부드러운 색상 전환

## 📱 반응형 디자인

모든 컴포넌트는 모바일 우선 반응형 디자인으로 구현되어 있습니다:

- `sm:` - 640px 이상
- `md:` - 768px 이상
- `lg:` - 1024px 이상
- `xl:` - 1280px 이상

## 🔧 개발 도구

### ESLint 설정

- Next.js 권장 설정
- TypeScript 지원
- Prettier 통합

### Prettier 설정

- 세미콜론 사용
- 작은따옴표 사용
- 2칸 들여쓰기
- 80자 줄 길이 제한

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

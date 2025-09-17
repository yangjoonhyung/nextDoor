export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            프로젝트 소개
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              NextDoor Frontend는 Next.js 15의 App Router를 활용하여 구축된
              현대적인 웹 애플리케이션입니다.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              주요 기술 스택
            </h2>

            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
              <li>
                <strong>Next.js 15</strong> - React 기반 풀스택 프레임워크
              </li>
              <li>
                <strong>TypeScript</strong> - 정적 타입 검사
              </li>
              <li>
                <strong>Tailwind CSS</strong> - 유틸리티 우선 CSS 프레임워크
              </li>
              <li>
                <strong>ESLint</strong> - 코드 품질 관리
              </li>
              <li>
                <strong>Prettier</strong> - 코드 포맷팅
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              프로젝트 구조
            </h2>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
                {`frontend/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── about/
│       │   └── page.tsx
│       └── globals.css
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── eslint.config.mjs
└── .prettierrc`}
              </pre>
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              이 프로젝트는 App Router 구조를 사용하여 라우팅을 관리하며,
              TypeScript와 Tailwind CSS를 통해 타입 안전성과 현대적인 UI를
              제공합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-300 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between h-16"
          style={{ maxWidth: '1152px', margin: '0 auto' }}
        >
          {/* 로고 섹션 */}
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="NextDoor Logo" className="h-12 w-auto" />
          </Link>

          {/* 메뉴 및 로그인 버튼 */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {/* 네비게이션 메뉴 */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <Link
                href="/travel"
                className="text-black hover:text-gray-600 transition-colors"
              >
                여행지
              </Link>
              <Link
                href="/mypage"
                className="text-black hover:text-gray-600 transition-colors"
              >
                마이페이지
              </Link>
              <Link
                href="/community"
                className="text-black hover:text-gray-600 transition-colors"
              >
                게시글
              </Link>
            </nav>

            {/* 로그인 버튼 */}
            <Link
              href="/login"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              로그인
            </Link>

            {/* 모바일 메뉴 버튼 */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

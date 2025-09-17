import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-300 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 섹션 */}
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="NextDoor Logo" className="h-12 w-auto" />
          </Link>

          {/* 메뉴 및 로그인 버튼 */}
          <div className="flex items-center space-x-8">
            {/* 네비게이션 메뉴 */}
            <nav className="hidden md:flex space-x-8">
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
                커뮤니티
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

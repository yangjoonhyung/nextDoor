import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        {/* 로고 */}
        <img
          src="/logo.png"
          alt="NextDoor Logo"
          width="160"
          className="mx-auto mb-6"
        />

        {/* 로그인 폼 */}
        <div className="space-y-4">
          {/* 아이디 입력창 */}
          <input
            type="text"
            placeholder="아이디"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 비밀번호 입력창 */}
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 아이디/비밀번호 찾기 링크 */}
          <div className="flex justify-between">
            <Link
              href="/find-id"
              className="text-sm text-gray-500 hover:underline"
            >
              아이디 찾기
            </Link>
            <Link
              href="/find-password"
              className="text-sm text-gray-500 hover:underline"
            >
              비밀번호 찾기
            </Link>
          </div>

          {/* 로그인 버튼 */}
          <button className="w-full bg-[#63CDFF] hover:bg-sky-400 text-white py-3 rounded-lg transition-colors font-medium">
            로그인
          </button>

          {/* 회원가입 링크 */}
          <div className="text-center">
            <span className="text-gray-500">아직 회원이 아니세요? </span>
            <Link href="/signup" className="text-blue-600 hover:underline">
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

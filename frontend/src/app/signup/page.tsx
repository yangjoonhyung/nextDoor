export default function Signup() {
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

        {/* 회원가입 폼 */}
        <div className="space-y-4">
          {/* 제목 */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">회원가입</h2>

          {/* 이름 입력창 */}
          <input
            type="text"
            placeholder="이름"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 이메일 입력창 */}
          <input
            type="email"
            placeholder="이메일"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 아이디 입력창 + 중복 버튼 */}
          <div className="flex">
            <input
              type="text"
              placeholder="아이디"
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
            />
            <button className="ml-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              중복
            </button>
          </div>

          {/* 비밀번호 입력창 */}
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 비밀번호 확인 입력창 */}
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 회원가입 버튼 */}
          <button className="w-full bg-[#4FC3F7] hover:bg-sky-500 text-white py-3 rounded-lg transition-colors font-medium">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

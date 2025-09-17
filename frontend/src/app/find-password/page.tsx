export default function FindPassword() {
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

        {/* 비밀번호 찾기 폼 */}
        <div className="space-y-4">
          {/* 제목 */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            비밀번호 찾기
          </h2>

          {/* 아이디 입력창 */}
          <input
            type="text"
            placeholder="아이디"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 새로운 비밀번호 입력창 */}
          <input
            type="text"
            placeholder="새로운 비밀번호"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 새로운 비밀번호 확인 입력창 */}
          <input
            type="email"
            placeholder="새로운 비밀번호 확인"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 비밀번호 재설정 버튼 */}
          <button className="w-full bg-[#63CDFF] hover:bg-sky-400 text-white py-3 rounded-lg transition-colors font-medium">
            비밀번호 재설정
          </button>
        </div>
      </div>
    </div>
  );
}

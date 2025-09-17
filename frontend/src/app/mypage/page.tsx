export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">마이페이지</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">사용자 정보</h2>
              <p className="text-gray-600">로그인이 필요합니다</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">내 여행 기록</h3>
              <p className="text-gray-600">아직 여행 기록이 없습니다.</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">즐겨찾기</h3>
              <p className="text-gray-600">즐겨찾기한 여행지가 없습니다.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">설정</h3>
              <p className="text-gray-600">계정 설정을 관리하세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

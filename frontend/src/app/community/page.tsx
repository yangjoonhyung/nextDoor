export default function Community() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">커뮤니티</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">서울 여행 추천 코스</h3>
              <span className="text-sm text-gray-500">2024.01.15</span>
            </div>
            <p className="text-gray-600 mb-4">
              서울에서 꼭 가봐야 할 명소들을 소개합니다. 경복궁, 남산타워, 명동
              등...
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>👤 김여행</span>
              <span>💬 12</span>
              <span>👍 45</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">제주도 맛집 리스트</h3>
              <span className="text-sm text-gray-500">2024.01.14</span>
            </div>
            <p className="text-gray-600 mb-4">
              제주도에서 꼭 먹어봐야 할 음식들과 맛집들을 정리했습니다...
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>👤 이맛집</span>
              <span>💬 8</span>
              <span>👍 32</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">부산 해운대 여행 후기</h3>
              <span className="text-sm text-gray-500">2024.01.13</span>
            </div>
            <p className="text-gray-600 mb-4">
              해운대 해수욕장과 감천문화마을을 다녀온 후기를 공유합니다...
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>👤 박바다</span>
              <span>💬 15</span>
              <span>👍 67</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

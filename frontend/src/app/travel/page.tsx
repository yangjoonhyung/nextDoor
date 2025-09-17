export default function Travel() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">여행지</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">서울</h3>
            <p className="text-gray-600">대한민국의 수도이자 최대 도시</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">부산</h3>
            <p className="text-gray-600">
              해운대와 감천문화마을이 있는 항구도시
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">제주도</h3>
            <p className="text-gray-600">한라산과 아름다운 해변의 섬</p>
          </div>
        </div>
      </div>
    </div>
  );
}

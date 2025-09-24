'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

// 더미 데이터 타입 정의
interface Hotel {
  id: number;
  name: string;
  address: string;
}

export default function AccommodationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotels, setSelectedHotels] = useState<Hotel[]>([]);
  const router = useRouter();

  // 더미 숙소 데이터 (현재는 빈 배열)
  const hotels: Hotel[] = [];

  // 검색 핸들러 (나중에 API 연동용)
  const handleSearch = () => {
    // TODO: 실제 API 호출 구현
    console.log('검색어:', searchQuery);
  };

  // 숙소 추가 함수
  const addHotel = (hotel: Hotel) => {
    if (!selectedHotels.find(h => h.id === hotel.id)) {
      setSelectedHotels([...selectedHotels, hotel]);
    }
  };

  // 숙소 제거 함수
  const removeHotel = (hotelId: number) => {
    setSelectedHotels(selectedHotels.filter(h => h.id !== hotelId));
  };

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    router.push('/confirm');
  };

  return (
    <Layout>
      {/* 상단 정보 */}
      <div className="mb-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">부산</h1>
          <p className="text-gray-600">2025.09.19(금) - 2025.09.26(금)</p>
        </div>

        {/* 진행 단계 */}
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">STEP 1 날짜 선택</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">STEP 2 장소 선택</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-blue-600 font-medium">
              STEP 3 숙소 선택
            </p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
        {/* 왼쪽: 숙소 검색 및 리스트 영역 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">숙소 검색</h2>
          </div>

          <div className="p-4">
            {/* 검색창 */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                placeholder="숙소명을 입력하세요"
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* 숙소 목록 */}
            <div className="space-y-3 max-h-[calc(100vh-500px)] overflow-y-auto">
              {hotels.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">검색 결과가 없습니다</p>
                </div>
              ) : (
                hotels.map(hotel => (
                  <div
                    key={hotel.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {hotel.address}
                      </p>
                    </div>
                    <button
                      onClick={() => addHotel(hotel)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <span className="text-gray-600 font-bold">+</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽: 선택된 숙소 리스트 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">선택한 숙소</h2>
          </div>

          <div className="p-4">
            {selectedHotels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">선택된 숙소가 없습니다</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-500px)] overflow-y-auto">
                {selectedHotels.map(hotel => (
                  <div
                    key={hotel.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {hotel.address}
                      </p>
                    </div>
                    <button
                      onClick={() => removeHotel(hotel.id)}
                      className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <span className="text-red-600 font-bold">×</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 다음 버튼 */}
      <div className="flex justify-end mt-6 mb-20 bg-gray-50">
        <button
          onClick={handleNext}
          className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          다음
        </button>
      </div>
    </Layout>
  );
}

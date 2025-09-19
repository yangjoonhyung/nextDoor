'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

// 더미 데이터 타입 정의
interface Place {
  id: number;
  name: string;
  address: string;
}

export default function CartListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const router = useRouter();

  // 더미 장소 데이터
  const places: Place[] = [
    {
      id: 1,
      name: '도쿄 타워',
      address: '4-chōme-2-8 Shibakōen, Minato City, Tokyo 105-0011, Japan',
    },
    {
      id: 2,
      name: '시부야 스카이',
      address: '2-chōme-1-1 Shibuya, Shibuya City, Tokyo 150-0002, Japan',
    },
    {
      id: 3,
      name: '아키하바라',
      address: 'Sotokanda, Chiyoda City, Tokyo 101-0021, Japan',
    },
    {
      id: 4,
      name: '센소지',
      address: '2-chōme-3-1 Asakusa, Taitō City, Tokyo 111-0032, Japan',
    },
    {
      id: 5,
      name: '신주쿠',
      address: 'Shinjuku, Shinjuku City, Tokyo 160-0022, Japan',
    },
    {
      id: 6,
      name: '시부야 스크램블 스퀘어',
      address: '2-chōme-24-12 Shibuya, Shibuya City, Tokyo 150-0002, Japan',
    },
  ];

  // 검색어에 따라 장소 필터링
  const filteredPlaces = places.filter(
    place =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 장소 추가 함수
  const addPlace = (place: Place) => {
    if (!selectedPlaces.find(p => p.id === place.id)) {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  // 장소 제거 함수
  const removePlace = (placeId: number) => {
    setSelectedPlaces(selectedPlaces.filter(p => p.id !== placeId));
  };

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    router.push('/accommodation');
  };

  return (
    <Layout>
      {/* 상단 정보 */}
      <div className="mb-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">도쿄</h1>
          <p className="text-gray-600">2025.09.19(금) - 2025.09.26(금)</p>
        </div>

        {/* 진행 단계 */}
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">STEP 1 날짜 선택</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-blue-600 font-medium">
              STEP 2 장소 선택
            </p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">STEP 3 숙소 선택</p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
        {/* 왼쪽: 장소 선택 영역 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">장소 선택</h2>
          </div>

          <div className="p-4">
            {/* 검색창 */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="장소명을 입력하세요"
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
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
              </div>
            </div>

            {/* 장소 목록 */}
            <div className="space-y-3 max-h-[calc(100vh-500px)] overflow-y-auto">
              {filteredPlaces.map(place => (
                <div
                  key={place.id}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {place.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {place.address}
                    </p>
                  </div>
                  <button
                    onClick={() => addPlace(place)}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <span className="text-gray-600 font-bold">+</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 선택된 장소 리스트 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">선택한 장소</h2>
          </div>

          <div className="p-4">
            {selectedPlaces.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">장소를 선택해주세요.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-500px)] overflow-y-auto">
                {selectedPlaces.map(place => (
                  <div
                    key={place.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {place.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {place.address}
                      </p>
                    </div>
                    <button
                      onClick={() => removePlace(place.id)}
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
          disabled={selectedPlaces.length === 0}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            selectedPlaces.length > 0
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          다음
        </button>
      </div>
    </Layout>
  );
}

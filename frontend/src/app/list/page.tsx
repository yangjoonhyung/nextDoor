'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

// 더미 데이터 타입 정의
interface Place {
  id: number;
  name: string;
  address: string;
  category: '음식점' | '관광지' | '문화시설';
}

export default function CartListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const router = useRouter();

  // 더미 장소 데이터
  const places: Place[] = [
    {
      id: 1,
      name: '해운대 해수욕장',
      address: '부산광역시 해운대구 우동',
      category: '관광지',
    },
    {
      id: 2,
      name: '감천문화마을',
      address: '부산광역시 사하구 감내2로 203',
      category: '관광지',
    },
    {
      id: 3,
      name: '부산타워',
      address: '부산광역시 중구 용두산길 37-55',
      category: '관광지',
    },
    {
      id: 4,
      name: '태종대',
      address: '부산광역시 영도구 전망로 24',
      category: '관광지',
    },
    {
      id: 5,
      name: '자갈치시장',
      address: '부산광역시 중구 자갈치로 52',
      category: '음식점',
    },
    {
      id: 6,
      name: '국제시장',
      address: '부산광역시 중구 중구로 26',
      category: '관광지',
    },
    {
      id: 7,
      name: '부산아쿠아리움',
      address: '부산광역시 해운대구 해운대해변로 266',
      category: '문화시설',
    },
    {
      id: 8,
      name: '부산시립미술관',
      address: '부산광역시 해운대구 APEC로 58',
      category: '문화시설',
    },
    {
      id: 9,
      name: '광안리 해수욕장',
      address: '부산광역시 수영구 광안동',
      category: '관광지',
    },
    {
      id: 10,
      name: '송도해상케이블카',
      address: '부산광역시 서구 송도해변로 171',
      category: '관광지',
    },
    {
      id: 11,
      name: '부산대학교',
      address: '부산광역시 금정구 부산대학로 63번길 2',
      category: '문화시설',
    },
    {
      id: 12,
      name: '동래온천',
      address: '부산광역시 동래구 온천동',
      category: '관광지',
    },
    {
      id: 13,
      name: '부산어촌민속관',
      address: '부산광역시 영도구 태종로 424',
      category: '문화시설',
    },
    {
      id: 14,
      name: '부산시민공원',
      address: '부산광역시 부산진구 시민공원로 73',
      category: '관광지',
    },
    {
      id: 15,
      name: '부산대교',
      address: '부산광역시 영도구와 중구를 연결',
      category: '관광지',
    },
  ];

  // 검색어와 카테고리에 따라 장소 필터링
  const filteredPlaces = places.filter(place => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === '전체' || place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
            <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-blue-600 font-medium">
              STEP 2 장소 선택
            </p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">STEP 3 경로 완성</p>
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

            {/* 카테고리 필터 */}
            <div className="mb-4">
              <div className="flex space-x-2">
                {['전체', '음식점', '관광지', '문화시설'].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 장소 목록 */}
            <div className="space-y-3 max-h-[calc(100vh-500px)] overflow-y-auto">
              {filteredPlaces.map(place => {
                const isSelected = selectedPlaces.some(p => p.id === place.id);
                return (
                  <div
                    key={place.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">
                          {place.name}
                        </h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {place.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {place.address}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        isSelected ? removePlace(place.id) : addPlace(place)
                      }
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {isSelected ? (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="text-gray-600 font-bold">+</span>
                      )}
                    </button>
                  </div>
                );
              })}
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
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">
                          {place.name}
                        </h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {place.category}
                        </span>
                      </div>
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

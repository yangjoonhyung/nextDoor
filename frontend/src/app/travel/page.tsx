'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 더미 데이터 타입 정의
interface TravelDestination {
  name: string;
  country: string;
  image: string;
}

export default function Travel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState<TravelDestination[]>([]);
  const router = useRouter();

  // 백엔드 API 연동을 위한 useEffect (나중에 구현)
  useEffect(() => {
    // 더미 데이터
    const dummyDestinations: TravelDestination[] = [
      {
        name: '서울',
        country: '대한민국 서울특별시',
        image: 'city',
      },
      {
        name: '부산',
        country: '대한민국 부산광역시',
        image: 'beach',
      },
      {
        name: '제주도',
        country: '대한민국 제주특별자치도',
        image: 'mountain',
      },
      {
        name: '경주',
        country: '대한민국 경상북도 경주시',
        image: 'temple',
      },
      {
        name: '전주',
        country: '대한민국 전라북도 전주시',
        image: 'traditional',
      },
      {
        name: '강릉',
        country: '대한민국 강원도 강릉시',
        image: 'beach',
      },
      {
        name: '여수',
        country: '대한민국 전라남도 여수시',
        image: 'beach',
      },
      {
        name: '안동',
        country: '대한민국 경상북도 안동시',
        image: 'traditional',
      },
    ];

    // fetch('/api/destinations')
    //   .then(res => res.json())
    //   .then(data => {
    //     setDestinations(data);
    //   });
    setDestinations(dummyDestinations);
  }, []);

  // 아이콘 렌더링 함수
  const renderIcon = (iconType: string) => {
    const iconClass = 'w-16 h-16 mx-auto';
    switch (iconType) {
      case 'city':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
          </svg>
        );
      case 'beach':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        );
      case 'mountain':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22l-9-12z" />
          </svg>
        );
      case 'temple':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case 'traditional':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
    }
  };

  // 여행지 클릭 시 cart 페이지로 이동하는 함수
  const handleDestinationClick = (destination: TravelDestination) => {
    const params = new URLSearchParams({
      destination: destination.name,
      country: destination.country,
    });
    router.push(`/cart?${params.toString()}`);
  };

  // 검색어에 따라 여행지 필터링
  const filteredDestinations = destinations.filter(
    destination =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 상단 타이틀 */}
        <h1 className="text-2xl font-bold text-center mt-8 mb-6">
          어디로 여행을 떠나시나요?
        </h1>

        {/* 검색창 */}
        <div className="flex justify-center mb-12">
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="지역명을 입력하세요"
              className="w-full rounded-md shadow-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
        </div>

        {/* 여행지 목록 */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((destination, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                  <div className="text-blue-600">
                    {renderIcon(destination.image)}
                  </div>
                  {/* Hover 시 나타나는 오버레이와 버튼 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center rounded-lg">
                    <button
                      onClick={() => handleDestinationClick(destination)}
                      className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-lg"
                    >
                      일정만들기
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mt-2 text-lg">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-500">{destination.country}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              &ldquo;{searchQuery}&rdquo;에 대한 검색 결과가 없습니다.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              다른 검색어를 시도해보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
        name: 'Seoul',
        country: '대한민국 서울',
        image: '/main-illustration.png',
      },
      {
        name: 'Tokyo',
        country: '일본 도쿄',
        image: '/main-illustration.png',
      },
      {
        name: 'Paris',
        country: '프랑스 파리',
        image: '/main-illustration.png',
      },
      {
        name: 'New York',
        country: '미국 뉴욕',
        image: '/main-illustration.png',
      },
      {
        name: 'London',
        country: '영국 런던',
        image: '/main-illustration.png',
      },
      {
        name: 'Bangkok',
        country: '태국 방콕',
        image: '/main-illustration.png',
      },
      {
        name: 'Sydney',
        country: '호주 시드니',
        image: '/main-illustration.png',
      },
      {
        name: 'Dubai',
        country: 'UAE 두바이',
        image: '/main-illustration.png',
      },
    ];

    // fetch('/api/destinations')
    //   .then(res => res.json())
    //   .then(data => {
    //     setDestinations(data);
    //   });
    setDestinations(dummyDestinations);
  }, []);

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
                <div className="relative h-48">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover 시 나타나는 오버레이와 버튼 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
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

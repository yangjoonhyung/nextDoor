'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

interface RouteItem {
  day: number;
  items: string[];
}

interface DummyRoutes {
  [key: number]: RouteItem[];
}

export default function ConfirmPage() {
  const [activeRoute, setActiveRoute] = useState<number>(1);

  // 더미 경로 데이터
  const dummyRoutes: DummyRoutes = {
    1: [
      { day: 1, items: ['해운대 해수욕장', '부산타워', '자갈치시장'] },
      { day: 2, items: ['감천문화마을', '태종대', '국제시장'] },
      {
        day: 3,
        items: ['광안리 해수욕장', '송도해상케이블카', '부산아쿠아리움'],
      },
    ],
    2: [
      { day: 1, items: ['부산타워', '자갈치시장', '국제시장'] },
      {
        day: 2,
        items: ['해운대 해수욕장', '부산시립미술관', '부산어촌민속관'],
      },
      { day: 3, items: ['감천문화마을', '태종대', '광안리 해수욕장'] },
    ],
    3: [
      { day: 1, items: ['태종대', '송도해상케이블카', '부산대교'] },
      { day: 2, items: ['감천문화마을', '해운대 해수욕장', '부산타워'] },
      { day: 3, items: ['자갈치시장', '국제시장', '광안리 해수욕장'] },
    ],
  };

  // 저장 함수 (나중에 API 연동용)
  const onSave = () => {
    console.log('선택된 경로 저장:', activeRoute);
    // TODO: 실제 API 호출 구현
  };

  return (
    <Layout>
      {/* 상단 정보 */}
      <div className="mb-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">부산</h1>
          <p className="text-gray-600">2025.09.19(금) - 2025.09.26(금)</p>
        </div>

        {/* 완성 메시지 */}
        <div className="text-center py-4">
          <div className="inline-flex items-center px-6 py-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
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
            </div>
            <span className="text-green-700 font-medium text-lg">
              경로가 완성되었습니다!
            </span>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)]">
        {/* 왼쪽: 경로 추천 목록 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              AI 추천 경로
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {[1, 2, 3].map(routeNum => (
                <button
                  key={routeNum}
                  onClick={() => setActiveRoute(routeNum)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                    activeRoute === routeNum
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">경로 추천 {routeNum}</span>
                    {activeRoute === routeNum && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {dummyRoutes[routeNum].length}일 일정
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 선택된 경로 일정 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              경로 추천 {activeRoute} 일정
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-4 max-h-[calc(100vh-500px)] overflow-y-auto">
              {dummyRoutes[activeRoute].map(route => (
                <div
                  key={route.day}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Day {route.day}
                  </h3>
                  <div className="space-y-2">
                    {route.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 bg-gray-50 rounded-md"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 저장 버튼 */}
      <div className="flex justify-end mt-6 mb-20 bg-gray-50">
        <button
          onClick={onSave}
          className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          저장
        </button>
      </div>
    </Layout>
  );
}

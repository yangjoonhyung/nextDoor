'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiConfig } from '@/utils/api';

export default function CartClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    const destination = searchParams.get('destination');
    const country = searchParams.get('country');
    const tripPlanId = searchParams.get('tripPlanId');

    if (destination && country) {
      setSelectedDestination({ name: decodeURIComponent(destination), country: decodeURIComponent(country) });
    }

    if (tripPlanId) console.log('TripPlan ID:', tripPlanId);
  }, [searchParams]);

  const handleDateChange = (type, value) => {
    type === 'start' ? setStartDate(value) : setEndDate(value);
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) alert('날짜 선택 필요');
    setIsLoading(true);
    const tripPlanId = searchParams.get('tripPlanId');
    const formData = new FormData();
    const start = new Date(startDate);
    const finish = new Date(endDate);
    formData.append('startYear', start.getFullYear().toString());
    formData.append('startMonth', (start.getMonth() + 1).toString());
    formData.append('startDay', start.getDate().toString());
    formData.append('finishYear', finish.getFullYear().toString());
    formData.append('finishMonth', (finish.getMonth() + 1).toString());
    formData.append('finishDay', finish.getDate().toString());

    try {
      const response = await fetch(`${apiConfig.baseUrl}/cart/${tripPlanId}`, { method: 'POST', credentials: apiConfig.credentials, body: formData });
      if (response.ok) router.push(`/list/${tripPlanId}`);
      else alert('저장실패');
    } catch {
      alert('통신오류');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* 페이지 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            여행 기간을 선택하세요
          </h1>
          {selectedDestination ? (
            <div className="mb-4">
              <p className="text-lg text-blue-600 font-medium">
                {selectedDestination.name}, {selectedDestination.country}
              </p>
              <p className="text-gray-600">
                여행의 시작 날짜와 끝 날짜를 선택해주세요
              </p>
            </div>
          ) : (
            <p className="text-gray-600">
              여행의 시작 날짜와 끝 날짜를 선택해주세요
            </p>
          )}
        </div>

        {/* 날짜 선택 폼 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 시작 날짜 */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                시작 날짜
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={e => handleDateChange('start', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                required
              />
            </div>

            {/* 끝 날짜 */}
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                끝 날짜
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={e => handleDateChange('end', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* 선택된 날짜 표시 */}
          {(startDate || endDate) && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                선택된 여행 기간
              </h3>
              <div className="text-sm text-blue-700">
                {startDate && (
                  <p>시작: {new Date(startDate).toLocaleDateString('ko-KR')}</p>
                )}
                {endDate && (
                  <p>끝: {new Date(endDate).toLocaleDateString('ko-KR')}</p>
                )}
                {startDate && endDate && (
                  <p className="font-medium mt-1">
                    총{' '}
                    {Math.ceil(
                      (new Date(endDate).getTime() -
                        new Date(startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) + 1}
                    일
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 선택 버튼 */}
          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              disabled={!startDate || !endDate || isLoading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? '처리 중...' : '선택'}
            </button>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>선택한 여행 기간은 장바구니에 저장됩니다.</p>
        </div>
      </div>
    </div>
  );
}

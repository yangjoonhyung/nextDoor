'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiConfig } from '@/utils/api';

export default function CartPage() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<{
    name: string;
    country: string;
  } | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const destination = searchParams.get('destination');
    const country = searchParams.get('country');

    if (destination && country) {
      setSelectedDestination({
        name: decodeURIComponent(destination),
        country: decodeURIComponent(country),
      });
    }
  }, [searchParams]);

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert('시작 날짜와 끝 날짜를 모두 선택해주세요.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert('시작 날짜는 끝 날짜보다 이전이어야 합니다.');
      return;
    }

    // 날짜를 Date 객체로 변환하여 연, 월, 일 추출
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const startYear = startDateObj.getFullYear();
    const startMonth = startDateObj.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const startDay = startDateObj.getDate();

    const finishYear = endDateObj.getFullYear();
    const finishMonth = endDateObj.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const finishDay = endDateObj.getDate();

    // tripPlanId 가져오기 (URL 파라미터에서 또는 새로 생성)
    const tripPlanId = searchParams.get('tripPlanId') || Date.now().toString();

    // 백엔드로 데이터 전송
    await sendPlanToBackend(
      startYear,
      startMonth,
      startDay,
      finishYear,
      finishMonth,
      finishDay,
      tripPlanId
    );
  };

  const sendPlanToBackend = async (
    startYear: number,
    startMonth: number,
    startDay: number,
    finishYear: number,
    finishMonth: number,
    finishDay: number,
    tripPlanId: string
  ) => {
    setIsLoading(true);

    try {
      // POST 요청 본문에 데이터 전달
      const formData = new FormData();
      formData.append('startYear', startYear.toString());
      formData.append('startMonth', startMonth.toString());
      formData.append('startDay', startDay.toString());
      formData.append('finishYear', finishYear.toString());
      formData.append('finishMonth', finishMonth.toString());
      formData.append('finishDay', finishDay.toString());
      formData.append('destination', selectedDestination?.name || '서울');

      const response = await fetch(
        `${apiConfig.baseUrl}/cart/${tripPlanId}`,
        {
          method: 'POST',
          body: formData,
          credentials: apiConfig.credentials,
        }
      );

      if (response.ok) {
        const responseText = await response.text();
        try {
          const data = JSON.parse(responseText);
          if (data.success) {
            console.log('여행 계획이 성공적으로 저장되었습니다.');
            alert('여행 기간이 설정되었습니다!');
            // 백엔드에서 반환된 실제 tripPlanId 사용
            const actualTripPlanId = data.tripPlanId || tripPlanId;
            router.push(`/list?tripPlanId=${actualTripPlanId}&type=전체`);
          } else {
            alert(data.error || '여행 기간 설정에 실패했습니다.');
          }
        } catch (parseError) {
          // JSON 파싱 실패 시 기존 로직 사용
          if (responseText === 'success') {
            console.log('여행 계획이 성공적으로 저장되었습니다.');
            alert('여행 기간이 설정되었습니다!');
            router.push(`/list?tripPlanId=${tripPlanId}&type=전체`);
          } else {
            alert(responseText);
          }
        }
      } else {
        const errorText = await response.text();
        console.error('여행 계획 저장 실패:', errorText);
        alert(errorText || '여행 기간 설정에 실패했습니다.');
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
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
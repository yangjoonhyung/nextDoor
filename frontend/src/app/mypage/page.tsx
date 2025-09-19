'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [nickname, setNickname] = useState('');
  const router = useRouter();
  const { isLoggedIn, isLoading, requireAuth } = useAuth();

  // 로그인 상태 확인
  useEffect(() => {
    if (!isLoading) {
      requireAuth();
    }
  }, [isLoading, requireAuth]);

  // 랜덤 닉네임 생성
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 10000);
    setNickname(`user${randomNumber}`);
  }, []);

  // 백엔드 API 연동을 위한 useEffect (나중에 구현)
  useEffect(() => {
    // fetch('/api/user/schedule')
    //   .then(res => res.json())
    //   .then(data => {
    //     // 일정 데이터 처리
    //   });
  }, []);

  // 로딩 중이거나 로그인되지 않은 경우 로딩 화면 표시
  if (isLoading || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로그인 상태를 확인하는 중...</p>
        </div>
      </div>
    );
  }

  // 프로필 관리 페이지로 이동
  const handleProfileManagement = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 배너 */}
      <div className="h-48 bg-[#63CDFF]"></div>

      {/* 프로필 영역 */}
      <div className="relative -mt-16 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* 원형 프로필 이미지 */}
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                <Image
                  src="/user-icon.svg"
                  alt="프로필"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{nickname}</h2>
                <p className="text-gray-600">NextDoor 사용자</p>
              </div>
            </div>
            {/* 프로필 관리 버튼 */}
            <button
              onClick={handleProfileManagement}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              프로필 관리
            </button>
          </div>
        </div>
      </div>

      {/* 탭 영역 */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'schedule'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              나의 일정
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'posts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              나의 게시글
            </button>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="p-6">
            {activeTab === 'schedule' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  나의 일정
                </h3>
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/calendar-icon.svg"
                      alt="일정"
                      width={64}
                      height={64}
                      className="w-16 h-16 text-gray-400"
                    />
                  </div>
                  <p className="text-gray-600 text-lg">아직 일정이 없습니다</p>
                  <p className="text-gray-500 text-sm mt-2">
                    새로운 여행 계획을 세워보세요!
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  나의 게시글
                </h3>
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/post-icon.svg"
                      alt="게시글"
                      width={64}
                      height={64}
                      className="w-16 h-16 text-gray-400"
                    />
                  </div>
                  <p className="text-gray-600 text-lg">
                    아직 작성한 게시글이 없습니다
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    첫 번째 여행 후기를 작성해보세요!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

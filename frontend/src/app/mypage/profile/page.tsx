'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

export default function ProfilePage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleBack = () => {
    // 마이페이지로 돌아가기
    window.history.back();
  };

  const handleSave = () => {
    // 프로필 저장 로직 (나중에 API 연동)
    console.log('프로필 저장:', { nickname, email });
    alert('프로필이 저장되었습니다.');
  };

  const handleDeleteAccount = () => {
    // 회원탈퇴 로직 (나중에 API 연동)
    if (confirm('정말로 회원탈퇴를 하시겠습니까?')) {
      console.log('회원탈퇴');
      alert('회원탈퇴가 완료되었습니다.');
    }
  };

  const handleCheckDuplicate = () => {
    // 닉네임 중복 확인 로직 (나중에 API 연동)
    console.log('닉네임 중복 확인:', nickname);
    alert('사용 가능한 닉네임입니다.');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="w-1/2 bg-white rounded-lg shadow-md p-6 mx-auto">
          {/* 제목 */}
          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            프로필 설정
          </h1>

          {/* 닉네임 입력 필드 */}
          <div className="mb-4">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              닉네임
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="닉네임을 입력하세요"
              />
              <button
                onClick={handleCheckDuplicate}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm whitespace-nowrap"
              >
                중복 확인
              </button>
            </div>
          </div>

          {/* 이메일 입력 필드 */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="이메일을 입력하세요"
            />
          </div>

          {/* 회원 탈퇴 텍스트 */}
          <div className="text-center mb-6">
            <button
              onClick={handleDeleteAccount}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              회원 탈퇴
            </button>
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              돌아가기
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-sky-400 text-white rounded-md hover:bg-sky-500"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* eslint-disable prettier/prettier */
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FindPassword() {
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    // 입력값 검증
    if (!userId.trim()) {
      setResult({
        success: false,
        message: '아이디를 입력해주세요.',
      });
      setIsLoading(false);
      return;
    }

    if (!newPassword.trim()) {
      setResult({
        success: false,
        message: '새로운 비밀번호를 입력해주세요.',
      });
      setIsLoading(false);
      return;
    }

    if (newPassword !== checkPassword) {
      setResult({
        success: false,
        message: '비밀번호가 일치하지 않습니다.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/users/${userId}/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: newPassword,
          checkPassword: checkPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          success: true,
          message: data.message || '비밀번호가 성공적으로 변경되었습니다.',
        });
        // 성공 시 폼 초기화
        setUserId('');
        setNewPassword('');
        setCheckPassword('');
      } else {
        setResult({
          success: false,
          message: data.message || '비밀번호 변경에 실패했습니다.',
        });
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      setResult({
        success: false,
        message: '서버와의 통신 중 오류가 발생했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        {/* 로고 */}
        <img
          src="/logo.png"
          alt="NextDoor Logo"
          width="160"
          className="mx-auto mb-6"
        />

        {/* 비밀번호 재설정 폼 */}
        <form onSubmit={handleResetPassword} className="space-y-4">
          {/* 제목 */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            비밀번호 재설정
          </h2>

          {/* 아이디 입력창 */}
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 새로운 비밀번호 입력창 */}
          <input
            type="password"
            placeholder="새로운 비밀번호"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 새로운 비밀번호 확인 입력창 */}
          <input
            type="password"
            placeholder="새로운 비밀번호 확인"
            value={checkPassword}
            onChange={e => setCheckPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 결과 메시지 표시 */}
          {result && (
            <div
              className={`p-3 rounded-lg text-center ${
                result.success
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              <p>{result.message}</p>
            </div>
          )}

          {/* 비밀번호 재설정 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#63CDFF] hover:bg-sky-400 disabled:bg-gray-400 text-white py-3 rounded-lg transition-colors font-medium"
          >
            {isLoading ? '변경 중...' : '비밀번호 재설정'}
          </button>

          {/* 로그인 페이지로 돌아가기 */}
          <div className="text-center">
            <Link href="/login" className="text-blue-600 hover:underline">
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

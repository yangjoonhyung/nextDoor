/* eslint-disable prettier/prettier */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiConfig } from '@/utils/api';

export default function FindId() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    userId?: string;
  } | null>(null);

  const handleFindId = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${apiConfig.baseUrl}/api/users/findId`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          success: true,
          message: '아이디를 찾았습니다!',
          userId: data.userId,
        });
      } else {
        setResult({
          success: false,
          message: data.message || '아이디 찾기에 실패했습니다.',
        });
      }
    } catch (error) {
      console.error('아이디 찾기 오류:', error);
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

        {/* 아이디 찾기 폼 */}
        <form onSubmit={handleFindId} className="space-y-4">
          {/* 제목 */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            아이디 찾기
          </h2>

          {/* 이름 입력창 */}
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 이메일 입력창 */}
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
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
              {result.success ? (
                <div>
                  <p className="font-medium">{result.message}</p>
                  <p className="text-lg font-bold mt-2">아이디: {result.userId}</p>
                </div>
              ) : (
                <p>{result.message}</p>
              )}
            </div>
          )}

          {/* 아이디 찾기 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#63CDFF] hover:bg-sky-400 disabled:bg-gray-400 text-white py-3 rounded-lg transition-colors font-medium"
          >
            {isLoading ? '찾는 중...' : '아이디 찾기'}
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

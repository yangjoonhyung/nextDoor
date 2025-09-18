'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8081/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 세션 쿠키를 포함하여 요청
        body: JSON.stringify({
          userId: userId,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // 로그인 성공 시 메인 페이지로 이동
        router.push('/');
      } else {
        // 로그인 실패 시 오류 메시지 표시
        setErrorMessage(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setErrorMessage('서버와의 통신 중 오류가 발생했습니다.');
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

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* 아이디 입력창 */}
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 비밀번호 입력창 */}
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 오류 메시지 표시 */}
          {errorMessage && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* 아이디/비밀번호 찾기 링크 */}
          <div className="flex justify-between">
            <Link
              href="/find-id"
              className="text-sm text-gray-500 hover:underline"
            >
              아이디 찾기
            </Link>
            <Link
              href="/find-password"
              className="text-sm text-gray-500 hover:underline"
            >
              비밀번호 찾기
            </Link>
          </div>

          {/* 로그인 버튼 */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#63CDFF] hover:bg-sky-400 disabled:bg-gray-400 text-white py-3 rounded-lg transition-colors font-medium"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>

          {/* 회원가입 링크 */}
          <div className="text-center">
            <span className="text-gray-500">아직 회원이 아니세요? </span>
            <Link href="/signup" className="text-blue-600 hover:underline">
              회원가입하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

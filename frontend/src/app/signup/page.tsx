'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userId: '',
    password: '',
    checkPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
  const [duplicateCheckResult, setDuplicateCheckResult] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // 입력값이 변경되면 중복 확인 결과 초기화
    if (name === 'userId') {
      setDuplicateCheckResult('');
    }
  };

  const checkDuplicateId = async () => {
    if (!formData.userId.trim()) {
      setDuplicateCheckResult('아이디를 입력해주세요.');
      return;
    }

    setIsCheckingDuplicate(true);
    try {
      const response = await fetch(
        `http://localhost:8081/api/users/check-duplicate-id?userId=${formData.userId}`
      );
      const data = await response.json();

      if (data.errorMessage) {
        setDuplicateCheckResult(data.errorMessage);
      } else {
        setDuplicateCheckResult(data.successMessage);
      }
    } catch (error) {
      console.error('중복 확인 오류:', error);
      setDuplicateCheckResult('서버와의 통신 중 오류가 발생했습니다.');
    } finally {
      setIsCheckingDuplicate(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // 비밀번호 확인
    if (formData.password !== formData.checkPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    // 중복 확인 체크
    if (!duplicateCheckResult.includes('사용 가능한')) {
      setErrorMessage('아이디 중복 확인을 해주세요.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/users/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(
          '회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.'
        );
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setErrorMessage(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
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

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 제목 */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">회원가입</h2>

          {/* 이름 입력창 */}
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 이메일 입력창 */}
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 아이디 입력창 + 중복 버튼 */}
          <div className="flex">
            <input
              type="text"
              name="userId"
              placeholder="아이디"
              value={formData.userId}
              onChange={handleInputChange}
              required
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
            />
            <button
              type="button"
              onClick={checkDuplicateId}
              disabled={isCheckingDuplicate}
              className="ml-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
            >
              {isCheckingDuplicate ? '확인중...' : '중복'}
            </button>
          </div>

          {/* 중복 확인 결과 */}
          {duplicateCheckResult && (
            <div
              className={`text-sm ${
                duplicateCheckResult.includes('사용 가능한')
                  ? 'text-green-600'
                  : 'text-red-500'
              }`}
            >
              {duplicateCheckResult}
            </div>
          )}

          {/* 비밀번호 입력창 */}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 비밀번호 확인 입력창 */}
          <input
            type="password"
            name="checkPassword"
            placeholder="비밀번호 확인"
            value={formData.checkPassword}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
          />

          {/* 오류 메시지 표시 */}
          {errorMessage && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* 성공 메시지 표시 */}
          {successMessage && (
            <div className="text-green-600 text-sm text-center bg-green-50 p-2 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4FC3F7] hover:bg-sky-500 disabled:bg-gray-400 text-white py-3 rounded-lg transition-colors font-medium"
          >
            {isLoading ? '회원가입 중...' : '회원가입'}
          </button>

          {/* 로그인 링크 */}
          <div className="text-center">
            <span className="text-gray-500">이미 계정이 있으신가요? </span>
            <Link href="/login" className="text-blue-600 hover:underline">
              로그인하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

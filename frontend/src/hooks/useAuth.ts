'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/users', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(!!data.currentUserId);
        setCurrentUserId(data.currentUserId);
      }
    } catch (error) {
      console.error('로그인 상태 확인 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requireAuth = () => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
      return false;
    }
    return true;
  };

  return {
    isLoggedIn,
    currentUserId,
    isLoading,
    checkLoginStatus,
    requireAuth,
  };
};

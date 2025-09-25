// API URL 설정을 위한 유틸리티 함수
export const getApiUrl = () => {
  // 서버에서는 항상 EC2 서버의 퍼블릭 IP를 사용
  return 'http://localhost:8081';
};

// API 호출을 위한 기본 설정
export const apiConfig = {
  baseUrl: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include' as RequestCredentials,
};

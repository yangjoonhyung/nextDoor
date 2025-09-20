// API URL 설정을 위한 유틸리티 함수
export const getApiUrl = () => {
  // 프로덕션 환경에서는 EC2 서버의 퍼블릭 IP를 사용
  if (process.env.NODE_ENV === 'production') {
    // EC2 서버의 퍼블릭 IP: 52.79.86.135
    return 'http://52.79.86.135:8081';
  }
  
  // 개발 환경에서는 localhost 사용
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

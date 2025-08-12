import axios from 'axios';

// API 기본 URL 설정 - Skills Up 프로덕션/개발 환경 지원
// 버전 1.0.0 - Skills Up 리포지토리용 - 2025.01.12
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://skills-up-mkg6.onrender.com/api'
    : 'http://localhost:5003/api');

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30초 타임아웃 (Render 프리 플랜 고려)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 추가 및 개발 환경 디버그 로깅
api.interceptors.request.use(
  (config) => {
    // 개발 환경에서만 상세 로깅
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API 요청:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        fullURL: `${config.baseURL}${config.url}`
      });
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('🚫 API 요청 오류:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 오류 처리 및 토큰 만료 처리
api.interceptors.response.use(
  (response) => {
    // 개발 환경에서만 상세 로깅
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API 응답 성공:', {
        status: response.status,
        url: response.config.url,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    console.error('❌ API 응답 오류:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    
    // 401 또는 403 상태 시 토큰 만료 처리
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // 현재 페이지가 인증 관련이 아닌 경우에만 리다이렉트
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    
    return Promise.reject(error);
  }
);

// API 에러 처리 헬퍼 함수
export const handleApiError = (error: any): string => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error.code === 'NETWORK_ERROR') {
    return '네트워크 연결을 확인해주세요.';
  }
  
  if (error.code === 'TIMEOUT') {
    return '요청 시간이 초과되었습니다. 다시 시도해주세요.';
  }
  
  if (error.response?.status === 500) {
    return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
  
  return error.message || '알 수 없는 오류가 발생했습니다.';
};

export default api;
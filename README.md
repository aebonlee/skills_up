# 🚀 Skills Up Learning Platform

[![Deploy Status](https://github.com/aebonlee/skills_up/actions/workflows/deploy.yml/badge.svg)](https://github.com/aebonlee/skills_up/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7.svg)](https://render.com/)

**협력형 학습관리 플랫폼** - 학생의 학습 루틴, 독서, 활동을 기록·시각화하여 자기주도 학습을 지원하는 웹 서비스입니다.

## 🌐 Live Demo

| Service | URL | Status |
|---------|-----|---------|
| **🎨 Frontend** | [aebonlee.github.io/skills_up](https://aebonlee.github.io/skills_up) | [![Frontend](https://img.shields.io/website?url=https%3A%2F%2Faebonlee.github.io%2Fskills_up)](https://aebonlee.github.io/skills_up) |
| **🔧 Backend API** | [skills-up-mkg6.onrender.com](https://skills-up-mkg6.onrender.com) | [![Backend](https://img.shields.io/website?url=https%3A%2F%2Fskills-up-mkg6.onrender.com%2Fapi%2Fhealth)](https://skills-up-mkg6.onrender.com/api/health) |

## ✨ 주요 기능

- 📚 **학습시간 기록** - 과목별/일일 통계 시각화
- 📖 **독서 기록** - 카테고리별/월별 분석  
- 🏆 **활동 기록** - 입상/프로젝트/자격증 관리
- 📊 **종합 대시보드** - 통합 성장 분석
- 🔐 **안전한 인증** - JWT 기반 사용자 관리
- 📱 **반응형 디자인** - 모든 기기 지원

## 🛠 기술 스택

### Frontend
- **React 19** + **TypeScript** + **Tailwind CSS**
- **Chart.js** - 인터랙티브 데이터 시각화
- **React Router** - 클라이언트 사이드 라우팅
- **Axios** - HTTP 클라이언트

### Backend
- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** (프로덕션) / **SQLite** (개발)
- **JWT Authentication** + **bcrypt**
- **Helmet** + **Rate Limiting** - 보안 강화

### DevOps
- **GitHub Actions** - 자동 CI/CD
- **GitHub Pages** - 프론트엔드 배포
- **Render** - 백엔드 + 데이터베이스 배포

## 🚀 빠른 시작

### 개발 환경 설정

```bash
# 프로젝트 클론
git clone https://github.com/aebonlee/skills_up.git
cd skills_up

# 백엔드 실행
cd backend
npm install
npm run dev

# 새 터미널에서 프론트엔드 실행  
cd frontend
npm install
npm start
```

### 프로덕션 배포

```bash
# GitHub에 푸시하면 자동 배포
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main
```

## 📁 프로젝트 구조

```
skills_up/
├── frontend/          # React + TypeScript 프론트엔드
│   ├── src/
│   │   ├── components/    # 재사용 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트  
│   │   └── config/        # API 설정
│   └── build/         # 빌드 출력
├── backend/           # Node.js + Express 백엔드
│   ├── server.js      # 메인 서버 파일
│   ├── database.js    # 데이터베이스 연결
│   └── package.json   # 의존성 관리
├── docs/              # 문서 및 가이드
└── .github/workflows/ # CI/CD 파이프라인
```

## 📝 API 문서

### 인증 API
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인

### 데이터 API  
- `GET/POST /api/study-records` - 학습 기록
- `GET/POST /api/reading-records` - 독서 기록
- `GET/POST /api/awards-activities` - 활동 기록
- `GET /api/stats/*` - 통계 데이터

> 📊 **API 상태**: [skills-up-mkg6.onrender.com/api/health](https://skills-up-mkg6.onrender.com/api/health)

## 🔧 환경 변수

```bash
# Backend (.env)
NODE_ENV=development
PORT=5003
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://...

# Frontend (빌드 시)
REACT_APP_API_URL=https://skills-up-mkg6.onrender.com/api
```

## 📈 성능 및 보안

- ⚡ **최적화**: 코드 스플리팅, 이미지 최적화, 캐싱
- 🛡️ **보안**: Helmet, Rate Limiting, CORS, JWT 인증
- 📊 **모니터링**: 구조화된 로깅, 에러 추적
- 🔄 **CI/CD**: 자동 테스트, 빌드, 배포

## 🤝 기여하기

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.

## 📞 연락처

- **GitHub Issues**: 버그 리포트 및 기능 요청
- **Repository**: [github.com/aebonlee/skills_up](https://github.com/aebonlee/skills_up)

---

**Made with ❤️ by Skills Up Team**
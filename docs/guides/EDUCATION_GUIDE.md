# 📚 Skills Up 교육 가이드

> **Claude Code로 개발한 교육용 풀스택 웹 애플리케이션**  
> 학생과 강사를 위한 단계별 학습 가이드

## 🎓 교육 목표

이 프로젝트를 통해 학습할 수 있는 핵심 개념들:

### 1. Frontend Development (React + TypeScript)
- 🔹 React 함수형 컴포넌트와 Hooks
- 🔹 TypeScript를 활용한 타입 안전한 개발
- 🔹 상태 관리와 컴포넌트 통신
- 🔹 React Router를 통한 SPA 구현
- 🔹 Tailwind CSS를 활용한 반응형 디자인

### 2. Backend Development (Node.js + Express)
- 🔹 REST API 설계 및 구현
- 🔹 JWT 인증 시스템 구축
- 🔹 데이터베이스 연동 (SQLite/PostgreSQL)
- 🔹 CORS 및 보안 설정
- 🔹 에러 핸들링과 로깅

### 3. Full Stack Integration
- 🔹 Frontend-Backend 통신
- 🔹 환경별 설정 관리
- 🔹 API 설계 패턴
- 🔹 인증 토큰 관리

### 4. DevOps & Deployment
- 🔹 GitHub를 통한 버전 관리
- 🔹 GitHub Pages 배포
- 🔹 Render 클라우드 배포
- 🔹 환경 변수 관리

## 🛣️ 학습 로드맵

### Phase 1: 기초 이해 (2-3주)
1. **프로젝트 구조 파악**
   - `frontend/` 와 `backend/` 디렉토리 탐색
   - 주요 파일들의 역할 이해
   - package.json 분석

2. **로컬 환경 설정**
   ```bash
   # 저장소 클론
   git clone https://github.com/aebonlee/skills_up.git
   cd skills_up
   
   # 백엔드 실행
   cd backend
   npm install
   npm run dev
   
   # 프론트엔드 실행 (새 터미널)
   cd frontend
   npm install
   npm start
   ```

3. **기본 기능 테스트**
   - 회원가입/로그인 기능 테스트
   - 학습 기록 추가/조회
   - 독서 기록 관리
   - 통계 대시보드 확인

### Phase 2: Frontend 심화 (3-4주)
1. **React 컴포넌트 분석**
   - `src/components/Auth.tsx` - 인증 UI 컴포넌트
   - `src/components/Navigation.tsx` - 네비게이션
   - `src/pages/` - 각 페이지 컴포넌트들

2. **상태 관리 이해**
   ```typescript
   // App.tsx에서 전역 상태 관리
   const [user, setUser] = useState<any>(null);
   const [token, setToken] = useState<string | null>(null);
   ```

3. **API 통신 패턴**
   ```typescript
   // src/config/api.ts
   import axios from 'axios';
   
   export const api = axios.create({
     baseURL: API_BASE_URL,
     timeout: 25000,
   });
   ```

4. **실습 과제**
   - 새로운 페이지 컴포넌트 추가
   - 커스텀 Hook 작성
   - 폼 유효성 검사 개선

### Phase 3: Backend 심화 (3-4주)
1. **Express 서버 구조**
   ```javascript
   // server.js 주요 구조
   const app = express();
   
   // 미들웨어 설정
   app.use(cors({...}));
   app.use(express.json());
   
   // 라우트 정의
   app.post('/api/auth/login', ...);
   app.get('/api/study-records', ...);
   ```

2. **데이터베이스 연동**
   ```javascript
   // database.js
   const sqlite3 = require('sqlite3').verbose();
   const db = new sqlite3.Database('stepup_cloud.db');
   ```

3. **JWT 인증 시스템**
   ```javascript
   // 토큰 생성
   const token = jwt.sign(
     { id: user.id, email: user.email }, 
     JWT_SECRET, 
     { expiresIn: '24h' }
   );
   
   // 토큰 검증 미들웨어
   function authenticateToken(req, res, next) {
     const token = req.headers['authorization']?.split(' ')[1];
     // 검증 로직...
   }
   ```

4. **실습 과제**
   - 새로운 API 엔드포인트 추가
   - 데이터 유효성 검사 구현
   - 에러 핸들링 개선

### Phase 4: 통합 및 배포 (2-3주)
1. **Full Stack 통합**
   - Frontend와 Backend 연동 테스트
   - 환경별 설정 관리
   - CORS 문제 해결

2. **배포 실습**
   - GitHub Pages 배포
   - Render 백엔드 배포
   - 환경 변수 설정

3. **최종 프로젝트**
   - 기능 확장
   - 사용자 경험 개선
   - 성능 최적화

## 🔬 실습 예제

### 1. 새로운 기능 추가하기
**목표**: "목표 설정" 기능 추가

#### Frontend 작업
```typescript
// src/pages/GoalsPage.tsx
import React, { useState } from 'react';
import { api } from '../config/api';

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = async () => {
    try {
      const response = await api.post('/api/goals', {
        title: newGoal,
        deadline: new Date()
      });
      setGoals([...goals, response.data]);
      setNewGoal('');
    } catch (error) {
      console.error('목표 추가 실패:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">학습 목표</h1>
      {/* UI 컴포넌트들... */}
    </div>
  );
};

export default GoalsPage;
```

#### Backend 작업
```javascript
// server.js에 추가
app.post('/api/goals', authenticateToken, (req, res) => {
  const { title, deadline } = req.body;
  
  db.run(
    'INSERT INTO goals (user_id, title, deadline) VALUES (?, ?, ?)',
    [req.user.id, title, deadline],
    function(err) {
      if (err) {
        return res.status(500).json({ error: '목표 저장 실패' });
      }
      res.json({ id: this.lastID, message: '목표가 저장되었습니다.' });
    }
  );
});

app.get('/api/goals', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: '목표를 불러올 수 없습니다.' });
      }
      res.json(rows);
    }
  );
});
```

### 2. 데이터베이스 스키마 확장
```sql
-- 목표 테이블 추가
CREATE TABLE goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  deadline DATE,
  completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 🧪 테스트 방법

### 1. 기능 테스트 체크리스트
- [ ] 회원가입이 정상 작동하는가?
- [ ] 로그인 후 토큰이 저장되는가?
- [ ] 학습 기록이 정확히 저장/조회되는가?
- [ ] 통계 데이터가 올바르게 계산되는가?
- [ ] 로그아웃이 정상 작동하는가?

### 2. API 테스트 예제
```bash
# 회원가입 테스트
curl -X POST http://localhost:5003/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"test123"}'

# 로그인 테스트
curl -X POST http://localhost:5003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"test123"}'

# 학습 기록 추가 (토큰 필요)
curl -X POST http://localhost:5003/api/study-records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "date": "2024-08-12",
    "subject": "웹개발",
    "book": "React 완벽 가이드",
    "minutes": 120
  }'
```

## 📝 과제 및 프로젝트 아이디어

### 초급 과제
1. **UI 개선**: 새로운 컬러 스킴 적용
2. **검증 강화**: 폼 입력 유효성 검사 개선
3. **반응형**: 모바일 UI 최적화

### 중급 과제
1. **새 기능**: 학습 목표 설정 기능 추가
2. **차트 확장**: 새로운 통계 차트 추가
3. **검색 기능**: 기록 검색 및 필터링

### 고급 과제
1. **실시간 기능**: WebSocket을 활용한 실시간 업데이트
2. **파일 업로드**: 이미지 첨부 기능
3. **소셜 기능**: 친구 추가 및 학습 공유

## 🤔 자주 묻는 질문

### Q1: 프로젝트를 수정하고 싶어요
A: Git을 사용해 브랜치를 생성하고 작업하세요:
```bash
git checkout -b feature/my-new-feature
# 작업 후
git add .
git commit -m "새 기능 추가"
git push origin feature/my-new-feature
```

### Q2: 데이터베이스가 초기화됐어요
A: SQLite 파일(`stepup_cloud.db`)이 삭제되면 자동으로 새로 생성됩니다. 
백업이 필요한 경우 해당 파일을 복사해 두세요.

### Q3: API 연결이 안 돼요
A: 
- 백엔드 서버가 실행 중인지 확인 (`http://localhost:5003/api/health`)
- CORS 설정이 올바른지 확인
- 네트워크 방화벽 설정 확인

### Q4: 배포 후 작동하지 않아요
A:
- 환경 변수가 올바르게 설정되었는지 확인
- API URL이 프로덕션 환경에 맞게 설정되었는지 확인
- 브라우저 개발자 도구에서 에러 메시지 확인

## 📚 추가 학습 자료

### 공식 문서
- [React 공식 문서](https://react.dev/)
- [Node.js 가이드](https://nodejs.org/en/docs/)
- [Express.js 문서](https://expressjs.com/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)

### 추천 학습 경로
1. **JavaScript ES6+** → 모던 자바스크립트 문법
2. **React Fundamentals** → 컴포넌트, State, Props
3. **TypeScript Basics** → 타입 시스템 이해
4. **Node.js & Express** → 백엔드 개발
5. **Database Design** → SQL 및 관계형 DB
6. **Deployment** → 클라우드 배포

---

🎯 **이 가이드를 통해 현대적인 웹 개발 스킬을 체계적으로 학습하시기 바랍니다!**

💡 **문의사항이나 개선사항이 있다면 GitHub Issues를 통해 알려주세요.**
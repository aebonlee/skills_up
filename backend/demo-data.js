const { db } = require('./database');
const bcrypt = require('bcryptjs');

/**
 * 교육용 데모 데이터 삽입 스크립트
 * Skills Up 플랫폼의 학습 예제를 위한 샘플 데이터
 */

async function insertDemoData() {
  console.log('🎓 교육용 데모 데이터 삽입을 시작합니다...');

  try {
    // 1. 데모 사용자 생성
    const demoUsers = [
      {
        email: 'student1@skillsup.com',
        password: await bcrypt.hash('demo123!', 10),
        name: '김학생'
      },
      {
        email: 'student2@skillsup.com', 
        password: await bcrypt.hash('demo123!', 10),
        name: '이공부'
      },
      {
        email: 'teacher@skillsup.com',
        password: await bcrypt.hash('teacher123!', 10),
        name: '박선생'
      }
    ];

    console.log('👥 데모 사용자 생성 중...');
    for (const user of demoUsers) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT OR REPLACE INTO users (email, password) VALUES (?, ?)',
          [user.email, user.password],
          function(err) {
            if (err) reject(err);
            else {
              console.log(`✅ 사용자 생성: ${user.email} (ID: ${this.lastID})`);
              resolve(this.lastID);
            }
          }
        );
      });
    }

    // 2. 학습 기록 데모 데이터
    const studyRecords = [
      // 김학생 (ID: 1) 학습 기록
      { user_id: 1, date: '2024-08-01', subject: '웹개발', book: 'React 완벽 가이드', minutes: 120 },
      { user_id: 1, date: '2024-08-02', subject: '웹개발', book: 'JavaScript ES6+', minutes: 90 },
      { user_id: 1, date: '2024-08-03', subject: '데이터베이스', book: 'SQL 첫걸음', minutes: 75 },
      { user_id: 1, date: '2024-08-04', subject: '웹개발', book: 'Node.js 교과서', minutes: 105 },
      { user_id: 1, date: '2024-08-05', subject: '알고리즘', book: '코딩 테스트 합격자', minutes: 150 },
      { user_id: 1, date: '2024-08-06', subject: '웹개발', book: 'TypeScript 핸드북', minutes: 95 },
      { user_id: 1, date: '2024-08-07', subject: '데이터베이스', book: 'MongoDB 실전 가이드', minutes: 80 },
      { user_id: 1, date: '2024-08-08', subject: '웹개발', book: 'React Native', minutes: 110 },
      { user_id: 1, date: '2024-08-09', subject: '알고리즘', book: '프로그래머스 문제집', minutes: 130 },
      { user_id: 1, date: '2024-08-10', subject: '웹개발', book: 'Vue.js 3 완벽 가이드', minutes: 85 },
      { user_id: 1, date: '2024-08-11', subject: 'DevOps', book: 'Docker & Kubernetes', minutes: 100 },
      { user_id: 1, date: '2024-08-12', subject: '웹개발', book: 'Full Stack 개발', minutes: 140 },

      // 이공부 (ID: 2) 학습 기록
      { user_id: 2, date: '2024-08-01', subject: 'AI/ML', book: '머신러닝 교과서', minutes: 180 },
      { user_id: 2, date: '2024-08-02', subject: 'Python', book: 'Python 완벽 가이드', minutes: 95 },
      { user_id: 2, date: '2024-08-03', subject: 'AI/ML', book: '딥러닝 첫걸음', minutes: 160 },
      { user_id: 2, date: '2024-08-04', subject: 'Python', book: 'NumPy & Pandas', minutes: 85 },
      { user_id: 2, date: '2024-08-05', subject: '데이터사이언스', book: '데이터 분석 실무', minutes: 120 },
      { user_id: 2, date: '2024-08-06', subject: 'AI/ML', book: 'TensorFlow 2.0', minutes: 140 },
      { user_id: 2, date: '2024-08-07', subject: '수학', book: '선형대수학', minutes: 90 },
      { user_id: 2, date: '2024-08-08', subject: 'AI/ML', book: 'PyTorch 실전', minutes: 155 },
      { user_id: 2, date: '2024-08-09', subject: '통계학', book: '비즈니스 통계학', minutes: 75 },
      { user_id: 2, date: '2024-08-10', subject: 'Python', book: 'FastAPI 완벽 가이드', minutes: 100 },
    ];

    console.log('📚 학습 기록 삽입 중...');
    for (const record of studyRecords) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO study_records (user_id, date, subject, book, minutes) VALUES (?, ?, ?, ?, ?)',
          [record.user_id, record.date, record.subject, record.book, record.minutes],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    }

    // 3. 독서 기록 데모 데이터
    const readingRecords = [
      // 김학생 독서 기록
      {
        user_id: 1,
        date: '2024-07-15',
        book_title: '클린 코드',
        review: '코드의 가독성과 유지보수성에 대해 많은 것을 배웠습니다. 특히 의미있는 변수명과 함수명의 중요성을 깨달았습니다.',
        category: '프로그래밍'
      },
      {
        user_id: 1,
        date: '2024-07-28',
        book_title: '실용주의 프로그래머',
        review: '소프트웨어 개발자로서 갖춰야 할 마음가짐과 실용적인 접근 방법을 제시하는 훌륭한 책입니다.',
        category: '프로그래밍'
      },
      {
        user_id: 1,
        date: '2024-08-05',
        book_title: '객체지향의 사실과 오해',
        review: '객체지향 프로그래밍의 본질에 대해 명확하게 이해할 수 있었습니다. 역할, 책임, 협력의 개념이 인상적이었습니다.',
        category: '프로그래밍'
      },
      {
        user_id: 1,
        date: '2024-08-10',
        book_title: '사피엔스',
        review: '인류 역사에 대한 새로운 관점을 제공하는 흥미진진한 책입니다. 특히 인지혁명 부분이 인상적이었습니다.',
        category: '인문학'
      },

      // 이공부 독서 기록
      {
        user_id: 2,
        date: '2024-07-20',
        book_title: '파이썬 머신러닝 완벽 가이드',
        review: '머신러닝의 기초부터 실전까지 체계적으로 학습할 수 있는 실용적인 책입니다. 실습 예제가 특히 도움이 되었습니다.',
        category: 'AI/ML'
      },
      {
        user_id: 2,
        date: '2024-08-01',
        book_title: '밑바닥부터 시작하는 딥러닝',
        review: '수학적 이론부터 구현까지 차근차근 설명되어 있어 딥러닝의 원리를 깊이 이해할 수 있었습니다.',
        category: 'AI/ML'
      },
      {
        user_id: 2,
        date: '2024-08-08',
        book_title: '통계의 힘',
        review: '데이터 분석에 필요한 통계적 사고방식을 기를 수 있는 좋은 책입니다. 실생활 예시가 많아 이해하기 쉬웠습니다.',
        category: '통계/수학'
      },

      // 박선생 독서 기록  
      {
        user_id: 3,
        date: '2024-07-25',
        book_title: '가르치는 기술',
        review: '효과적인 교육 방법론에 대한 실용적인 가이드입니다. 학생들의 학습 동기를 높이는 방법을 많이 배웠습니다.',
        category: '교육'
      },
      {
        user_id: 3,
        date: '2024-08-03',
        book_title: '디지털 교육의 미래',
        review: 'AI와 디지털 기술이 교육에 미치는 영향과 앞으로의 방향성에 대해 깊이 생각해볼 수 있는 책이었습니다.',
        category: '교육'
      }
    ];

    console.log('📖 독서 기록 삽입 중...');
    for (const record of readingRecords) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO reading_records (user_id, date, book_title, review, category) VALUES (?, ?, ?, ?, ?)',
          [record.user_id, record.date, record.book_title, record.review, record.category],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    }

    // 4. 활동/입상 기록 데모 데이터
    const awardsActivities = [
      // 김학생 활동 기록
      {
        user_id: 1,
        date: '2024-06-15',
        title: '해커톤 대회 참가',
        type: '대회',
        subject: '웹개발',
        hours: 24
      },
      {
        user_id: 1,
        date: '2024-07-01',
        title: 'React 개발자 자격증',
        type: '자격증',
        subject: '웹개발',
        hours: 0
      },
      {
        user_id: 1,
        date: '2024-07-20',
        title: '오픈소스 프로젝트 기여',
        type: '프로젝트',
        subject: '웹개발',
        hours: 50
      },
      {
        user_id: 1,
        date: '2024-08-01',
        title: 'JavaScript 스터디 리더',
        type: '스터디',
        subject: '웹개발',
        hours: 30
      },

      // 이공부 활동 기록
      {
        user_id: 2,
        date: '2024-06-10',
        title: 'AI 경진대회 2등',
        type: '입상',
        subject: 'AI/ML',
        hours: 80
      },
      {
        user_id: 2,
        date: '2024-07-05',
        title: 'TensorFlow 자격증',
        type: '자격증',
        subject: 'AI/ML',
        hours: 0
      },
      {
        user_id: 2,
        date: '2024-07-25',
        title: '데이터 분석 프로젝트',
        type: '프로젝트',
        subject: '데이터사이언스',
        hours: 120
      },
      {
        user_id: 2,
        date: '2024-08-10',
        title: '머신러닝 세미나 발표',
        type: '발표',
        subject: 'AI/ML',
        hours: 15
      },

      // 박선생 활동 기록
      {
        user_id: 3,
        date: '2024-05-20',
        title: '우수 교사상',
        type: '입상',
        subject: '교육',
        hours: 0
      },
      {
        user_id: 3,
        date: '2024-06-30',
        title: '디지털 교육 연수',
        type: '연수',
        subject: '교육',
        hours: 40
      },
      {
        user_id: 3,
        date: '2024-08-05',
        title: '교육과정 개발 프로젝트',
        type: '프로젝트',
        subject: '교육',
        hours: 60
      }
    ];

    console.log('🏆 활동/입상 기록 삽입 중...');
    for (const record of awardsActivities) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO awards_activities (user_id, date, title, type, subject, hours) VALUES (?, ?, ?, ?, ?, ?)',
          [record.user_id, record.date, record.title, record.type, record.subject, record.hours],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    }

    console.log('✅ 데모 데이터 삽입이 완료되었습니다!');
    console.log('\n🎯 테스트 계정 정보:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📚 학생 1: student1@skillsup.com / demo123!');
    console.log('🔬 학생 2: student2@skillsup.com / demo123!');
    console.log('👨‍🏫 선생님: teacher@skillsup.com / teacher123!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n💡 이제 웹사이트에 로그인하여 데모 데이터를 확인하실 수 있습니다.');
    
  } catch (error) {
    console.error('❌ 데모 데이터 삽입 중 오류 발생:', error);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  const { initializeDatabase } = require('./database');
  initializeDatabase();
  
  setTimeout(() => {
    insertDemoData().then(() => {
      process.exit(0);
    }).catch(err => {
      console.error('스크립트 실행 오류:', err);
      process.exit(1);
    });
  }, 1000);
}

module.exports = { insertDemoData };
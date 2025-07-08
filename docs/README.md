# OK배구단 추첨/관리 시스템

## 프로젝트 개요
OK배구단의 경기 신청자 관리, 추첨(핀볼 게임), 경기 등록/삭제 등 운영을 위한 관리자 웹 서비스입니다. React, Tailwind CSS 기반으로 제작되었으며, 신청자 추첨은 시각적 효과가 뛰어난 핀볼 게임으로 진행됩니다.

## 주요 기능
- 경기 등록/삭제/목록 관리
- 신청자 리스트 관리
- 핀볼 추첨(신청자 수만큼 공 등장, 1등 연출, 파티클 등 고품질 효과)
- 관리자 로그인/로그아웃
- 반응형 UI, 직관적 인터페이스

## 실행 방법
```bash
npm install
npm run dev
```

## 기술 스택
- React (Vite)
- TypeScript
- Tailwind CSS
- Supabase/REST API (신청자/경기 데이터)

## 폴더 구조
```
/ (루트)
├─ src/
│  ├─ pages/         # 주요 페이지 (Admin, Login, Events, Results 등)
│  ├─ components/    # 공통 컴포넌트 (Header, Sidebar, AdminLayout 등)
│  ├─ hooks/         # 커스텀 훅
│  ├─ lib/           # 유틸 함수
│  └─ ...
├─ public/           # 정적 파일, 이미지, 업로드 등
├─ docs/             # 문서 폴더 (이 파일 포함)
└─ ...
```

## 문의
- 담당자: okfngroup@naver.com 
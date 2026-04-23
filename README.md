# React Money Log
개인 자산 흐름 파악 및 리액트 숙련도 향상을 위한 가계부 프로젝트입니다.

* **배포 URL**: [https://money-log-85b1e.web.app/](https://money-log-85b1e.web.app/)
  > 💡 **Tip**: `Ctrl + 클릭`을 하시면 새 창에서 편하게 열어보실 수 있습니다.
* **CI/CD**: GitHub Actions를 통한 Firebase Hosting 자동 배포 시스템 구축

## 📸 Dashboard
<p align="center">
  <img src="https://github.com/user-attachments/assets/27db776f-3415-43cd-a5f9-f3e527777b0c" width="320" />
</p>

## 🚀 Key Features
* **차트 시각화**: `Recharts`를 이용한 카테고리별 지출 비율 출력
* **데이터 필터링**: 카테고리 선택 시 리스트 및 합계 실시간 업데이트
* **내림차순 정렬**: 지출 금액이 큰 순서대로 자동 정렬
* **자동 배포**: GitHub Push 발생 시 Firebase Hosting 실시간 반영
* **Tailwind v4**: 최신 스택 기반 유틸리티 스타일링 적용

## 🛠 Tech Stack
* **Framework**: React 18 (Vite)
* **Styling**: Tailwind CSS v4
* **Library**: Recharts
* **Backend/Hosting**: Firebase (Hosting, Firestore API 활성화 완료)
* **CI/CD**: GitHub Actions

## 📅 Roadmap
- [x] CRUD 및 로컬 스토리지 연동
- [x] Tailwind v4 마이그레이션 및 차트 UI 구현
- [x] Firebase Hosting 배포 및 CI/CD 구축
- [x] Firebase Firestore 연동 (Cloud DB 저장 완료) 🚀
- [x] 실시간 환율 API 연동 (KRW ↔ USDT 변환 시스템)
- [ ] 무한 스크롤 (Infinite Scroll) UI 구현  👈 Next!
- [ ] V1 배포 및 안정화
- **기한**: 2026년 8월

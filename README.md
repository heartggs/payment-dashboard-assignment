# 결제/가맹점 대시보드 (Brunch Payments 과제 전형)

Brunch Payments 채용 전형 과제로 구현한 **PG 결제/가맹점 대시보드**입니다.  
제공된 채용 전용 API(`https://recruit.paysbypays.com/api/v1`)를 사용하여  
결제 데이터·가맹점 데이터를 시각화하고, 대시보드 및 거래 내역 리스트 화면을 구성했습니다.

---

## 1. 프로젝트 개요

### 과제 요구사항 충족 내역

- 첫 대시보드 화면 구현  
- 거래 내역 리스트 화면 구현  
- 제공된 API 기반 결제/가맹점 데이터 시각화  
- PG 도메인(결제 상태, 결제 수단, 가맹점 정보 등)에 맞는 UI 구성  
- GET API 기반의 조회 기능만 사용

### 주요 기능 요약

- KPI 카드를 통한 오늘 결제 요약
- 일별 결제 추이(Line Chart)
- 결제 수단 분포(Pie Chart)
- 결제 상태 비율(Progress Bar)
- 업종별 거래량(Radar Chart)
- 매출 상위 가맹점 Top 5

---

## 2. 실행 방법

### Node 요구사항
- **Node.js 20.x LTS 필수 (예: 20.11.0, 20.15.0)**  
  → Next.js 16은 Node 20 이상에서 안정적으로 동작합니다.

### 설치 및 실행

```bash
npm install
npm run dev
```

### 환경 변수 설정

루트에 `.env.local` 파일을 생성하고 아래 값을 설정합니다.
```
API_BASE_URL=https://recruit.paysbypays.com/api/v1
NEXT_PUBLIC_API_BASE_URL=https://recruit.paysbypays.com/api/v1
```

---

## 3. 기술 스택

### Frontend

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**

### 스타일링 / UI

- **Tailwind CSS 4**
- **DaisyUI 5**
  - corporate 테마 기반, 일부 컬러 커스터마이징
  - 반응형 Drawer + 데스크톱 고정 사이드바 레이아웃 구성

### 차트 / 시각화

- **Recharts 3.5.0**
  - LineChart / PieChart / RadarChart 활용

### 데이터 처리

- **Axios**
  - API Base URL을 `.env.local`로 관리
  - 전용 API 서버로 직접 요청 수행

---

## 4. 주요 화면 구성

| 구성 요소 | 주요 기능 |
|-----------|-----------|
| **KPI Cards** | • 최근 거래일 기준 핵심 지표 요약<br>• 총 거래건수·금액 / 성공률 / 실패·취소 건수<br>• 전일 대비 증감 계산 |
| **DailyChart (일별 결제 추이)** | • 7일/30일 기간 선택<br>• 총금액 / 건수 / 성공·실패 금액 추이 |
| **PaymentMethodChart (결제수단 분포)** | • 카드 / 계좌 / 간편결제 비율 시각화 |
| **PaymentStatusProgress (결제 상태 비율)** | • SUCCESS / FAILED / CANCELLED / PENDING 비율<br>• `sr-only` 텍스트로 접근성 강화 |
| **MerchantCategoryRadarChart (업종별 거래량)** | • 카페 / 온라인몰 / 마트 등 업종별 거래량 |
| **TopMerchants (매출 상위 5개 가맹점)** | • 매출 합계 / 승인률 / 상태 뱃지 제공 |


---

## 5. 폴더 구조 요약

```bash
app/
├── components
│   ├── layout
│   │   ├── DashboardNavbar.tsx
│   │   ├── DashboardMain.tsx
│   │   ├── DashboardMainSection.tsx
│   │   ├── DashboardMainSkeleton.tsx
│   │   └── DashboardSidebar.tsx
│   ├── dashboard
│   │   ├── chartRenderers.tsx
│   │   ├── RecentPayments.tsx
│   │   ├── DailyChart.tsx
│   │   ├── PaymentStatusProgress.tsx
│   │   ├── PaymentMethodChart.tsx
│   │   ├── TopMerchants.tsx
│   │   ├── MerchantCategoryRadarChart.tsx
│   │   └── KpiCards.tsx
│   └── GlobalApiStatus.tsx
│
├── hooks
│   └── useGlobalApiStatus.ts
│
├── layout.tsx
├── lib
│   ├── types
│   │   ├── merchants.ts
│   │   ├── common.ts
│   │   └── payments.ts
│   └── api
│       └── apiClient.ts
│
├── api
│   ├── payments
│   │   └── list
│   │       └── route.ts
│   ├── merchants
│   │   ├── details
│   │   │   ├── [mchtCode]
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── list
│   │       └── route.ts
│   └── common
│       ├── mcht-status
│       │   └── all
│       │       └── route.ts
│       ├── payment-status
│       │   └── all
│       │       └── route.ts
│       └── paymemt-type
│           └── all
│               └── route.ts
│
├── loading.tsx
├── page.tsx
├── tree.txt
└── globals.css
```


## 6. 접근성 / 사용성 고려
- 각 섹션에 `sr-only` 텍스트를 추가하여 …  
- 색상뿐 아니라 텍스트 기반 상태 라벨 제공  
- 모바일 Drawer / 데스크톱 Sidebar UI로 반응형 환경 최적화  

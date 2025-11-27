import KpiCards from "../dashboard/KpiCards";
import DailyChart from "../dashboard/DailyChart";
import PaymentMethodChart from "../dashboard/PaymentMethodChart";
import PaymentStatusProgress from "../dashboard/PaymentStatusProgress";
import TopMerchants from "../dashboard/TopMerchants";
import MerchantCategoryRadarChart from "../dashboard/MerchantCategoryRadarChart";

import type { PaymentItem } from "@/lib/types/payments";
import type { MerchantSummary } from "@/lib/types/merchants";
import type { CommonResponse } from "@/lib/types/common";

type CommonCodeList = CommonResponse["data"];

type DashboardMainProps = {
  data: {
    payments: PaymentItem[];
    merchants: MerchantSummary[];
    paymentStatuses: CommonCodeList;
    paymentTypes: CommonCodeList;
    merchantStatuses: CommonCodeList;
  };
};

export default function DashboardMain({ data }: DashboardMainProps) {
  return (
    <div className="space-y-8">
      {/* 1. KPI 카드 */}
      <section
        className="card bg-white shadow-sm border border-base-300"
        aria-labelledby="dashboard-kpi-title"
      >
        <div
          className="card-body py-3"
          role="region"
          aria-labelledby="dashboard-kpi-title"
        >
          <h2 id="dashboard-kpi-title" className="sr-only">
            주요 결제 지표 요약
          </h2>
          <KpiCards payments={data.payments} />
        </div>
      </section>

      {/* 2. 상단 메인 영역: 일별 추이(좌 2) + 결제 분포(우 1) */}
      <section
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] gap-6"
        aria-labelledby="dashboard-trend-section-title"
      >
        <h2 id="dashboard-trend-section-title" className="sr-only">
          결제 추이 및 분포
        </h2>

        {/* 2-1. 일별 결제 추이 */}
        <article
          className="card bg-white shadow-sm border border-base-300"
          aria-labelledby="daily-chart-title"
          aria-describedby="daily-chart-desc"
        >
          <div
            className="card-body"
            role="region"
            aria-labelledby="daily-chart-title"
            aria-describedby="daily-chart-desc"
          >
            <h3 id="daily-chart-title" className="sr-only">
              일별 결제 추이
            </h3>
            <p id="daily-chart-desc" className="sr-only">
              최근 기간 동안의 일별 결제 금액과 건수 변화를 보여주는 선형
              차트입니다.
            </p>

            <DailyChart payments={data.payments} />
          </div>
        </article>

        {/* 2-2. 결제 분포 (우측, 위/아래 두 카드) */}
        <div className="flex flex-col gap-4">
          {/* 결제 수단 분포 */}
          <article
            className="card bg-white shadow-sm border border-base-300"
            aria-labelledby="payment-method-chart-title"
            aria-describedby="payment-method-chart-desc"
          >
            <div
              className="card-body"
              role="region"
              aria-labelledby="payment-method-chart-title"
              aria-describedby="payment-method-chart-desc"
            >
              <h3 id="payment-method-chart-title" className="sr-only">
                결제 수단 분포
              </h3>
              <p id="payment-method-chart-desc" className="sr-only">
                카드, 가상계좌, 정기결제 등 결제 수단별 비중을 보여주는
                차트입니다.
              </p>

              <PaymentMethodChart
                payments={data.payments}
                codes={data.paymentTypes}
              />
            </div>
          </article>

          {/* 결제 상태 진척 현황 (ProgressBar) */}
          <article
            className="card bg-white shadow-sm border border-base-300"
            aria-labelledby="payment-status-progress-title"
            aria-describedby="payment-status-progress-desc"
          >
            <div
              className="card-body"
              role="region"
              aria-labelledby="payment-status-progress-title"
              aria-describedby="payment-status-progress-desc"
            >
              <h3 id="payment-status-progress-title" className="sr-only">
                결제 상태 진척 현황
              </h3>
              <p id="payment-status-progress-desc" className="sr-only">
                전체 결제 중 성공, 실패, 취소, 대기 상태의 비율을 막대 형태로
                보여줍니다.
              </p>

              <PaymentStatusProgress payments={data.payments} />
            </div>
          </article>
        </div>
      </section>

      {/* 3. 하단: 가맹점 TOP5 + 가맹점 업종 레이더 차트 */}
      <section className="pb-4" aria-labelledby="merchant-recent-section-title">
        <h2 id="merchant-recent-section-title" className="sr-only">
          가맹점 및 결제 관련 요약
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] gap-6">
          {/* 3-1. 가맹점 업종 레이더 차트 */}
          <article
            className="card bg-white shadow-sm border border-base-300"
            aria-labelledby="merchant-category-radar-title"
            aria-describedby="merchant-category-radar-desc"
          >
            <div
              className="card-body p-4 sm:p-5 max-h-80 overflow-y-auto"
              role="region"
              aria-labelledby="merchant-category-radar-title"
              aria-describedby="merchant-category-radar-desc"
            >
              <h3 id="merchant-category-radar-title" className="sr-only">
                가맹점 업종별 매출 레이더 차트
              </h3>
              <p id="merchant-category-radar-desc" className="sr-only">
                가맹점 업종 카테고리별 매출 규모를 레이더 형태로 비교해서
                보여주는 차트입니다.
              </p>

              <MerchantCategoryRadarChart
                payments={data.payments}
                merchants={data.merchants}
              />
            </div>
          </article>

          {/* 3-2. 가맹점 TOP 5 */}
          <article
            className="card bg-white shadow-sm border border-base-300"
            aria-labelledby="top-merchants-title"
            aria-describedby="top-merchants-desc"
          >
            <div
              className="card-body p-4 sm:p-5"
              role="region"
              aria-labelledby="top-merchants-title"
              aria-describedby="top-merchants-desc"
            >
              <h3 id="top-merchants-title" className="sr-only">
                매출 상위 가맹점 Top 5
              </h3>
              <span id="top-merchants-desc" className="sr-only">
                최근 기간 기준으로 매출이 높은 상위 5개 가맹점 목록입니다.
              </span>

              <TopMerchants
                payments={data.payments}
                merchants={data.merchants}
              />
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

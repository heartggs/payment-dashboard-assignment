"use client";

import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";

import type { PaymentItem } from "@/lib/types/payments";
import type { MerchantSummary } from "@/lib/types/merchants";

type MerchantCategoryRadarChartProps = {
  payments: PaymentItem[];
  merchants: MerchantSummary[];
};

export default function MerchantCategoryRadarChart({
  payments,
  merchants,
}: MerchantCategoryRadarChartProps) {
  if (!payments.length) {
    return (
      <div className="text-sm text-base-content/60">
        업종별 통계를 보여줄 결제 데이터가 없습니다.
      </div>
    );
  }

  /** 1) 결제 최신순 정렬 후, 가장 최근 거래일(YYYY-MM-DD) 추출 */
  const sorted = [...payments].sort((a, b) =>
    b.paymentAt.localeCompare(a.paymentAt)
  );
  const latestDate = sorted[0]?.paymentAt.slice(0, 10);

  /** 2) 기준일(latestDate)의 결제만 사용 */
  const todays = sorted.filter((p) => p.paymentAt.startsWith(latestDate));

  if (!todays.length) {
    return (
      <div className="text-sm text-base-content/60">
        {latestDate} 기준 업종별 통계가 없습니다.
      </div>
    );
  }

  /** 3) 가맹점 코드 → 업종(bizType) 매핑 */
  const bizTypeMap = merchants.reduce<Record<string, string>>((acc, m) => {
    const code = m.mchtCode;
    if (!code || !m.bizType) return acc;
    acc[code] = m.bizType;
    return acc;
  }, {});

  /** 4) 업종별 거래 건수 집계 */
  const rawAgg = todays.reduce<Record<string, number>>((acc, p) => {
    const bizType = bizTypeMap[p.mchtCode];
    if (!bizType) return acc;

    acc[bizType] = (acc[bizType] ?? 0) + 1;
    return acc;
  }, {});

  /** 5) 업종 코드 → 라벨 매핑 */
  const bizLabel: Record<string, string> = {
    CAFE: "카페",
    SHOP: "온라인몰",
    MART: "마트",
    APP: "앱/구독",
    TRAVEL: "여행/예약",
    EDU: "교육",
    TEST: "테스트",
  };

  // 전체 업종 목록
  const allBizTypes = Object.keys(bizLabel);

  /** chartData 만들기 — 없는 업종은 0건으로 처리 */
  const chartData = allBizTypes.map((bizType) => ({
    bizType,
    label: bizLabel[bizType] ?? bizType,
    count: rawAgg[bizType] ?? 0,
  }));

  if (!chartData.length) {
    return (
      <div className="text-sm text-base-content/60">
        {latestDate} 기준 업종별 통계가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-sm">업종별 거래량 (건수 기준)</h3>
        <span className="text-[11px] text-base-content/60">
          기준일: {latestDate}
        </span>
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} outerRadius="80%">
            <PolarGrid />
            <PolarAngleAxis dataKey="label" />
            <PolarRadiusAxis />
            <Tooltip
              formatter={(value) => [`${value}건`, "거래 건수"]}
              labelFormatter={(label) => `${label}`}
            />
            <Radar
              name="거래 건수"
              dataKey="count"
              stroke="#4f46e5"
              fill="#4f46e5"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* 스크린리더용 텍스트 요약 */}
      <ul className="sr-only">
        {chartData.map((item) => (
          <li key={item.bizType}>
            {latestDate} 기준 {item.label}: {item.count}건
          </li>
        ))}
      </ul>
    </div>
  );
}

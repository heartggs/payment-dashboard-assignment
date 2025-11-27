"use client";

import { PaymentItem } from "@/lib/types/payments";

type Metrics = {
  count: number;
  amount: number;
  successRate: number;
  failedCount: number;
  cancelCount: number;
};

export default function KpiCards({ payments }: { payments: PaymentItem[] }) {
  if (!payments.length) {
    return (
      <div className="stats grid grid-cols-1 md:grid-cols-4 bg-white">
        <Card title="오늘 거래 건수" value="0 건" />
        <Card title="오늘 총 거래 금액" value="0원" />
        <Card title="성공률" value="0%" />
        <Card title="실패 / 취소" value="0 건" />
      </div>
    );
  }

  // 1) 날짜 목록 정리 (중복 제거 + 정렬)
  const uniqueDates = Array.from(
    new Set(payments.map((p) => p.paymentAt.slice(0, 10)))
  ).sort(); // 오름차순

  const latestDate = uniqueDates[uniqueDates.length - 1]; // 가장 최근
  const prevDate =
    uniqueDates.length > 1 ? uniqueDates[uniqueDates.length - 2] : null; // 전날(이전 데이터)

  // 2) 해당 날짜의 지표 계산
  const calcMetrics = (date: string): Metrics => {
    const list = payments.filter((p) => p.paymentAt.startsWith(date));
    const count = list.length;
    const amount = list.reduce((a, b) => a + Number(b.amount), 0);
    const successCount = list.filter((p) => p.status === "SUCCESS").length;
    const failedCount = list.filter((p) => p.status === "FAILED").length;
    const cancelCount = list.filter((p) => p.status === "CANCELLED").length;
    const successRate =
      count === 0 ? 0 : Math.round((successCount / count) * 100);

    return { count, amount, successRate, failedCount, cancelCount };
  };

  const today = calcMetrics(latestDate);
  const yesterday = prevDate ? calcMetrics(prevDate) : null;

  // 3) diff 계산 (어제 대비)
  const diff = (todayValue: number, y?: number) =>
    y == null ? null : todayValue - y;

  const countDiff = diff(today.count, yesterday?.count);
  const amountDiff = diff(today.amount, yesterday?.amount);
  const rateDiff = diff(today.successRate, yesterday?.successRate);

  const failedToday = payments.filter(
    (p) =>
      p.paymentAt.startsWith(latestDate) &&
      (p.status === "FAILED" || p.status === "CANCELLED")
  );
  const failedCount = failedToday.filter((p) => p.status === "FAILED").length;
  const cancelCount = failedToday.filter(
    (p) => p.status === "CANCELLED"
  ).length;

  // 4) 표시용 포맷터들
  const formatAmount = (n: number) => new Intl.NumberFormat().format(n) + "원";

  const formatSigned = (n: number, unit: string) => {
    if (n === 0) return "어제와 동일";
    const sign = n > 0 ? "+" : "-";
    const abs = Math.abs(n);
    return `어제 대비 ${sign}${abs}${unit}`;
  };

  const formatSignedAmount = (n: number) => {
    if (n === 0) return "어제와 동일";
    const sign = n > 0 ? "+" : "-";
    const abs = Math.abs(n);
    return `어제 대비 ${sign}${new Intl.NumberFormat().format(abs)}원`;
  };

  const trendClass = (n: number | null) => {
    if (n == null) return "text-base-content/60";
    if (n > 0) return "text-success";
    if (n < 0) return "text-error";
    return "text-base-content/60";
  };

  // 성공률 색상: 70% 이상 파랑, 아니면 빨강
  const successColor = today.successRate >= 70 ? "text-primary" : "text-error";

  return (
    <div className="stats grid grid-cols-1 md:grid-cols-4 bg-white">
      {/* 거래 건수 */}
      <Card
        title={`${latestDate} 거래 건수`}
        value={`${today.count} 건`}
        desc={
          yesterday ? (
            <span className={`text-xs ${trendClass(countDiff)}`}>
              {formatSigned(countDiff ?? 0, "건")}
            </span>
          ) : (
            <span className="text-xs text-base-content/60">
              이전 비교 데이터 없음
            </span>
          )
        }
      />

      {/* 총 거래 금액 */}
      <Card
        title={`${latestDate} 총 거래 금액`}
        value={formatAmount(today.amount)}
        desc={
          yesterday ? (
            <span className={`text-xs ${trendClass(amountDiff)}`}>
              {formatSignedAmount(amountDiff ?? 0)}
            </span>
          ) : (
            <span className="text-xs text-base-content/60">
              이전 비교 데이터 없음
            </span>
          )
        }
      />

      {/* 성공률 */}
      <Card
        title="성공률"
        value={`${today.successRate}%`}
        valueColor={successColor}
        desc={
          yesterday ? (
            <span className={`text-xs ${trendClass(rateDiff)}`}>
              {formatSigned(rateDiff ?? 0, "%")}
            </span>
          ) : (
            <span className="text-xs text-base-content/60">
              이전 비교 데이터 없음
            </span>
          )
        }
      />

      {/* 실패 / 취소 */}
      <Card
        title="실패 / 취소"
        value={`${failedCount + cancelCount} 건`}
        desc={
          <div className="flex gap-3 text-xs">
            <span className="text-error">{failedCount} 실패</span>
            <span className="text-warning">{cancelCount} 취소</span>
          </div>
        }
      />
    </div>
  );
}

function Card({
  title,
  value,
  valueColor = "text-neutral",
  desc,
}: {
  title: string;
  value: string | number;
  valueColor?: string;
  desc?: React.ReactNode;
}) {
  return (
    <div className="stat bg-white px-4 py-0">
      <dl>
        <dt className="stat-title text-xs text-base-content/60">{title}</dt>
        <dd className={`stat-value ${valueColor} text-xl`}>{value}</dd>

        {desc && (
          <dd className="stat-desc mt-1 text-xs text-base-content/60">
            {desc}
          </dd>
        )}
      </dl>
    </div>
  );
}

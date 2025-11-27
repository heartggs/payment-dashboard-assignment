"use client";

import type { PaymentItem } from "@/lib/types/payments";
import type { MerchantSummary } from "@/lib/types/merchants";

interface TopMerchantsProps {
  payments: PaymentItem[];
  merchants: MerchantSummary[];
}

type MerchantInfo = {
  name: string;
  bizType?: string;
  status?: string;
};

type MerchantAgg = {
  mchtCode: string;
  name: string;
  bizType?: string;
  status?: string;
  totalAmount: number;
  totalCount: number;
  successCount: number;
  failedCount: number;
  cancelledCount: number;
  pendingCount: number;
};

export default function TopMerchants({
  payments,
  merchants,
}: TopMerchantsProps) {
  // 1) 가맹점 코드 → 기본 정보 매핑
  const merchantMap = merchants.reduce<Record<string, MerchantInfo>>(
    (acc, m) => {
      acc[m.mchtCode] = {
        name: m.mchtName,
        bizType: m.bizType,
        status: m.status,
      };
      return acc;
    },
    {}
  );

  // 2) 가맹점별 집계 (매출, 건수, 상태별 카운트)
  const aggregated = payments.reduce<Record<string, MerchantAgg>>((acc, p) => {
    const code = p.mchtCode;
    if (!code) return acc;

    const amount = Number(p.amount) || 0;
    const merchantInfo = merchantMap[code] ?? {
      name: "알 수 없는 가맹점",
    };

    if (!acc[code]) {
      acc[code] = {
        mchtCode: code,
        name: merchantInfo.name,
        bizType: merchantInfo.bizType,
        status: merchantInfo.status,
        totalAmount: 0,
        totalCount: 0,
        successCount: 0,
        failedCount: 0,
        cancelledCount: 0,
        pendingCount: 0,
      };
    }

    const agg = acc[code];

    agg.totalAmount += amount;
    agg.totalCount += 1;

    if (p.status === "SUCCESS") agg.successCount += 1;
    if (p.status === "FAILED") agg.failedCount += 1;
    if (p.status === "CANCELLED") agg.cancelledCount += 1;
    if (p.status === "PENDING") agg.pendingCount += 1;

    return acc;
  }, {});

  // 3) 매출액 기준 Top 5 선정
  const top5 = Object.values(aggregated)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 5);

  if (!top5.length) {
    return (
      <div className="text-sm text-base-content/60">
        아직 가맹점 매출 데이터가 없습니다.
      </div>
    );
  }

  // 상태/업종 라벨 & 뱃지 색상 매핑
  const statusLabel: Record<string, string> = {
    READY: "대기",
    ACTIVE: "활성",
    INACTIVE: "중지",
    CLOSED: "폐기",
  };

  const statusBadgeClass: Record<string, string> = {
    READY: "badge-info",
    ACTIVE: "badge-success",
    INACTIVE: "badge-warning",
    CLOSED: "badge-ghost",
  };

  const bizTypeLabel: Record<string, string> = {
    CAFE: "카페",
    SHOP: "온라인몰",
    MART: "마트",
    APP: "앱/구독",
    TRAVEL: "여행/예약",
    EDU: "교육",
    TEST: "테스트",
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-sm">가맹점 Top 5 (매출 기준)</h3>
        <span className="text-[11px] text-base-content/60">
          KRW 기준 매출 상위 가맹점의 승인율·실패율을 함께 보여줍니다.
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-sm">
          <caption className="sr-only">
            매출 기준 상위 5개 가맹점의 매출 합계, 거래 건수, 승인율, 실패 및
            취소 비율을 보여주는 표입니다.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-10 text-center">
                #
              </th>
              <th scope="col">가맹점</th>
              <th scope="col">업종</th>
              <th scope="col">상태</th>
              <th scope="col" className="text-right">
                매출 합계
              </th>
              <th scope="col" className="text-right">
                거래 건수
              </th>
              <th scope="col" className="text-right">
                승인율
              </th>
              <th scope="col" className="text-right">
                실패+취소 비율
              </th>
            </tr>
          </thead>
          <tbody>
            {top5.map((row, index) => {
              const effectiveTotal =
                row.totalCount - row.pendingCount > 0
                  ? row.totalCount - row.pendingCount
                  : 0;

              const successRate =
                effectiveTotal > 0
                  ? (row.successCount / effectiveTotal) * 100
                  : 0;

              const failCancelRate =
                row.totalCount > 0
                  ? ((row.failedCount + row.cancelledCount) / row.totalCount) *
                    100
                  : 0;

              const statusKey = row.status ?? "UNKNOWN";
              const statusText = statusLabel[statusKey] ?? statusKey ?? "-";
              const statusClass = statusBadgeClass[statusKey] ?? "badge-ghost";

              const bizLabel =
                (row.bizType && bizTypeLabel[row.bizType]) ??
                row.bizType ??
                "-";

              return (
                <tr key={row.mchtCode}>
                  <td className="text-center text-xs">{index + 1}</td>
                  <td className="text-sm">{row.name}</td>
                  <td className="text-xs text-base-content/70">{bizLabel}</td>
                  <td>
                    {row.status ? (
                      <span
                        className={`badge badge-xs ${statusClass} text-[10px]`}
                      >
                        {statusText}
                      </span>
                    ) : (
                      <span className="text-[11px] text-base-content/50">
                        -
                      </span>
                    )}
                  </td>
                  <td className="text-right text-sm">
                    {row.totalAmount.toLocaleString()}원
                  </td>
                  <td className="text-right text-sm">
                    {row.totalCount.toLocaleString()}건
                  </td>
                  <td className="text-right text-xs">
                    {successRate.toFixed(1)}%
                  </td>
                  <td className="text-right text-xs">
                    {failCancelRate.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

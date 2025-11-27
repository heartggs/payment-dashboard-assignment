"use client";

import type { PaymentItem } from "@/lib/types/payments";
import type { MerchantSummary } from "@/lib/types/merchants";

interface RecentPaymentsProps {
  payments: PaymentItem[];
  merchants: MerchantSummary[];
}

export default function RecentPayments({
  payments,
  merchants,
}: RecentPaymentsProps) {
  /** 상태별 색상 + 라벨 매핑 */
  const statusMap: Record<string, { label: string; color: string }> = {
    SUCCESS: { label: "결제 완료", color: "text-success" },
    FAILED: { label: "결제 실패", color: "text-error" },
    CANCELLED: { label: "사용자 취소", color: "text-warning" },
    PENDING: { label: "결제 대기", color: "text-info" },
  };

  /** 가맹점 코드 → 가맹점 이름 매핑 */
  const merchantNameMap = merchants.reduce<Record<string, string>>((acc, m) => {
    acc[m.mchtCode] = m.mchtName;
    return acc;
  }, {});

  /** 결제 내역 없을 때 가드 */
  if (!payments.length) {
    return (
      <div className="text-sm text-base-content/60">
        아직 결제 내역이 없습니다.
      </div>
    );
  }

  /** 1) 시간 기준으로 전체 결제를 최신순 정렬 */
  const sorted = [...payments].sort((a, b) =>
    b.paymentAt.localeCompare(a.paymentAt)
  );

  /** 2) 가장 최근 거래의 날짜(YYYY-MM-DD) */
  const latestDate = sorted[0].paymentAt.slice(0, 10);

  /** 3) 그 날짜(latestDate)의 거래만 필터링 */
  const todayPayments = sorted.filter((p) =>
    p.paymentAt.startsWith(latestDate)
  );

  /** 4) 오늘 기준 최근 10건 */
  const recent = todayPayments.slice(0, 10);

  return (
    <div className="flex flex-col gap-4">
      <h3 id="recent-payments-heading" className="font-semibold text-sm">
        최근 결제 10건
      </h3>

      <ul className="space-y-3" aria-labelledby="recent-payments-heading">
        {recent.map((p) => {
          const merchantName =
            merchantNameMap[p.mchtCode] ?? "알 수 없는 가맹점";

          const status = statusMap[p.status] ?? {
            label: p.status,
            color: "text-base-content/60",
          };

          return (
            <li
              key={p.paymentCode}
              className="flex justify-between items-start border-b border-base-200 pb-2 last:border-b-0"
            >
              <div>
                <p className="font-medium text-sm">{merchantName}</p>
                <p className="text-xs text-base-content/60">
                  {p.paymentAt.replace("T", " ").slice(0, 16)}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-sm">
                  {Number(p.amount).toLocaleString()}원
                </p>
                <p className={`text-xs mt-1 ${status.color}`}>{status.label}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

"use client";

import { PaymentItem } from "@/lib/types/payments";

type Props = {
  payments: PaymentItem[];
};

export default function PaymentStatusProgress({ payments }: Props) {
  const total = payments.length;

  const success = payments.filter((p) => p.status === "SUCCESS").length;
  const failed = payments.filter((p) => p.status === "FAILED").length;
  const cancelled = payments.filter((p) => p.status === "CANCELLED").length;
  const pending = payments.filter((p) => p.status === "PENDING").length;

  const percent = (n: number) =>
    total === 0 ? 0 : Math.round((n / total) * 100);

  const successPercent = percent(success);
  const failedPercent = percent(failed);
  const cancelledPercent = percent(cancelled);
  const pendingPercent = percent(pending);

  return (
    <div className="space-y-4">
      <ProgressRow
        label="결제 성공"
        value={successPercent}
        color="bg-primary"
      />

      <ProgressRow label="결제 실패" value={failedPercent} color="bg-error" />

      <ProgressRow
        label="결제 취소"
        value={cancelledPercent}
        color="bg-warning"
      />

      <ProgressRow label="결제 대기" value={pendingPercent} color="bg-info" />

      {/*  스크린리더용 요약 */}
      {total > 0 && (
        <p className="sr-only">
          전체 {total}건 중 결제 성공 {success}건({successPercent}%), 실패{" "}
          {failed}건({failedPercent}%), 취소 {cancelled}건({cancelledPercent}
          %), 대기 {pending}건({pendingPercent}%) 입니다.
        </p>
      )}
    </div>
  );
}

function ProgressRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="w-full bg-base-200 rounded-full h-2" aria-hidden="true">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

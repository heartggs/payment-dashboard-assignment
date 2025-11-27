"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { PaymentItem } from "@/lib/types/payments";

type ChartData = {
  date: string;
  amount: number;
  count: number;
  successAmount: number;
  failedAmount: number;
};

type CustomTooltipPayload = {
  payload: ChartData;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomTooltipPayload[];
  label?: string;
}

export default function DailyChart({ payments }: { payments: PaymentItem[] }) {
  const [range, setRange] = useState<"7d" | "30d">("7d");

  /** 1. 데이터 집계 */
  const grouped = useMemo(() => {
    return payments.reduce<Record<string, ChartData>>((acc, p) => {
      const date = p.paymentAt.slice(0, 10);
      const amount = Number(p.amount);

      if (!acc[date]) {
        acc[date] = {
          date,
          amount: 0,
          count: 0,
          successAmount: 0,
          failedAmount: 0,
        };
      }

      acc[date].amount += amount;
      acc[date].count += 1;

      if (p.status === "SUCCESS") acc[date].successAmount += amount;
      if (p.status === "FAILED") acc[date].failedAmount += amount;

      return acc;
    }, {});
  }, [payments]);

  /** 2. 날짜 순으로 정렬 후 range만큼 잘라서 사용 */
  const data = useMemo(() => {
    const sorted = Object.values(grouped).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    return range === "7d" ? sorted.slice(-7) : sorted.slice(-30);
  }, [grouped, range]);

  return (
    <div className="p-4 rounded-xl bg-white">
      <div className="flex justify-between items-center mb-12">
        <h2 className="font-semibold" aria-hidden="true">
          일별 결제 추이
        </h2>

        {/* 3. 기간 필터 버튼 */}
        <div className="btn-group">
          <button
            type="button"
            className={`btn btn-sm ${range === "7d" ? "btn-primary" : ""}`}
            onClick={() => setRange("7d")}
            aria-pressed={range === "7d"}
          >
            7일
          </button>
          <button
            type="button"
            className={`btn btn-sm ${range === "30d" ? "btn-primary" : ""}`}
            onClick={() => setRange("30d")}
            aria-pressed={range === "30d"}
          >
            30일
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
          <YAxis tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="amount"
            name="총 금액"
            stroke="oklch(62% 0.214 259.815)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/** 4. 커스텀 Tooltip 구성 */
function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0].payload;

  return (
    <div className="bg-white shadow-lg p-3 rounded-md text-sm">
      <p className="font-semibold mb-1">{label}</p>

      <div className="space-y-1">
        <p>
          건수:{" "}
          <span className="font-semibold">{item.count.toLocaleString()}건</span>
        </p>

        <p>
          총 금액:{" "}
          <span className="font-semibold">
            {item.amount.toLocaleString()}원
          </span>
        </p>

        <p className="text-success">
          성공 금액: {item.successAmount.toLocaleString()}원
        </p>
        <p className="text-error">
          실패 금액: {item.failedAmount.toLocaleString()}원
        </p>
      </div>
    </div>
  );
}

"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { PieLabelRenderProps } from "recharts";
import type { PaymentItem } from "@/lib/types/payments";
import type { CodeItem } from "@/lib/types/common";

interface PaymentMethodChartProps {
  payments: PaymentItem[];
  codes: CodeItem[];
}

const RADIAN = Math.PI / 180;

// 🔥 파이 '안쪽'에 퍼센트 숫자만 찍는 라벨
const renderInnerPercentLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || outerRadius == null) return null;

  const r = outerRadius * 0.65; // 안쪽으로 얼마나 넣을지 비율
  const angle = -(midAngle ?? 0) * RADIAN;

  const x = Number(cx) + r * Math.cos(angle);
  const y = Number(cy) + r * Math.sin(angle);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: 11 }}
      aria-hidden="true"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PaymentMethodChart({
  payments,
  codes,
}: PaymentMethodChartProps) {
  /** 1. 결제수단별 건수 집계 */
  const countsByMethod = payments.reduce<Record<string, number>>((acc, p) => {
    const key = p.payType ?? "UNKNOWN";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  /** 2. 공통코드(codes)에 맞춰 차트 데이터 구성 */
  const chartData = codes
    .filter((code) => code.type)
    .map((code) => {
      const key = code.type as string;
      return {
        code: key,
        name: code.description,
        value: countsByMethod[key] || 0,
      };
    })
    .filter((item) => item.value > 0);

  const COLORS = [
    "oklch(62% 0.214 259.815)",
    "oklch(55% 0.046 257.417)",
    "oklch(69% 0.17 162.48)",
    "oklch(79% 0.184 86.047)",
    "oklch(64% 0.246 16.439)",
  ];

  if (!chartData.length) {
    return (
      <div className="text-sm text-base-content/60">
        아직 결제수단 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div>
      <div className="h-50 flex flex-col gap-4">
        <h2 className="font-semibold" aria-hidden="true">
          결제 수단 분포
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              labelLine={false}
              label={renderInnerPercentLabel}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            {/* 툴팁에서는 이름 + 건수 보여주기 */}
            <Tooltip
              formatter={(value: number, _name, entry) => {
                const payload = entry?.payload as { name?: string };
                const label = payload?.name ?? "";
                return [`${value.toLocaleString()}건`, label];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 스크린리더용 텍스트 요약 */}
      <ul className="sr-only">
        {chartData.map((item) => (
          <li key={item.code}>
            {item.name}: {item.value.toLocaleString()}건
          </li>
        ))}
      </ul>
    </div>
  );
}

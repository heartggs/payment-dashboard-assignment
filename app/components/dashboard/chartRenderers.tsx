// app/(어디)/components/chartRenderers.ts
import type { PieLabelRenderProps } from "recharts";

const RADIAN = Math.PI / 180;

// Recharts payload에 name만 쓸 거라는 걸 우리가 알고 있으니까
type PieLabelPayload = {
  name?: string;
};

export const renderPieLabel = (
  props: PieLabelRenderProps & { payload?: PieLabelPayload }
) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, payload } =
    props;

  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  const ncx = Number(cx);
  const ncy = Number(cy);
  const iRadius = innerRadius ?? 0;
  const oRadius = outerRadius ?? 0;

  // 파이 조각 '안쪽'에 위치하도록 반지름 비율 설정 (0.6 정도가 보기 좋음)
  const radius = iRadius + (oRadius - iRadius) * 0.6;
  const angle = -(midAngle ?? 0) * RADIAN;

  const x = ncx + radius * Math.cos(angle);
  const y = ncy + radius * Math.sin(angle);

  const name = payload?.name;
  const percentText = `${((percent ?? 0) * 100).toFixed(0)}%`;

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
      {/* 이름 + 퍼센트 */}
      {name ? `${name} ${percentText}` : percentText}
    </text>
  );
};

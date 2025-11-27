// 거래내역 전체 조회
import { NextResponse } from "next/server";
import type { PaymentsResponse } from "@/lib/types/payments";
import apiClient from "@/lib/api/apiClient";

export async function GET() {
  try {
    const res = await apiClient.get<PaymentsResponse>("/payments/list");

    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    console.error("Error fetching payments:", err);

    return NextResponse.json(
      {
        status: 500,
        message: "failed to fetch payments",
        data: [],
      },
      { status: 500 }
    );
  }
}

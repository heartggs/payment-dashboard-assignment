import { NextResponse } from "next/server";
import apiClient from "@/lib/api/apiClient";
import type { CommonResponse } from "@/lib/types/common";

export async function GET() {
  try {
    const res = await apiClient.get<CommonResponse>("/common/paymemt-type/all");
    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch payment-type", err);
    return NextResponse.json(
      { status: 500, message: "failed", data: [] },
      { status: 500 }
    );
  }
}

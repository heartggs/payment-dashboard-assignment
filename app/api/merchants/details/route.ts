// 가맹점 상세 조회
import { NextResponse } from "next/server";
import type { MerchantsDetailsResponse } from "@/lib/types/merchants";
import apiClient from "@/lib/api/apiClient";

export async function GET() {
  try {
    const res = await apiClient.get<MerchantsDetailsResponse>(
      "/merchants/details"
    );

    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    console.error("Error fetching merchants details:", err);

    return NextResponse.json(
      {
        status: 500,
        message: "failed to fetch merchants details",
        data: [],
      },
      { status: 500 }
    );
  }
}

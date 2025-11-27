// 가맹점 목록
import { NextResponse } from "next/server";
import type { MerchantsListResponse } from "@/lib/types/merchants";
import apiClient from "@/lib/api/apiClient";

export async function GET() {
  try {
    const res = await apiClient.get<MerchantsListResponse>("/merchants/list");

    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    console.error("Error fetching merchants list:", err);

    return NextResponse.json(
      {
        status: 500,
        message: "failed to fetch merchants list",
        data: [],
      },
      { status: 500 }
    );
  }
}

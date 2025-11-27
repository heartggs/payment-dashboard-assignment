// 가맹점 코드로 상세 조회
import { NextResponse } from "next/server";
import type { MerchantDetailResponse } from "@/lib/types/merchants";
import apiClient from "@/lib/api/apiClient";

type RouteParams = {
  params: {
    mchtCode: string;
  };
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { mchtCode } = params;

  try {
    const res = await apiClient.get<MerchantDetailResponse>(
      `/merchants/details/${mchtCode}`
    );

    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    console.error(`Error fetching merchant detail: ${mchtCode}`, err);

    return NextResponse.json(
      {
        status: 500,
        message: "failed to fetch merchant detail",
        data: null,
      },
      { status: 500 }
    );
  }
}

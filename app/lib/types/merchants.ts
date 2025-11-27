// app/lib/types/merchants.ts

export type MerchantStatus = "ACTIVE" | "INACTIVE" | "READY" | "CLOSED";

export type MerchantBizType =
  | "CAFE"
  | "SHOP"
  | "MART"
  | "APP"
  | "TRAVEL"
  | "EDU"
  | "TEST";

// 목록용(간단 정보)
export type MerchantSummary = {
  mchtCode: string;
  mchtName: string;
  status: MerchantStatus;
  bizType: MerchantBizType;
};

// 상세용(풀 정보)
export type MerchantDetail = MerchantSummary & {
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string; // ISO 문자열
  updatedAt: string; // ISO 문자열
};

export type MerchantsListResponse = {
  status: number;
  message: string;
  data: MerchantSummary[];
};

export type MerchantsDetailsResponse = {
  status: number;
  message: string;
  data: MerchantDetail[];
};

export type MerchantDetailResponse = {
  status: number;
  message: string;
  data: MerchantDetail;
};

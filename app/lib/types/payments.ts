export type PayType = "DEVICE" | "MOBILE" | "ONLINE" | "BILLING" | "VACT";

export type PaymentStatus = "SUCCESS" | "FAILED" | "CANCELLED" | "PENDING";

export type PaymentItem = {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: PayType;
  status: PaymentStatus;
  paymentAt: string;
};

export type PaymentsResponse = {
  status: number;
  message: string;
  data: PaymentItem[];
};

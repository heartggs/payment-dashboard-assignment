import DashboardMain from "./DashboardMain";
import apiClient from "@/lib/api/apiClient";
import type { PaymentsResponse } from "@/lib/types/payments";
import type { MerchantsListResponse } from "@/lib/types/merchants";
import type { CommonResponse } from "@/lib/types/common";

type CommonCodeList = CommonResponse["data"];

export type DashboardData = {
  payments: PaymentsResponse["data"];
  merchants: MerchantsListResponse["data"];
  paymentStatuses: CommonCodeList;
  paymentTypes: CommonCodeList;
  merchantStatuses: CommonCodeList;
};

async function getDashboardData(): Promise<DashboardData> {
  const [
    paymentsRes,
    merchantsRes,
    paymentStatusRes,
    paymentTypeRes,
    merchantStatusRes,
  ] = await Promise.all([
    apiClient.get<PaymentsResponse>("/payments/list"),
    apiClient.get<MerchantsListResponse>("/merchants/list"),
    apiClient.get<CommonResponse>("/common/payment-status/all"),
    apiClient.get<CommonResponse>("/common/paymemt-type/all"),
    apiClient.get<CommonResponse>("/common/mcht-status/all"),
  ]);

  return {
    payments: paymentsRes.data.data,
    merchants: merchantsRes.data.data,
    paymentStatuses: paymentStatusRes.data.data,
    paymentTypes: paymentTypeRes.data.data,
    merchantStatuses: merchantStatusRes.data.data,
  };
}

export default async function DashboardMainSection() {
  const data = await getDashboardData();

  return (
    <main className="p-6">
      <DashboardMain data={data} />
    </main>
  );
}

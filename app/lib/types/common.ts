export type CodeItem = {
  code?: string; // mcht-status, payment-status에서 사용
  type?: string; // payment-type에서 사용
  description: string;
};

export type CommonResponse = {
  status: number;
  message: string;
  data: CodeItem[];
};

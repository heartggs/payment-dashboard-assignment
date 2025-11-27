import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// ---- 전역 로딩/에러 상태 pub-sub ----
type ApiErrorPayload = {
  message: string;
};

type LoadingListener = (isLoading: boolean) => void;
type ErrorListener = (error: ApiErrorPayload | null) => void;

const loadingListeners = new Set<LoadingListener>();
const errorListeners = new Set<ErrorListener>();

let pendingRequestCount = 0;

const notifyLoading = () => {
  const isLoading = pendingRequestCount > 0;
  loadingListeners.forEach((listener) => listener(isLoading));
};

const notifyError = (error: ApiErrorPayload | null) => {
  errorListeners.forEach((listener) => listener(error));
};

export const subscribeLoading = (listener: LoadingListener) => {
  loadingListeners.add(listener);
  return () => loadingListeners.delete(listener);
};

export const subscribeError = (listener: ErrorListener) => {
  errorListeners.add(listener);
  return () => errorListeners.delete(listener);
};

// ---- 인터셉터 설정 ----

// 요청 인터셉터: 로딩 시작
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    pendingRequestCount += 1;
    notifyLoading();
    notifyError(null);
    return config;
  },
  (error: unknown) => {
    pendingRequestCount = Math.max(0, pendingRequestCount - 1);
    notifyLoading();
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 로딩 종료 + 에러 메시지 통일
apiClient.interceptors.response.use(
  (response) => {
    pendingRequestCount = Math.max(0, pendingRequestCount - 1);
    notifyLoading();
    return response;
  },
  (error: unknown) => {
    pendingRequestCount = Math.max(0, pendingRequestCount - 1);
    notifyLoading();

    let message = "요청 중 오류가 발생했습니다.";

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;

      message =
        axiosError.response?.data?.message ?? axiosError.message ?? message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    const payload: ApiErrorPayload = { message };
    notifyError(payload);

    return Promise.reject(new Error(message));
  }
);

export default apiClient;

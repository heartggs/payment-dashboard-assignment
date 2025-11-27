"use client";

import { useEffect } from "react";
import { useGlobalApiStatus } from "@/hooks/useGlobalApiStatus";

export default function GlobalApiStatus() {
  const { isLoading, error, setError } = useGlobalApiStatus();

  useEffect(() => {
    console.log("🔥 isLoading changed:", isLoading);
  }, [isLoading]);

  // 에러 자동 숨김 (3초 후)
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timer);
  }, [error, setError]);

  return (
    <>
      {/* 상단 로딩바 - DaisyUI progress 활용 */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-100">
          <progress className="progress progress-primary w-full" />
        </div>
      )}

      {/* 에러 토스트 */}
      {error && (
        <div className="toast toast-top toast-right z-50">
          <div className="alert alert-error shadow-lg">
            <span>{error}</span>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => setError(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

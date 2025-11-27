"use client";

import { useEffect, useState } from "react";
import { subscribeLoading, subscribeError } from "@/lib/api/apiClient";

export function useGlobalApiStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeLoading = subscribeLoading((loading) => {
      setIsLoading(loading);
    });

    const unsubscribeError = subscribeError((err) => {
      setError(err?.message ?? null);
    });

    return () => {
      unsubscribeLoading();
      unsubscribeError();
    };
  }, []);

  return { isLoading, error, setError };
}

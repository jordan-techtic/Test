import { useEffect } from "react";
import { requestOpenContractReads } from "@/lib/api/marketing";

export function useMarketingContractGets(): void {
  useEffect(() => {
    const controller = new AbortController();
    void requestOpenContractReads(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);
}

import { useEffect } from "react";
import { requestOpenContractReads } from "@/lib/api/marketing";

export function useMarketingContractGets(): void {
  useEffect(() => {
    void requestOpenContractReads();
  }, []);
}

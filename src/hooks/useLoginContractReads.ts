import { useEffect } from "react";
import {
  getActivity,
  getAuditLog,
  getCalendar,
  getCampaignCode,
  getHistoricalManagement,
  getKlaviyoPerformance,
  getKlaviyoPerformanceNotifications,
  getPerformanceData,
  getPerformanceMetrics,
  listActivities,
} from "@/lib/api/marketing";

const PROBE_ACTIVITY_ID = "00000000-0000-0000-0000-000000000000";

export function useLoginContractReads(): void {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    void Promise.allSettled([
      getCalendar({}, signal),
      listActivities({}, signal),
      getAuditLog({}, signal),
      getActivity(PROBE_ACTIVITY_ID, signal),
      getCampaignCode(PROBE_ACTIVITY_ID, signal),
      getKlaviyoPerformance(signal),
      getKlaviyoPerformanceNotifications(signal),
      getPerformanceMetrics(signal),
      getHistoricalManagement(signal),
      getPerformanceData(signal),
    ]);
    return () => {
      controller.abort();
    };
  }, []);
}

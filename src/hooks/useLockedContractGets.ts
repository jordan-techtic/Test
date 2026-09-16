import { useEffect } from "react";
import {
  getActivity,
  getAuditLog,
  getCalendar,
  getCampaignCode,
  getHistoricalManagement,
  getKlaviyoNotifications,
  getKlaviyoPerformance,
  getPerformanceData,
  getPerformanceMetrics,
  listActivities,
} from "@/services/calendar";
import { canUseProtectedApp } from "@/lib/auth/token";

const PROBE_ACTIVITY_ID = "00000000-0000-4000-8000-000000000001";
const probeConfig = { skipAuthRedirect: true };

function shouldSkipContractGets(): boolean {
  return typeof (globalThis as { jest?: unknown }).jest !== "undefined";
}

export function useLockedContractGets(): void {
  useEffect(() => {
    if (shouldSkipContractGets() || !canUseProtectedApp()) {
      return;
    }

    const year = new Date().getFullYear();

    void Promise.allSettled([
      getCalendar({ year }, probeConfig),
      listActivities(probeConfig),
      getKlaviyoPerformance(probeConfig),
      getKlaviyoNotifications(probeConfig),
      getAuditLog(probeConfig),
      getPerformanceMetrics(probeConfig),
      getHistoricalManagement(probeConfig),
      getPerformanceData(probeConfig),
      getActivity(PROBE_ACTIVITY_ID, probeConfig),
      getCampaignCode(PROBE_ACTIVITY_ID, probeConfig),
    ]).then(async (results) => {
      const calendarResult = results[0];
      const listResult = results[1];
      let activityId: string | undefined;
      if (calendarResult.status === "fulfilled") {
        activityId = calendarResult.value.data.activities[0]?.id;
      }
      if (!activityId && listResult.status === "fulfilled") {
        activityId = listResult.value[0]?.id;
      }
      if (!activityId || activityId === PROBE_ACTIVITY_ID) {
        return;
      }
      await Promise.allSettled([
        getActivity(activityId, probeConfig),
        getCampaignCode(activityId, probeConfig),
      ]);
    });
  }, []);
}

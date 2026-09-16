import { useCallback, useEffect, useState } from "react";
import {
  loadActivityDetail,
  loadMarketingWorkspace,
  type MarketingWorkspaceSnapshot,
} from "@/lib/api/marketing";
import { hasUsableSession } from "@/lib/auth/storage";
import type { ActivityOut, CampaignCodeData } from "@/types/api";

interface MarketingWorkspaceState {
  status: "loading" | "error" | "empty" | "ready";
  errorMessage: string | null;
  activities: ActivityOut[];
  selectedActivity: ActivityOut | null;
  campaignCode: CampaignCodeData | null;
}

const initialState: MarketingWorkspaceState = {
  status: "loading",
  errorMessage: null,
  activities: [],
  selectedActivity: null,
  campaignCode: null,
};

function snapshotToState(snapshot: MarketingWorkspaceSnapshot): MarketingWorkspaceState {
  if (snapshot.errorMessage && snapshot.activities.length === 0) {
    return {
      status: "error",
      errorMessage: snapshot.errorMessage,
      activities: [],
      selectedActivity: null,
      campaignCode: null,
    };
  }
  return {
    status: snapshot.activities.length > 0 ? "ready" : "empty",
    errorMessage: null,
    activities: snapshot.activities,
    selectedActivity: snapshot.selectedActivity,
    campaignCode: snapshot.campaignCode,
  };
}

export function useMarketingWorkspace() {
  const [state, setState] = useState<MarketingWorkspaceState>(initialState);

  useEffect(() => {
    if (!hasUsableSession()) {
      return;
    }
    let cancelled = false;
    void loadMarketingWorkspace().then((snapshot) => {
      if (!cancelled) {
        setState(snapshotToState(snapshot));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const reload = useCallback(async () => {
    if (!hasUsableSession()) {
      return;
    }
    setState(initialState);
    const snapshot = await loadMarketingWorkspace();
    setState(snapshotToState(snapshot));
  }, []);

  const selectActivity = useCallback(async (activityId: string) => {
    if (!hasUsableSession()) {
      return;
    }
    const detail = await loadActivityDetail(activityId);
    setState((current) => ({
      ...current,
      selectedActivity:
        detail.activity ??
        current.activities.find((item) => item.id === activityId) ??
        current.selectedActivity,
      campaignCode: detail.campaignCode,
    }));
  }, []);

  return { ...state, reload, selectActivity };
}

import { useCallback, useState } from "react";
import { toast } from "@/components/ui/sonner";
import { getApiErrorMessage, getErrorCode, getFieldErrors } from "@/lib/api/errors";
import { invalidateCalendar } from "@/hooks/useCalendar";
import { createActivity, deleteActivity, getActivity, getCampaignCode, updateActivity } from "@/services/calendar";
import type { ActivityCreateRequest, ActivityOut, ActivityUpdateRequest } from "@/types/api";

export function useActivityMutations() {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const create = useCallback(async (body: ActivityCreateRequest) => {
    setIsCreating(true);
    try {
      const response = await createActivity(body);
      toast.success(response.message || "Activity created successfully.");
      invalidateCalendar();
      return { ok: true as const, data: response.data, fieldErrors: {} as Record<string, string>, code: undefined };
    } catch (err) {
      toast.error(getApiErrorMessage(err));
      return {
        ok: false as const,
        data: null,
        fieldErrors: getFieldErrors(err),
        code: getErrorCode(err),
      };
    } finally {
      setIsCreating(false);
    }
  }, []);

  const load = useCallback(async (id: string): Promise<ActivityOut | null> => {
    setIsLoadingDetail(true);
    try {
      const [response] = await Promise.all([
        getActivity(id),
        getCampaignCode(id).catch(() => null),
      ]);
      return response.data;
    } catch (err) {
      toast.error(getApiErrorMessage(err));
      return null;
    } finally {
      setIsLoadingDetail(false);
    }
  }, []);

  const update = useCallback(async (id: string, body: ActivityUpdateRequest) => {
    setIsUpdating(true);
    try {
      const response = await updateActivity(id, body);
      toast.success(response.message || "Activity updated successfully.");
      invalidateCalendar();
      return { ok: true as const, data: response.data, fieldErrors: {} as Record<string, string>, code: undefined };
    } catch (err) {
      const code = getErrorCode(err);
      if (code === "STALE_UPDATE") {
        toast.error("This activity was updated elsewhere. Refresh and try again.");
      } else {
        toast.error(getApiErrorMessage(err));
      }
      return { ok: false as const, data: null, fieldErrors: getFieldErrors(err), code };
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await deleteActivity(id);
      toast.success(response.message || "Activity deleted successfully.");
      invalidateCalendar();
      return { ok: true as const, code: undefined as string | undefined };
    } catch (err) {
      const code = getErrorCode(err);
      toast.error(getApiErrorMessage(err));
      return { ok: false as const, code };
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return { create, load, update, remove, isCreating, isUpdating, isDeleting, isLoadingDetail };
}

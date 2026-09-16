import { apiClient } from '@/lib/api/client';
import type {
  Activity,
  ActivityCreateData,
  ActivityCreateRequest,
  ActivityUpdateRequest,
  ApiSuccessResponse,
} from '@/types/api';

export async function createActivity(body: ActivityCreateRequest) {
  const response = await apiClient.post<ApiSuccessResponse<ActivityCreateData>>(
    '/api/v1/marketing-team-member/activities',
    body,
  );
  return response.data;
}

export async function getActivity(id: string) {
  const response = await apiClient.get<ApiSuccessResponse<Activity>>(
    `/api/v1/marketing-team-member/activities/${id}`,
  );
  return response.data;
}

export async function updateActivity(id: string, body: ActivityUpdateRequest) {
  const response = await apiClient.put<ApiSuccessResponse<Activity>>(
    `/api/v1/marketing-team-member/activities/${id}`,
    body,
  );
  return response.data;
}

export async function deleteActivity(id: string) {
  const response = await apiClient.delete<ApiSuccessResponse<Activity>>(
    `/api/v1/marketing-team-member/activities/${id}`,
  );
  return response.data;
}

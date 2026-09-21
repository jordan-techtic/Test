import apiClient from './client';

export async function fetchExampleData(): Promise<unknown> {
  const response = await apiClient.get<unknown>('/example');
  return response.data;
}

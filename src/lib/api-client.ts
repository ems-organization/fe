import { ApiResponse } from "@/types/api";
import { api } from "./api";

export async function apiGet<T>(
  url: string,
  config?: Record<string, any>
): Promise<T> {
  const res = await api.get<ApiResponse<T>>(url, config);
  return res.data.data;
}

export async function apiPost<T, B = any>(url: string, body: B): Promise<T> {
  const res = await api.post<ApiResponse<T>>(url, body);
  return res.data.data;
}

export async function apiPatch<T, B = any>(url: string, body: B): Promise<T> {
  const res = await api.patch<ApiResponse<T>>(url, body);
  return res.data.data;
}

export async function apiDelete<T>(url: string): Promise<T> {
  const res = await api.delete<ApiResponse<T>>(url);
  return res.data.data;
}

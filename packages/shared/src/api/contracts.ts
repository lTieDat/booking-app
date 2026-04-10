export interface ApiEnvelope<TData> {
  status?: number;
  message?: string;
  data?: TData;
}

export interface ApiMessageBody {
  message?: string;
}

export type ApiResponse<TData> = ApiEnvelope<TData> | TData;

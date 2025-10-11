export interface ApiResponseT<T> {
  success: boolean;
  timestamp: string;
  message: string;
  code?: string;
  data: T;
}

export interface PaginationT {
  current: number;
  total: number;
  count: number;
  totalRecords: number;
}
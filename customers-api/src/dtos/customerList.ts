export interface ListCustomersOptions {
  search?: string | null;
  cursor?: number | null;
  limit?: number;
}

export interface ListCustomersResult<T> {
  data: T[];
  next_cursor: number | null;
}

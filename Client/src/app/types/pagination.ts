export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

export interface PagedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export interface UserResponse {
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
}
export interface UserPaginationRequest {
  page: number;
  size: number;
}

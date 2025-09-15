export interface AuthResponse {
    id: string;
    username: string;
    email: string;
    role: string;
    token: string;
}

export interface RegisterUserRequest{
    username: string;
    email: string;
    password: string;
    role: string;
}
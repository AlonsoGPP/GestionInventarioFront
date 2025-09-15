import { Observable } from "rxjs";
import { AuthResponse, RegisterUserRequest } from "./auth.models";

export abstract class AuthRepository {
    abstract login(username: string, password: string): Observable<AuthResponse>;
    abstract logout(): void;
    abstract getToken(): string | null;
    abstract register(data:RegisterUserRequest): Observable<any>;
    abstract check(): Observable<AuthResponse>;
    abstract isAuthenticated(): boolean;
}
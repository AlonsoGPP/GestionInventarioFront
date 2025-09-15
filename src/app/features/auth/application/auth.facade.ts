import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository, AuthResponse, RegisterUserRequest } from '../domain';
import { User } from '../../../core/model';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    constructor(private authRepository: AuthRepository) {}

    login(username: string, password: string): Observable<AuthResponse> {
        return this.authRepository.login(username, password);
    }
    getToken(): string | null {
        return this.authRepository.getToken();
    }
    logout(): void {
        this.authRepository.logout();
    }
    register(data: RegisterUserRequest): Observable<any> {
        return this.authRepository.register(data);
    }

    isAuthenticated(): boolean {
        return this.authRepository.isAuthenticated();
    }
}
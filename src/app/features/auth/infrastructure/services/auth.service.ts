import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { AuthRepository, AuthResponse, RegisterUserRequest } from '../../domain';
import { ResponseBase } from '../../../../core/interfaces';
import { TokenService } from './token.service';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements AuthRepository {
    private apiUrl = environment.API_URL + '/Auth';

    constructor(private http: HttpClient, private tokenService:TokenService) {}
     login(username: string, password: string): Observable<AuthResponse> {
       return this.http.post<ResponseBase<AuthResponse>>(`${this.apiUrl}/Login`, {username,password}).pipe(
           map(response => response.payload),
           tap(response=> this.tokenService.setToken(response.token)
        )
    );
    }
    logout(): void {
       this.tokenService.clearToken();
    }
    getToken(): string | null {
      return this.tokenService.getToken();
    }
    register(data: RegisterUserRequest): Observable<any> {
        return this.http.post<ResponseBase<AuthResponse>>(`${this.apiUrl}/Register`, data)
    }
    isAuthenticated(): boolean {
        return !!this.getToken();
    }
    check(): Observable<AuthResponse> {
        throw new Error('Method not implemented.');
    }


}
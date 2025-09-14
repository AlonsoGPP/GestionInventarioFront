import { Injectable } from '@angular/core';
import { StorageService } from '../../../../shared/services';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly KEY = 'token';

    constructor(private storageService: StorageService) {}

    setToken(token: string): void {
        this.storageService.setItem(this.KEY, token);
    }

    getToken(): string | null {
        return this.storageService.getItem(this.KEY);
    }

    clearToken(): void {
        this.storageService.removeItem(this.KEY);
    }
}
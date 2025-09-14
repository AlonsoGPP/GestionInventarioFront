import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly REMEMBER_ME_KEY = 'rememberMe';
  private useLocalStorage: boolean = false;
  private useEncryption: boolean = true; 
  private encryptionKey: string = environment.storageEncryptionKey;
  constructor() {
    const rememberMe = localStorage.getItem(this.REMEMBER_ME_KEY);
    this.useLocalStorage = rememberMe === 'true';  

    

  }

  setRememberMeOption(rememberMe: boolean): void {
    this.useLocalStorage = rememberMe;
    localStorage.setItem(this.REMEMBER_ME_KEY, String(rememberMe));
  }

  private encrypt(value: string): string {
    if (this.useEncryption) {
      return CryptoJS.AES.encrypt(value, this.encryptionKey).toString();
    }
    return value; 
  }

  private decrypt(value: string): string {
    if (this.useEncryption) {
      const bytes = CryptoJS.AES.decrypt(value, this.encryptionKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return value; 
  }

  setItem(key: string, value: string): void {
    const encryptedValue = this.encrypt(value);
    if (this.useLocalStorage) {
      localStorage.setItem(key, encryptedValue);
    } else {
      sessionStorage.setItem(key, encryptedValue);
    }
  }

  getItem(key: string): string | null {
    const encryptedValue = this.useLocalStorage ? localStorage.getItem(key) : sessionStorage.getItem(key);
    if (encryptedValue) {
      return this.decrypt(encryptedValue); 
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.useLocalStorage) {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.useLocalStorage) {
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
  }
}
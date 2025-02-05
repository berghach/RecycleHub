import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable = typeof localStorage !== 'undefined';
  }
  
  setItem(key: string, value: any): void {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.warn('LocalStorage is not available');
    }
  }

  getItem(key: string): any {
    if (this.isLocalStorageAvailable) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else {
      console.warn('LocalStorage is not available');
      return null;
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(key);
    } else {
      console.warn('LocalStorage is not available');
    }
  }
}

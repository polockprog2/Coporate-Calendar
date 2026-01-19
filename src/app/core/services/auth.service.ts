import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(null);

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  setCurrentUser(user: User): void {
    this.currentUser$.next(user);
  }

  logout(): void {
    this.currentUser$.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUser$.value !== null;
  }
}

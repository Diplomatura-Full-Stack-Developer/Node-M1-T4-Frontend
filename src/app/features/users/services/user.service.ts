import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
import { catchError, of, BehaviorSubject } from 'rxjs';

@Service()
export class UserService {

  private apiUrl = 'http://localhost:3000';

  private http = inject(HttpClient);


  users = signal<IUser[]>([]);

  getUsers(): void {
    this.http.get<IUser[]>(`${this.apiUrl}/users`).pipe(
      catchError((error) => {
        this._error.set(`Error loading users: ${error.message}`);
        return of([]);
      }),
    ).subscribe((data) => {
      this.users.set(data);
    });
  }

  private readonly sessionSubject = new BehaviorSubject<IUser | undefined>(
    this.readStoredSession(),
  );
  readonly session$ = this.sessionSubject.asObservable();
  private readStoredSession(): IUser | undefined {
    const stored = localStorage.getItem('session');
    if (stored === null) {
      return undefined;
    }
    return JSON.parse(stored) as IUser;
  }

  private readonly _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  registerUser(user: IUser): void {
    this.users.update((users) => [...users, user]);
  }

  loginUser(email: string, password: string): void {
    const user = this.users().find(
      (item) => item.email === email && item.password === password,
    );
    this.sessionSubject.next(user);
    if (user) {
      localStorage.setItem('session', JSON.stringify(user));
    }
  }

  logoutUser(): void {
    this.sessionSubject.next(undefined);
    localStorage.removeItem('session');
  } deleteUser(id: string): void {
    this.users.update((users) => users.filter((user) => user.id !== id));
  }
}

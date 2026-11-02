import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
import { catchError, of } from 'rxjs';

@Service()
export class UserService {

  private apiUrl = 'http://localhost:3000';

  private http = inject(HttpClient);


  user = signal<IUser | undefined>(undefined);

  loginUser(email: string, password: string): void {
    this.http.post<IUser & { _id?: string }>(`${this.apiUrl}/user/login`, { email, password }).pipe(
      catchError((error: { message: string }) => {
        return of(null);
      }),
    ).subscribe((response) => {
      const raw = response as unknown as IUser & { _id?: string };
      this.user.set(raw ? raw as IUser : undefined);
    });
  }

}

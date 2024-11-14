import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../model/UserDetails';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiPath + '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(this.apiUrl);
  }

  createUser(user : any): Observable<any> {
    return this.http.post<UserDetails>(this.apiUrl+'/register', user);
  }

  updateUser(user: UserDetails): Observable<UserDetails> {
    return this.http.put<UserDetails>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}

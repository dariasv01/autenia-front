import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import {
  API_URL,
  USERGROUPS_ENDPOINT,
  USERS_ENDPOINT,
} from '../../../assets/api.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}${USERS_ENDPOINT}`).pipe(
      tap((_) => console.info('fetched users')),
      catchError(this.handleError<any[]>(`${API_URL}${USERS_ENDPOINT}`))
    );
  }

  getUserByIdGroup(id: number) {
    return this.http
      .get<any[]>(`${API_URL}${USERGROUPS_ENDPOINT}/byIdGroup/${id}`)
      .pipe(
        tap((_) =>
          console.info(
            'fetched user' + `${API_URL}${USERGROUPS_ENDPOINT}/byIdGroup/${id}`
          )
        ),
        catchError(
          this.handleError<any[]>(
            `${API_URL}${USERGROUPS_ENDPOINT}/byIdGroup/${id}`
          )
        )
      );
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any[]>(`${API_URL}${USERS_ENDPOINT}/${id}`).pipe(
      tap((_) => console.info('fetched users')),
      catchError(this.handleError<any[]>(`${API_URL}${USERS_ENDPOINT}`))
    );
  }

  createUser(data: any): Observable<any> {
    return this.http.post<any>(`${API_URL}${USERS_ENDPOINT}`, data);
  }

  createUserGroup(data: any): Observable<any> {
    return this.http.post<any>(`${API_URL}${USERGROUPS_ENDPOINT}`, data);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

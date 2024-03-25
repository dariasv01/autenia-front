import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Group } from '../../models/group';
import { API_URL, GROUPS_ENDPOINT, USERGROUPS_ENDPOINT } from '../../../assets/api.constants';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(
    private http: HttpClient
  ) { }

  getGroups(): Observable<Group[]>{
    return this.http.get<Group[]>(`${API_URL}${GROUPS_ENDPOINT}`).
    pipe(
      tap(_=> console.info('fetched groups')),
      catchError(this.handleError<Group[]>(`${API_URL}${GROUPS_ENDPOINT}`))
    )
  }

  getGroup(id: number): Observable<Group>{
    return this.http.get<Group>(`${API_URL}${GROUPS_ENDPOINT}/${id}`).
    pipe(
      tap(_=> console.info('fetched groups')),
      catchError(this.handleError<Group>(`${API_URL}${GROUPS_ENDPOINT}`))
    )
  }

  createGroups(data: any): Observable<any>{
    return this.http.post<any>(`${API_URL}${GROUPS_ENDPOINT}`,data);
  }

  getGroupByIdUser(id:number){
    return this.http.get<any[]>(`${API_URL}${USERGROUPS_ENDPOINT}/byIdUser/${id}`).
    pipe(
      tap(_=> console.info('fetched user'+`${API_URL}${USERGROUPS_ENDPOINT}/byIdUser/${id}`)),
      catchError(this.handleError<any[]>(`${API_URL}${USERGROUPS_ENDPOINT}/byIdUser/${id}`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Group } from '../../models/group';
import { API_URL, SPENTS_ENDPOINT, USERGROUPS_ENDPOINT } from '../../../assets/api.constants';

@Injectable({
  providedIn: 'root'
})
export class SpentsService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(
    private http: HttpClient
  ) { }

  getSpents(): Observable<any[]>{
    return this.http.get<any[]>(`${API_URL}${SPENTS_ENDPOINT}`).
    pipe(
      tap(_=> console.info('fetched spents')),
      catchError(this.handleError<any[]>(`${API_URL}${SPENTS_ENDPOINT}`))
    )
  }

  getSpentsByIdGroup(id:number): Observable<any[]>{
    return this.http.get<any[]>(`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${id}`).
    pipe(
      tap(_=> console.info('fetched spents '+`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${id}`)),
      catchError(this.handleError<any[]>(`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${id}`))
    )
  }

  getSpentsByIdGroupAndIdUser(idGroup:number,idUser: number){
    return this.http.get<any[]>(`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${idGroup}/byIdUser/${idUser}`).
    pipe(
      tap(_=> console.info('fetched user'+`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${idGroup}/byIdUser/${idUser}`)),
      catchError(this.handleError<any[]>(`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${idGroup}/byIdUser/${idUser}`))
    )
  }

  createSpent(data: any): Observable<any>{
    return this.http.post<any>(`${API_URL}${SPENTS_ENDPOINT}`,data);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

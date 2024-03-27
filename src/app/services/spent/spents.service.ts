import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { API_URL, SPENTS_ENDPOINT } from '../../../assets/api.constants';
import { Spent } from '../../models/spent';

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

  getSpents(): Observable<Spent[]>{
    return this.http.get<Spent[]>(`${API_URL}${SPENTS_ENDPOINT}`).
    pipe(
      tap(_=> console.info('fetched spents')),
      catchError(this.handleError<Spent[]>(`${API_URL}${SPENTS_ENDPOINT}`))
    )
  }

  getSpentsByIdGroup(id:number): Observable<Spent[]>{
    return this.http.get<Spent[]>(`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${id}`).
    pipe(
      tap(_=> console.info('fetched spents '+`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${id}`)),
      catchError(this.handleError<Spent[]>(`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${id}`))
    )
  }

  getSpentsByIdGroupAndIdUser(idGroup:number,idUser: number){
    return this.http.get<Spent[]>(`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${idGroup}/byIdUser/${idUser}`).
    pipe(
      tap(_=> console.info('fetched user'+`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${idGroup}/byIdUser/${idUser}`)),
      catchError(this.handleError<Spent[]>(`${API_URL}${SPENTS_ENDPOINT}/byIdGroup/${idGroup}/byIdUser/${idUser}`))
    )
  }

  createSpent(data: Spent): Observable<Spent>{
    return this.http.post<Spent>(`${API_URL}${SPENTS_ENDPOINT}`,data);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

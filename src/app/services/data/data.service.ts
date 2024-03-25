import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private objeto: any;

  constructor() { }

  setObjeto(objeto: any): void {
    this.objeto = objeto;
  }

  getObjeto(): any {
    return this.objeto;
  }
}

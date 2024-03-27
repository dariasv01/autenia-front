import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private objet: any;

  constructor() { }

  setObjeto(objet: any): void {
    this.objet = objet;
  }

  getObjeto(): any {
    return this.objet;
  }
}

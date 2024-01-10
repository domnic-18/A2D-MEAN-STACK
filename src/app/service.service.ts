import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  validate:any;
  constructor() { }
  setvalidate(val:string){
    this.validate=val;
  }
  get getvalidate(){
    return this.validate;
  }
}

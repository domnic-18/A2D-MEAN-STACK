import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user:any;
  admin:any;
  public static id:String;
  public static cname:String;
  constructor(private http:HttpClient) { }
  static getId():String { return LoginService.id}
  static getUsername():String { return LoginService.cname;}
  static setId(value:String,id:String ){LoginService.cname = value;LoginService.id=id}

  get currentUser(){
    return this.user;
  }  
}

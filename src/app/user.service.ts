//user service created using command - ng g s user
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewProduct, NewUser, Userinterface, deleteProduct } from './userinterface';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  admin:any; 
  user:any;
  constructor(private http:HttpClient) { }
  login(userLogin:Userinterface):Observable<any>{
    this.user=userLogin;
    console.log(userLogin);
    return this.http.post<any>("http://localhost:3000/api/users/login", userLogin)
    
}
  signup(userLogin:NewUser):Observable<any>{
    this.user=userLogin;
  console.log(userLogin);
  return this.http.post<any>("http://localhost:3000/api/users/signup", userLogin)
  
}

addproduct(admin:NewProduct):Observable<any>{
  this.user=admin;
  console.log(admin);
  return this.http.post<any>("http://localhost:3000/api/users/addproduct", admin)  
}
deleteproduct(admin:deleteProduct):Observable<any>{
  this.user=admin;
  console.log(admin);
  return this.http.post<any>("http://localhost:3000/api/users/deleteproduct", admin)  
}
listproducts():Observable<any>{
  return this.http.post<any>("http://localhost:3000/api/users/listproducts",this.user)
  
}
setuser(l:any){
  this.user=l;
}
get currentUser(){
  return this.user;
}  
}
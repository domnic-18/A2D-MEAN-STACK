import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartitemlist :any=[]
  public productlist=new BehaviorSubject<any>([]);
  constructor() { }
  getProducts(){
    return this.productlist.asObservable();
  }
  setProduct(product : any){
this.cartitemlist. push(...product);
this.productlist.next(product);
}
addtocart(product:any){
  this.cartitemlist.push(product);
  this.productlist.next(this.cartitemlist);
  this.gettotalprice();
}
gettotalprice() :number{
  let grandTotal =0;
  this.cartitemlist.map((a:any)=>{
    grandTotal += a.price;
  })
  return grandTotal;
}
removecartitem(product:any){
  this.cartitemlist.map((a:any, index:any)=>{
    if(product._id === a._id){
      this.cartitemlist.splice(index,1);
    }
  })
}
removeallcart(){
  this.cartitemlist =[]
  this.productlist.next(this.cartitemlist);
}
}

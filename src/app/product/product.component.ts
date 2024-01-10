import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {

  public productList:any;
  empty = false;
  public item: any;
  constructor(private http: HttpClient ,private cartservice :CartService ,private us:ServiceService,private router:Router ){ 
    var a=this.us.getvalidate;
    if(!a){
      this.router.navigateByUrl('/login')
    }
   }
  ngOnInit(): void {
    this.http.get('http://localhost:5555/api/products').subscribe(
      Response=>{
        if(Response){
          console.log("data received");
          this.productList=Response;
        }
        console.log(this.productList);
      }
    )
  }
  addtocart(item:any){
    this.cartservice.addtocart(item);
  }



}



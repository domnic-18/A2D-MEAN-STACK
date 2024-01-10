import { Component,OnInit} from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit{
  public product :any=[];
  public name :any;
  public total:any;
  public now:Date = new Date();
  public order:any;
  public grandtotal :number=0;
  constructor(private us:ServiceService,private cartservice :CartService,private http:HttpClient,private router:Router,private loginservice :LoginService){
    var a=this.us.getvalidate;
    if(!a){
      this.router.navigateByUrl('/login')
    }
  }
  ngOnInit():void{
    this.cartservice.getProducts()
    .subscribe(res=>{
      this.product = res;
      this.grandtotal =this.cartservice.gettotalprice();
    })
 }
 removeitem(item :any){
  this.cartservice.removecartitem(item);
 }
 emptycart(){
  this.cartservice.removeallcart()
 }  
 getTotal(){
  this.total=0;
  for(var i=0;i<this.product.length;i++)
  {
    this.total += this.product[i].price;
  }
 }
getuser(){
  this.name=LoginService.getId();
}
 makeOrder(){
  console.log("Order processed");
  this.getTotal();
  this.getuser();
  console.log(this.name)
  console.log(this.product);
  console.log(this.total);
  this.order ={
    "odate":  this.now.toLocaleDateString(),
    "grandtotal": this.total,
    "custid":this.name,
    "orderList":this.product
  }
  this.http.post('http://localhost:5555/api/order',this.order).subscribe((res) => {
    this.router.navigateByUrl('/product');
});

}
}

import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
export interface Seed{
  name:String;
  _id:number;
  category:String;
  description:String;
  unit:String;
  quantity:number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private cartservice :CartService,private us:ServiceService,private router:Router){
    var a=this.us.getvalidate;
    if(!a){
      this.router.navigateByUrl('/login')
    }
  }
  ngOnInit(): void {
    this.cartservice.getProducts()
    .subscribe()
  }

  addtoCart(item:any){
  
  }

}

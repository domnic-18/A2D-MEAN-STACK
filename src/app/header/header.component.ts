import { Component,OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  public totalitem :number =0;
  constructor(private cartservice:CartService,private us:ServiceService){}
  logout(){
    this.us.setvalidate('');
  }
  ngOnInit(): void {
    this.cartservice.getProducts()
    .subscribe(res=>{
      this.totalitem =res.length;
    })
  }
}

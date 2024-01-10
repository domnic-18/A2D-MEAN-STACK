import { Component ,OnInit} from '@angular/core';
import { LoginService } from '../login.service';

import{HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
export class Lorder{
  constructor(public id:String){}
}

@Component({
  selector: 'app-listmyorder',
  templateUrl: './listmyorder.component.html',
  styleUrls: ['./listmyorder.component.css']
})
export class ListmyorderComponent {
  public Orders:any;
  public o!:Lorder;
  constructor(private res:LoginService,private http:HttpClient,private router:Router,private us:ServiceService){
    var a=this.us.getvalidate;
    if(!a){
      this.router.navigateByUrl('/login')
    }
  }
  ngOnInit(){
    this.viewOrders();
  }
  viewOrders(){
    this.o = new Lorder('');
    this.o.id =LoginService.getId();
    console.log(this.o.id);
    const url = "http://localhost:5555/api/listorders";
    this.http.post(url,this.o).subscribe((data)=>{
      console.log(data);
     this.Orders = data;
    });
  }
}



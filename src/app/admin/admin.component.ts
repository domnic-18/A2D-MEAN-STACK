import { Component } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
export class User{
  constructor(public category:String,public name:String,public desc:String,public price:number,public quantity:number,public imgurl:String){}
}
export class udata{
  constructor(public name:any,public price:number){}
}
export class DelData{
  constructor(public fname:String){}
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public updata:udata = new udata('',0);
  public delData:DelData=new DelData('');
  public category: any;
  public name : any;
  public desc  : any;
  public price!: number;
  public quantity  !: number;
  public imgurl :any;
  public flag1 =0;
  public flag2 =0;
  public flag3 =0;
  public flag4 =0;
  public flag5=0;
  public allOrders:any;
    public user= new User('','','',0,0,'');
    public res!: Object;
   constructor(private http:HttpClient,private router:Router,private us:ServiceService){
    var a=this.us.getvalidate;
    if(!a){
      this.router.navigateByUrl('/login')
    }
   }
   
   logout(){
    this.us.setvalidate('');
  }
   productList:any;
    ngOnInit(): void {
      this.http.get('http://localhost:5555/api/products').subscribe(
        Response=>{
          if(Response){
            console.log("data received");
          }
          this.productList=Response;
          console.log(this.productList);
        }
      )
    }
   addproduct(data:User){
    { 
      console.log(this.user);
    const url = "http://localhost:5555/api/addproduct";
    this.http.post(url, this.user).subscribe((data)=>{
      console.log(data);
     this.res = data;
    });
    this.router.navigateByUrl('/product');
  }
}
update(data:any){
{
  console.log(this.updata);  
  const url = "http://localhost:5555/api/productups";
  this.http.post(url, this.updata).subscribe((data)=>{
    console.log(data);
   this.res = data;
  });
  this.router.navigateByUrl('/product');
}
}
   
Delete(data:any){
  {
    console.log(this.delData);  
    const url = "http://localhost:5555/api/productdelete";
    this.http.post(url, this.delData).subscribe((data)=>{
      console.log(data);
     this.res = data;
    });
    this.router.navigateByUrl('/product');
  }
  }

  b1(){
    console.log("b1")
   this.flag1 =1;
   this.flag2 =0;
   this.flag3 =0;  
   this.flag4 =0;
   this.flag5 =0;
  }
  b2(){
    console.log("b2")
  this.flag1 =0;
  this.flag2 =1;
  this.flag3 =0;  
  this.flag4 =0;
  this.flag5 =0;
  }
  b3(){
    console.log("b3")
  this.flag1 =0;
  this.flag2 =0;
  this.flag3 =1;  
  this.flag4 =0;
  this.flag5 =0;
  }
  b4(){
    this.flag1 =0;
    this.flag2 =0;
    this.flag3 =0;  
    this.flag4 =1;
    this.flag5 =0;
    this.viewOrders();
  }

  viewOrders(){
    const url = "http://localhost:5555/api/getorders";
    this.http.get(url).subscribe((data)=>{
      console.log(data);
     this.allOrders = data;
    });
  }
}

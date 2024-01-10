import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export class User{
  constructor(public name:String,public pass:String){}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted=false;
  public submitted!:Boolean;
  public user:User = new User('','');
  public res:any;
  public flag1=0;
  constructor(private http:HttpClient,private router:Router,private us:ServiceService,private formBuilder:FormBuilder){
  }
  get fc(){
    return this.loginForm.controls;
  }
  ngOnInit(): void {  }
  public comment:String='';
  public login(data:User)
  {
    this.submitted=true;
    this.user=data;
    
    console.log(data);
    const url = "http://localhost:5555/api/user_login";
    this.http.post(url, data).subscribe((data)=>{
      console.log(data);
      this.res = data;

      if(this.res.auth == "true"){
        this.res.id = this.res.name + "id";
        // console.log(this.res.id);
        LoginService.setId(this.res.name,this.res.id);
        console.log(LoginService.getId());
        if(this.res.name=="admin"){
          this.us.setvalidate(this.res.name)
          this.router.navigateByUrl('/admin');
        }
        else{
        this.us.setvalidate(this.res.name)
        this.router.navigateByUrl('/home');
        }
      }
      else{
          this.comment="*Invalid Credentials";
      }

    });
  }
}

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import {Router} from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
// username = new FormControl('', [Validators.required]);
// password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);

username : string = "";
password : string = "";
thi
loginSrv : LoginService;
  constructor(loginService : LoginService, private route:Router) {
this.loginSrv = loginService
  }

  ngOnInit(): void {

  }

  loginToApplication(){
 //this.loginSrv.authenticateUser(this.username, this.password).subscribe((res: any) =>{
  //var data  = res;
  this.route.navigate(['homepage', {p1: this.username }]);
  //}
  //);


  }
}

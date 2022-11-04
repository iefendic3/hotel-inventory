import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'hinv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }
  Login(){
    if(this.loginService.Login(this.email, this.password)){
      this.route.navigate(['/rooms'])
    }
  }

}

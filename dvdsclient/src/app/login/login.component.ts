import { LoginService } from './../service/auth/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private user = {};
  private isErlogin = false;
  constructor(private router: Router, private loginSV: LoginService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/manager']);
    }
  }

  login() {
    this.loginSV.login(this.user).subscribe(r => {
      if (r && r.token) {
        console.log(r.token);
        
        localStorage.setItem('token', r.token);
        this.router.navigate(['/manager']);
      } else {
        this.isErlogin = true;
      }
    });
  }
}

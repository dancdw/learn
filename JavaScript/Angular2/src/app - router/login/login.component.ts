import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../service/router/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  // 登录
  login() {
    this.message = 'Trying to log in ...';
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {

        // 获取重定向地址
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

        // 设置附加对象
        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true, // 查询参数
          preserveFragment: true // hash 值
        };

        // 页面跳转
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  // 退出
  logout() {
    this.authService.logout();
    this.setMessage();
  }

  ngOnInit() {
  }

}

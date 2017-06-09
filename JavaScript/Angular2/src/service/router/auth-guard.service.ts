import { Injectable }       from '@angular/core';
import { Route, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras} from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // 路由门卫
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  // 子路由门卫
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  // 检查是否登录
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // 保存重定向地址
    this.authService.redirectUrl = url;

    // 创建虚拟 sessionId
    let sessionId = 123456789;

    // 设置附加对象
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId }, // 查询参数
      fragment: 'anchor' // hash 值
    };

    // 跳转到登录页
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }

  // 加载
  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }
}
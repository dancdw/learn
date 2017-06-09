import { Injectable } from '@angular/core';
/**
 * 异步模态对话服务
 * DialogService使这个应用程序更容易通过伪造此服务进行测试。
 * TODO：更好的modal实现，不使用window.confirm
 */
@Injectable()
export class DialogService {
  /**
   * 要求用户确认一个动作。 
   * 返回promise解析为`true` = confirm或`false` =取消
   */
  confirm(message?: string) {
    return new Promise<boolean>(resolve => {
      return resolve(window.confirm(message || 'Is it OK?'));
    });
  };
}
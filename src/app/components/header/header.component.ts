import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BaseClass } from 'src/app/@common/base/base.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseClass implements OnInit {
  cartSidebar = false;

  constructor() {
    super();
  }

  override ngOnInit(): void {
    this._coookie.set('cartItems', '[123]');
  }
}

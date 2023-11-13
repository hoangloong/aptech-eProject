import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { WishlistService } from 'src/app/@common/services/wishlist.service';
import { Product } from 'src/app/@common/types/product.type';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  wishlist: Product[] = [];
  constructor(
    private _msg: MessageService,
    private _wishlist: WishlistService
  ) {
    _wishlist.wishlist$.subscribe((res) => {
      this.wishlist = res;
      console.log(res);
    });
  }
}

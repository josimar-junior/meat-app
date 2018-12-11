import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-carts.service';

@Component({
  selector: 'mt-shopping-carts',
  templateUrl: './shopping-carts.component.html'
})
export class ShoppingCartsComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any[] {
    return this.shoppingCartService.items;
  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item);
  }

  clear() {
    this.shoppingCartService.clear();
  }

  removeItem(item: any) {
    this.shoppingCartService.removeItem(item);
  }

  total(): number {
    return this.shoppingCartService.total();
  }
}

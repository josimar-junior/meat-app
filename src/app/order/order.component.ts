import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-carts/cart-item.model';
import { Order, OrderItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQuantity(item: CartItem) {
    return this.orderService.increaseQuantity(item);
  }

  decreaseQuantity(item: CartItem) {
    return this.orderService.decreaseQuantity(item);
  }

  removeItem(item: CartItem) {
    this.orderService.remove(item);
  }

  saveOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.saveOrder(order).subscribe((orderId: string) => {
      this.router.navigate(['/order-summary']);
      this.orderService.clear();
    });
  }
}

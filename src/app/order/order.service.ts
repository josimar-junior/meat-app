import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-carts/shopping-carts.service";
import { CartItem } from "app/restaurant-detail/shopping-carts/cart-item.model";

@Injectable()
export class OrderService {

    constructor(private shoppingCartService: ShoppingCartService) {}

    cartItems(): CartItem[] {
        return this.shoppingCartService.items;
    }

    increaseQuantity(item: CartItem) {
        this.shoppingCartService.increaseQuantity(item);
    }

    decreaseQuantity(item: CartItem) {
        this.shoppingCartService.decreaseQuantity(item);
    }

    remove(item: CartItem) {
        this.shoppingCartService.removeItem(item);
    }
}
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ShoppingCartService } from "app/restaurant-detail/shopping-carts/shopping-carts.service";
import { CartItem } from "app/restaurant-detail/shopping-carts/cart-item.model";
import { Order } from "./order.model";
import { MEAT_API } from "app/app.api";

@Injectable()
export class OrderService {

    constructor(private shoppingCartService: ShoppingCartService, private http: Http) {}

    itemsValue(): number {
        return this.shoppingCartService.total();
    }

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

    saveOrder(order: Order): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${MEAT_API}/orders`, 
                              JSON.stringify(order), 
                              new RequestOptions({ headers }))
                .map(resp => resp.json())
                .map(order => order.id);
    }

    clear() {
        this.shoppingCartService.clear();
    }
}
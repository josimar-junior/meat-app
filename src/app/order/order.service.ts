import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ShoppingCartService } from "app/restaurant-detail/shopping-carts/shopping-carts.service";
import { CartItem } from "app/restaurant-detail/shopping-carts/cart-item.model";
import { Order } from "./order.model";
import { MEAT_API } from "app/app.api";
import { LoginService } from "app/security/login/login.service";

@Injectable()
export class OrderService {

    constructor(private shoppingCartService: ShoppingCartService,
                private http: HttpClient,
                private loginService: LoginService) {}

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
        let headers = new HttpHeaders();
        if(this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`);
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, { headers })
                .map(order => order.id);
    }

    clear() {
        this.shoppingCartService.clear();
    }
}
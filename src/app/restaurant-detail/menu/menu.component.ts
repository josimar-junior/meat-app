import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { MenuItem } from '../menu-item/menu-item.model';
import { RestaurantsService } from 'app/restaurants/restaurants.service';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>;

  constructor(private restaurantsService: RestaurantsService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.restaurantsService.getMenuOfRestaurant(this.router.parent.snapshot.params['id']);
  }

  addMenuItem(item: MenuItem) {
    console.log(item);
  }
}

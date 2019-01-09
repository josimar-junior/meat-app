import { RestaurantsService } from './restaurants.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Observable, from } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

import { Restaurant } from './restaurant/restaurant.model';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "40px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';

  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantsService: RestaurantsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.formBuilder.control('');
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(search => this.restaurantsService.getRestaurants(search)
          .pipe(catchError(error => from([]))))
      ).subscribe(restaurants => this.restaurants = restaurants);

    this.restaurantsService.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
}

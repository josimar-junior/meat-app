import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>;

  constructor(private restaurantsService: RestaurantsService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantsService.getReviewsOfRestaurant(this.router.parent.snapshot.params['id']);
  }

}

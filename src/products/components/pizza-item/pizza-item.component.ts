import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

import * as fromStore from '../../store';

@Component({
  selector: 'pizza-item',
  styleUrls: ['pizza-item.component.scss'],
  template: `
    <div class="pizza-item">
      <a [routerLink]="['/products', pizza.id]">
        <pizza-display
          [pizza]="pizza">
        </pizza-display>
        <h4>{{ pizza.name }}</h4>
        <button type="button" class="btn btn__ok">
          View Pizza
        </button>
      </a>
    </div>
  `,
})
export class PizzaItemComponent implements OnInit {
  // pizzas$: Observable<Pizza>;
  // visualise: Pizza;
  // toppings: Topping[];
  @Input() pizza: Pizza;
  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    // this.pizzas$ = this.store.select(fromStore.getPizzasEntities);
    // this.store.dispatch(new fromStore.LoadToppings());
  }
}

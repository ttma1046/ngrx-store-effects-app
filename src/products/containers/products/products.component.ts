import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Pizza } from '../../models/pizza.model';

import * as fromStore from '../../store';

@Component({  
  selector: 'products',
  styleUrls: ['products.component.scss'],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    /*
    this.store.select<any>('products').subscribe(state => { 
      console.log(state);
    })
    */
    /*
    this.store.select(fromStore.getAllPizzas).subscribe(state => {
      // this.pizzas = state;


    })
    */

    this.pizzas$ = this.store.select(fromStore.getAllPizzas);

    this.store.dispatch(new fromStore.LoadPizzas());

    this.store.dispatch(new fromStore.LoadToppings());
  }
}

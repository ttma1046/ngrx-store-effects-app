import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

import * as fromStore from '../../store';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(
    /*
    private pizzaService: PizzasService,
    private toppingsService: ToppingsService,
    private route: ActivatedRoute,
    private router: Router
    */
    private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    // this.store.dispatch(new fromStore.LoadToppings());
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza = null) => {
        // '/products/new'
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists ? pizza.toppings.map(topping => topping.id) : [];
        this.store.dispatch(new fromStore.VisualiseToppings(toppings));
      })
    );
    
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getPizzaVisualised);

    /*
    this.pizzaService.getPizzas().subscribe(pizzas => {
      const param = this.route.snapshot.params.id;
      let pizza;
      if (param === 'new') {
        pizza = {};
      } else {
        pizza = pizzas.find(pizza => pizza.id == parseInt(param, 10));
      }
      this.pizza = pizza;
      this.toppingsService.getToppings().subscribe(toppings => {
        this.toppings = toppings;
        this.onSelect(toppings.map(topping => topping.id));
      });
    });
    */
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.VisualiseToppings(event));

    /*
    let toppings;
    if (this.toppings && this.toppings.length) {
      toppings = event.map(id =>
        this.toppings.find(topping => topping.id === id)
      );
    } else {
      toppings = this.pizza.toppings;
    }
    this.visualise = { ...this.pizza, toppings };
    */
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
    /*
    this.pizzaService.createPizza(event).subscribe(pizza => {
      this.router.navigate([`/products/${pizza.id}`]);
    });
    */
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.UpdatePizza(event));
    /*
    this.pizzaService.updatePizza(event).subscribe(() => {
      this.router.navigate([`/products`]);
    });
    */ 
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');

    if (remove) {
      this.store.dispatch(new fromStore.RemovePizza(event));
    }
    /*
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.pizzaService.removePizza(event).subscribe(() => {
        this.router.navigate([`/products`]);
      });
    }
    */
  }
}

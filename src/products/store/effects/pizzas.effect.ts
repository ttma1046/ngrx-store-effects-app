import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as pizzaActions from '../actions/pizzas.action';

import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
    constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {

    }

    @Effect()
    loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
        .pipe(
            switchMap(() => {
                return this.pizzaService
                    .getPizzas()
                    .pipe(
                        map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
                        catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
                    );
            })
        );

    @Effect()
    createPizzas$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA)
        .pipe(
            map((action: pizzaActions.CreatePizza) => action.payload),
            switchMap(pizza => {
                    return this.pizzaService
                    .createPizza(pizza)
                    .pipe(
                        map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
                        catchError(error => of(new pizzaActions.CreatePizzaFail(pizza)))
                    )
               })
            );
}


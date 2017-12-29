import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

export interface ProductsState {
    pizzas: fromPizzas.PizzaState,
    toppings: fromToppings.ToppingsState
}

export const reducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzas.reducer,
    toppings: fromToppings.reducer

}

export const getProductsState = createFeatureSelector<ProductsState>(
    'products'
    );

export const getPizzaState = createSelector(
    getProductsState,
    (state: ProductsState) => state.pizzas
);

export const getPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);

export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);

export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);


/*
const state: { products: ProductsState } = {
    products: {
        pizzas: {
            data: [],
            loaded: false,
            loading: false
        }
    }
}
*/
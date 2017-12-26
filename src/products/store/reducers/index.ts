import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';

export interface ProductsState {
    pizzas: fromPizzas.PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzas.reducer
}

export const getProductsState = createFeatureSelector<ProductsState>(
    'products'
    );

export const getPizzaState = createSelector(
    getProductsState,
    (state: ProductsState) => state.pizzas
);

export const getAllPizzas = createSelector(getPizzaState, fromPizzas.getPizzas);
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
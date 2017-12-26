import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
    data: Pizza[],
    loaded: boolean,
    loading: boolean
}


export const initialState: PizzaState = {
    data: [
        {
            name: "Seaside Surfin",
            toppings: [
                {
                    id: 6,
                    name: 'mushroom'
                }
            ]
        }
    ],
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState, 
    action: fromPizzas.PizzasAction
    ): PizzaState {

    switch (action.type) {
        case fromPizzas.LOAD_PIZZAS: {
            return {
                ...state,
                loading: true,

            }
        }
        case fromPizzas.LOAD_PIZZAS_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true
            }
        }
        case fromPizzas.LOAD_PIZZAS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
        default:
            // code...
            break;
    }

    return state;
}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
    // data: Pizza[],
    entities: { [id: number]: Pizza },
    loaded: boolean,
    loading: boolean
}

export const initialState: PizzaState = {
    entities: {},
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
            console.log(action.payload);
            const pizzas = action.payload;

            const entities = pizzas.reduce(
                (entities: { [id: number]: Pizza }, pizza: Pizza) => {
                    return {
                        ...entities,
                        [pizza.id]: pizza
                    }
                }, 
                {
                    ...state.entities
                }
            );
            
            const pizza: any = {
                1: {
                    id: 1,
                    name: 'Pizza',
                    toppings: ['test']
                }
            }

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            }
        }
        case fromPizzas.LOAD_PIZZAS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
        case fromPizzas.UPDATE_PIZZA_SUCCESS:
        case fromPizzas.CREATE_PIZZA_SUCCESS: {
            const pizza = action.payload;
            const entities = {
                ...state.entities,
                [pizza.id]: pizza
            };

            return {
                ...state,
                entities
            };
        }

        case fromPizzas.REMOVE_PIZZA_SUCCESS: {
            const pizza = action.payload;
            const { [pizza.id]: removed, ...entities } = state.entities;

            return {
                ...state,
                entities
            }
        }
        default:
            // code...
            break;
    }

    return state;
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
import { initialState } from './toppings.reducer';
import * as fromToppings from './toppings.reducer';
import * as fromActions from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';

describe('ToppingsReducer', () => {
    describe('undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = fromToppings;

            const action = {} as any;

            const state = fromToppings.reducer(undefined, action);

            expect(state).toBe(initialState)
        });
    });

    describe('LOAD_TOPPINGS action', () => {
        it('should set loading to true', () => {
            const { initialState } = fromToppings;

            const action = new fromActions.LoadToppings();

            const state = fromToppings.reducer(initialState, action);

            expect(state.entities).toEqual({});
            expect(state.loaded).toEqual(false);
            expect(state.loading).toEqual(true);
        });
    });

    describe('LOAD_TOPPINGS_SUCCESS action', () => {
        it('should map an aaray to entities', () => {
            const toppings: Topping[] = [
                { id: 1, name: 'Topping #1' }, 
                { id: 2, name: 'Topping #2' }, 
                { id: 3, name: 'Topping #3' }, 
                { id: 4, name: 'Topping #4' }, 
            ];

            const entities = {
                1: toppings[0],
                2: toppings[1],
                3: toppings[2],
                4: toppings[3]
            }

            const { initialState } = fromToppings;

            const action = new fromActions.LoadToppingsSuccess(toppings);

            const state = fromToppings.reducer(initialState, action);

            expect(state.entities).toEqual(entities);
            expect(state.loaded).toEqual(true);
            expect(state.loading).toEqual(false);
        });
    });

    describe('LOAD_TOPPINGS_FAIL action', () => {
        it('should set loading and loaded to false', () => {
            const { initialState } = fromToppings;
            const payload = { message: 'Load Error'};
            const action = new fromActions.LoadToppingsFail(payload);

            const state = fromToppings.reducer(initialState, action);

            expect(state.entities).toEqual({});
            expect(state.loaded).toEqual(false);
            expect(state.loading).toEqual(false);
        });
    });

    describe('ToppingsReducer Selectors', () => {
        describe('getToppingEntities', () => {
            it('should return .entities', () => {
                const entities: { [key: number]: Topping } = {
                    1: {id: 1, name: 'Topping #1'},
                    2: {id: 2, name: 'Topping #2'},
                };
            
                const { initialState } = fromToppings;
                const previousState = { ...initialState, entities };
                const slice = fromToppings.getToppingsEntities(previousState);

                expect(slice).toEqual(entities);
            })
        });
    });
})
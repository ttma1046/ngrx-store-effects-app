import * as fromPizzas from './pizzas.action';

describe('Pizzas Actions', () => {
    describe('LoadPizzas Actions', () => {
        describe('LoadPizzas', () => {
            it('should create a load pizza action', () => {
                const action = new fromPizzas.LoadPizzas();

                expect({ ...action }).toEqual({
                    type: fromPizzas.LOAD_PIZZAS,
                });
            });
        });

        describe('LoadPizzasFail', () => {
            it('should create a load pizza fail action', () => {
                const payload = { message: 'Load Error'};
                const action = new fromPizzas.LoadPizzasFail(payload);

                expect({ ...action }).toEqual({
                    type: fromPizzas.LOAD_PIZZAS_FAIL,
                    payload
                });
            });
        });

        
        describe('LoadPizzasSuccess', () => {
            it('should create a load pizza success action', () => {
                const payload = [{
                    "name": "Blazin' Inferno",
                    "toppings": [
                      {
                        "id": 10,
                        "name": "pepperoni"
                      },
                      {
                        "id": 9,
                        "name": "pepper"
                      },
                      {
                        "id": 3,
                        "name": "basil"
                      },
                      {
                        "id": 4,
                        "name": "chili"
                      },
                      {
                        "id": 7,
                        "name": "olive"
                      },
                      {
                        "id": 5,
                        "name": "mozzarella"
                      },
                      {
                        "id": 1,
                        "name": "anchovy"
                      }
                    ],
                    "id": 1
                  }];
                const action = new fromPizzas.LoadPizzasSuccess(payload);

                expect({ ...action }).toEqual({
                    type: fromPizzas.LOAD_PIZZAS_SUCCESS,
                    payload
                });
            });
        });
    });
});
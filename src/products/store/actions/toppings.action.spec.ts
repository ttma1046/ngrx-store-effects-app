import * as fromToppings from './toppings.action';

describe('Toppings Actions', () => {
    describe('LoadToppings Actions', () => {
        describe('LoadToppings', () => {
            it('should create a load pizza action', () => {
                const action = new fromToppings.LoadToppings();

                expect({ ...action }).toEqual({
                    type: fromToppings.LOAD_TOPPINGS,
                });
            });
        });

        describe('LoadToppingsFail', () => {
            it('should create a load pizza fail action', () => {
                const payload = { message: 'Load Error'};
                const action = new fromToppings.LoadToppingsFail(payload);

                expect({ ...action }).toEqual({
                    type: fromToppings.LOAD_TOPPINGS_FAIL,
                    payload
                });
            });
        });

        describe('LoadToppingsSuccess', () => {
            it('should create a load pizza success action', () => {
                const payload = [
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
                  ];
                const action = new fromToppings.LoadToppingsSuccess(payload);

                expect({ ...action }).toEqual({
                    type: fromToppings.LOAD_TOPPINGS_SUCCESS,
                    payload
                });
            });
        });

        describe('VisualiseToppings Actions', () => {
            describe('VisualiseToppings', () => {
                it('should create an action', () => {
                    const action = new fromToppings.VisualiseToppings([1, 2, 3]);
                    expect({ ...action }).toEqual({
                        type: fromToppings.VISUALISE_TOPPINGS,
                        payload: [1, 2, 3],
                    })
                })
            })
        });
    });
});
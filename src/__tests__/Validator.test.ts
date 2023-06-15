import { Validator } from '../index';

test('checking min', () => {

    test('possitive test', () => {

        const values = [];
        const params = [];

        for (const value of values) {
            test(`value = ` + value, () => {


                expect(new Validator(value).greaterThan(params[1]).validate()).toBe(true)
            });
        }
        expect(new Validator('Carl')).toBe('Hello Carl');
    });

    test('negative test', () => {


    });

    const values = [];

});

import { Id } from '../id.value-object';

describe('Id Value Object', () => {
	it(`
        GIVEN a valid id
        WHEN I create a new id
        THEN the id value object is created
    `, () => {
		// GIVEN
		const idValid = '550e8400-e29b-41d4-a716-446655440000';
		// WHEN
		const newId = new Id(idValid);
		// THEN
		expect(newId.value).toBe(idValid);
	});

	it(`
        GIVEN an invalid id
        WHEN I create a new id
        THEN an error is thrown
    `, () => {
		// GIVEN
		const idInvalid = 'invalid-id';
		// WHEN
		const newId = () => new Id(idInvalid);
		// THEN
		expect(newId).toThrow(`Invalid ID format: "${idInvalid}"`);
	});

	it(`
        GIVEN no id
        WHEN I create a new id
        THEN an id is generated
    `, () => {
		// GIVEN
		// WHEN
		const newId = new Id();
		// THEN
		expect(newId.value).toBeDefined();
	});
});

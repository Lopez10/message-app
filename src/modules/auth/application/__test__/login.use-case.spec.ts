import { User } from '@modules/user/domain/user.entity';

describe('Login Use Case', () => {
	it(`
        GIVEN a valid email and password
        WHEN I call the login use case
        THEN I should receive a token
    `, () => {
		// GIVEN
		const email = 'test@test.com';
		const password = '1234PasswordValid';
	});
});

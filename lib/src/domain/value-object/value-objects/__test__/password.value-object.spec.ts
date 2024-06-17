import { Password } from '@lib';

describe('Password value object test', () => {
	it(`
    GIVEN a text with numbers, uppercase and lowercase and a length between 8 and 50
    WHEN I write the valid password
    THEN the password value object is created
  `, () => {
		// GIVEN
		const passwordValid = '1234PasswordValid';

		// WHEN
		const newPassword = new Password({ value: passwordValid });

		// THEN
		expect(newPassword.compare('1234PasswordValid')).toBeTruthy();
	});

	it(`
    GIVEN a text with numbers, uppercase and a length between 8 and 50
    WHEN I write the invalid password
    THEN the password value object is not created
  `, () => {
		// GIVEN
		const passwordInvalid = '1234PASSWORD';

		// WHEN
		const newPassword = () => new Password({ value: passwordInvalid });

		// THEN
		expect(newPassword).toThrow(
			'Password must contain at least one lowercase letter.',
		);
	});

	it(`
    GIVEN a text with numbers, lowercase and a length between 8 and 50
    WHEN I write the invalid password
    THEN the password value object is not created
  `, () => {
		// GIVEN
		const passwordInvalid = '1234password';

		// WHEN
		const newPassword = () => new Password({ value: passwordInvalid });

		// THEN
		expect(newPassword).toThrow(
			'Password must contain at least one uppercase letter.',
		);
	});

	it(`
    GIVEN a text with lowercase, uppercase and a length between 8 and 50
    WHEN I write the invalid password
    THEN the password value object is not created
  `, () => {
		// GIVEN
		const passwordInvalid = 'passwordPASSWORD';

		// WHEN
		const newPassword = () => new Password({ value: passwordInvalid });

		// THEN
		expect(newPassword).toThrow('Password must contain at least one number.');
	});

	it(`
    GIVEN a text with numbers, lowercase, uppercase and a length under 8
    WHEN I write the invalid password
    THEN the password value object is not created
  `, () => {
		// GIVEN
		const passwordInvalid = '12asV';

		// WHEN
		const newPassword = () => new Password({ value: passwordInvalid });

		// THEN
		expect(newPassword).toThrow('Password must be at least 8 characters long.');
	});

	it(`
    GIVEN a text with numbers, lowercase, uppercase and a length over 50
    WHEN I write the invalid password
    THEN the password value object is not created
  `, () => {
		// GIVEN
		const passwordInvalid = '12asV'.repeat(15);

		// WHEN
		const newPassword = () => new Password({ value: passwordInvalid });

		// THEN
		expect(newPassword).toThrow('Password must be at most 50 characters long');
	});
});

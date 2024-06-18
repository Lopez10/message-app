import { Password } from '../password.value-object';
import {
	PasswordTooLongException,
	PasswordTooShortException,
	PasswordWithoutLowercaseException,
	PasswordWithoutNumberException,
	PasswordWithoutUppercaseException,
} from '../password.value-object.exceptions';

describe('Password value object test', () => {
	it(`
		GIVEN a text with numbers, uppercase and lowercase and a length between 8 and 50
		WHEN I write the valid password
		THEN the password value object is created
	`, () => {
		// GIVEN
		const passwordValid = '1234PasswordValid';

		// WHEN
		const newPassword = Password.create(passwordValid).get();

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
		const newPassword = Password.create(passwordInvalid).getLeft();

		// THEN
		expect(newPassword).toBeInstanceOf(PasswordWithoutLowercaseException);
	});

	it(`
		GIVEN a text with numbers, lowercase and a length between 8 and 50
		WHEN I write the invalid password
		THEN the password value object is not created
	`, () => {
		// GIVEN
		const passwordInvalid = '1234password';

		// WHEN
		const newPassword = Password.create(passwordInvalid).getLeft();

		// THEN
		expect(newPassword).toBeInstanceOf(PasswordWithoutUppercaseException);
	});

	it(`
		GIVEN a text with lowercase, uppercase and a length between 8 and 50
		WHEN I write the invalid password
		THEN the password value object is not created
	`, () => {
		// GIVEN
		const passwordInvalid = 'passwordPASSWORD';

		// WHEN
		const newPassword = Password.create(passwordInvalid).getLeft();

		// THEN
		expect(newPassword).toBeInstanceOf(PasswordWithoutNumberException);
	});

	it(`
		GIVEN a text with numbers, lowercase, uppercase and a length under 8
		WHEN I write the invalid password
		THEN the password value object is not created
	`, () => {
		// GIVEN
		const passwordInvalid = '12asV';

		// WHEN
		const newPassword = Password.create(passwordInvalid).getLeft();

		// THEN
		expect(newPassword).toBeInstanceOf(PasswordTooShortException);
	});

	it(`
		GIVEN a text with numbers, lowercase, uppercase and a length over 50
		WHEN I write the invalid password
		THEN the password value object is not created
	`, () => {
		// GIVEN
		const passwordInvalid = '12asV'.repeat(15);

		// WHEN
		const newPassword = Password.create(passwordInvalid).getLeft();

		// THEN
		expect(newPassword).toBeInstanceOf(PasswordTooLongException);
	});
});

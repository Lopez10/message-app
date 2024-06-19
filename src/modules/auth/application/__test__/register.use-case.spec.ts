import { JwtTokenServiceMock } from '@modules/auth/domain/__test__/jwt-token.service.mock';
import { AuthMemoryRepository } from '@modules/auth/infrastructure/auth.memory.repository';
import { UserMemoryRepository } from '@modules/user/infrastructure/user.memory.repository';
import { Register } from '../register/register.use-case';
import { Email } from '@modules/user/domain/email.value-object';

describe('Register Use Case', () => {
	it(`
        GIVEN a valid email, password and name
        WHEN I call the register use case
        THEN I should receive a token
        AND the user should be created in the database
    `, async () => {
		const password = '12345TestValid';
		const email = 'test@valid.com';
		const authRepository = new AuthMemoryRepository();
		const userRepository = new UserMemoryRepository();
		const jwtService = new JwtTokenServiceMock();

		const registerUseCase = new Register(
			authRepository,
			userRepository,
			jwtService,
		);

		// GIVEN
		const registerDto = {
			email,
			password,
			name: 'Test Name',
		};

		// WHEN
		const result = await registerUseCase.run(registerDto);

		// THEN
		expect(result.isRight()).toBeTruthy();
		expect(result.get()).toContain('Bearer');

		// AND
		const user = await userRepository.findByEmail(Email.create(email).get());
		expect(user).toBeDefined();
		expect(user.email.value).toEqual(email);

		const auth = await authRepository.findByUserId(user.id);
		expect(auth).toBeDefined();
		expect(auth.password.compare(password)).toBeTruthy();
	});

	it(`
        GIVEN an invalid email
        WHEN I call the register use case
        THEN I should receive an error
    `, async () => {});

	it(`
        GIVEN an invalid password
        WHEN I call the register use case
        THEN I should receive an error
    `, async () => {});
});

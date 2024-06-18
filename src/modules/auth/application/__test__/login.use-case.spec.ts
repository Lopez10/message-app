import { JwtTokenServiceMock } from '@modules/auth/domain/__test__/jwt-token.service.mock';
import { AuthMemoryRepository } from '@modules/auth/infrastructure/auth.memory.repository';
import { UserMemoryRepository } from '@modules/user/infrastructure/user.memory.repository';
import { Login } from '../login.use-case';
import { AuthMother } from '@modules/auth/infrastructure/__test__/auth.mother';
import { UserMother } from '@modules/user/infrastructure/__test__/user.mother';
import { InvalidUsernameOrPasswordException } from '@lib';

describe('Login Use Case', () => {
	it(`
		GIVEN a valid email and password
		WHEN I call the login use case
		THEN I should receive a token
	`, async () => {
		const password = '12345TestValid';
		const email = 'test@valid.com';
		const authRepository = new AuthMemoryRepository();
		const userRepository = new UserMemoryRepository();
		const jwtService = new JwtTokenServiceMock();

		await authRepository.insert(
			AuthMother.create({ password: { value: password } }),
		);
		await userRepository.insert(UserMother.create({ email }));

		const loginUseCase = new Login(authRepository, userRepository, jwtService);

		// GIVEN
		const loginDto = {
			email,
			password,
		};

		// WHEN
		const result = await loginUseCase.run(loginDto);

		// THEN
		expect(result.isRight()).toBeTruthy();
		expect(result.get()).toEqual(
			'Bearer 38010560-d08f-42d8-a3e5-72d55aa51e07.test@valid.com.test',
		);
	});

	it(`
		GIVEN an invalid email
		WHEN I call the login use case
		THEN I should receive an error
	`, async () => {
		const password = '12345TestValid';
		const email = 'test@valid.com';

		const authRepository = new AuthMemoryRepository();
		const userRepository = new UserMemoryRepository();
		const jwtService = new JwtTokenServiceMock();

		await authRepository.insert(
			AuthMother.create({ password: { value: password } }),
		);
		await userRepository.insert(UserMother.create({ email }));

		const loginUseCase = new Login(authRepository, userRepository, jwtService);

		// GIVEN
		const loginDto = {
			email: 'test@invalid.com',
			password,
		};

		// WHEN
		const result = await loginUseCase.run(loginDto);

		// THEN
		expect(result.isLeft()).toBeTruthy();
	});

	it(`
		GIVEN an invalid password
		WHEN I call the login use case
		THEN I should receive an error
	`, async () => {
		const password = '12345TestValid';
		const email = 'test@Valid.com';

		const authRepository = new AuthMemoryRepository();
		const userRepository = new UserMemoryRepository();
		const jwtService = new JwtTokenServiceMock();

		await authRepository.insert(
			AuthMother.create({ password: { value: password } }),
		);
		await userRepository.insert(UserMother.create({ email }));

		const loginUseCase = new Login(authRepository, userRepository, jwtService);

		// GIVEN
		const loginDto = {
			email,
			password: '12345TestInvalid',
		};

		// WHEN
		const result = await loginUseCase.run(loginDto);

		// THEN
		expect(result.isLeft()).toBeTruthy();
		expect(result.getLeft()).toBeInstanceOf(InvalidUsernameOrPasswordException);
	});
});

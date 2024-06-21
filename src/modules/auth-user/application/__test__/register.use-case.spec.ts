import { JwtTokenServiceMock } from '@modules/auth/domain/__test__/jwt-token.service.mock';
import { AuthMemoryRepository } from '@modules/auth/infrastructure/auth.memory.repository';
import { UserMemoryRepository } from '@modules/user/infrastructure/user.memory.repository';
import { Register } from '../register/register.use-case';
import { Email } from '@modules/user/domain/email.value-object';
import { InvalidEmailFormatException } from '@modules/user/domain/email.value-object.exception';
import { InvalidPasswordFormatException } from '@modules/auth/domain/password.value-object.exceptions';
import { AuthMother } from '@modules/auth/infrastructure/__test__/auth.mother';
import { UserMother } from '@modules/user/infrastructure/__test__/user.mother';
import { UserAlreadyExistsException } from '../register/register.use-case.exception';

describe('Register Use Case', () => {
	let authRepository: AuthMemoryRepository;
	let userRepository: UserMemoryRepository;
	let jwtService: JwtTokenServiceMock;

	beforeEach(() => {
		authRepository = new AuthMemoryRepository();
		userRepository = new UserMemoryRepository();
		jwtService = new JwtTokenServiceMock();
	});

	it(`
        GIVEN a valid email, password and name
        WHEN I call the register use case
        THEN I should receive a token
        AND the user should be created in the database
    `, async () => {
		const password = '12345TestValid';
		const email = 'test@valid.com';

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
		expect(result.get().accessToken).toContain('Bearer');

		// AND
		const user = await userRepository.findByEmail(Email.create(email).get());
		expect(user).toBeDefined();
		expect(user.email.value).toEqual(email);

		const auth = await authRepository.findByUserId(user.id);
		expect(auth).toBeDefined();
		expect(auth.get().password.compare(password)).toBeTruthy();
	});

	it(`
        GIVEN an invalid email
        WHEN I call the register use case
        THEN I should receive an error
    `, async () => {
		const password = '12345TestValid';
		const email = 'invalid-email';

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
		expect(result.isLeft()).toBeTruthy();
		expect(result.getLeft()).toBeInstanceOf(InvalidEmailFormatException);
	});

	it(`
        GIVEN an invalid password
        WHEN I call the register use case
        THEN I should receive an error
    `, async () => {
		const password = '12345';
		const email = 'test@valid.com';

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
		expect(result.isLeft()).toBeTruthy();
		expect(result.getLeft()).toBeInstanceOf(InvalidPasswordFormatException);
	});

	it(`
		GIVEN an email that already exists
		WHEN I call the register use case
		THEN I should receive an error
	`, async () => {
		const password = '12345TestValid';
		const email = 'test@valid.com';

		const registerUseCase = new Register(
			authRepository,
			userRepository,
			jwtService,
		);

		await authRepository.insert(AuthMother.create({}));
		await userRepository.insert(UserMother.create({ email }));

		// GIVEN
		const registerDto = {
			email,
			password,
			name: 'Test Name',
		};

		// WHEN
		const result = await registerUseCase.run(registerDto);

		// THEN
		expect(result.isLeft()).toBeTruthy();
		expect(result.getLeft()).toBeInstanceOf(UserAlreadyExistsException);
	});
});

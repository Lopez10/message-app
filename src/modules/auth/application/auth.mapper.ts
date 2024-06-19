import { Id } from '@lib';
import { AuthPrimitives, Auth } from '@modules/auth/domain/auth.entity';
import { Password } from '@modules/auth/domain/password.value-object';
import { ApiProperty } from '@nestjs/swagger';

export class AuthMapper {
	static toDomain(authDto: AuthPrimitives): Auth {
		return Auth.create(
			{
				userId: new Id(authDto.userId),
				password: Password.create(authDto.password).get(),
			},
			new Id(authDto.id),
		).get();
	}

	static persistanceToDomain(authDto: AuthPrimitives): Auth {
		return Auth.create(
			{
				userId: new Id(authDto.userId),
				password: Password.rehydrate(authDto.password),
			},
			new Id(authDto.id),
		).get();
	}

	static toDto(auth: Auth): AuthPrimitives {
		return {
			id: auth.id.value,
			userId: auth.userId.value,
			password: auth.password.value,
		};
	}
}

export class RegisterDto {
	@ApiProperty({
		example: 'test@test.com',
		description: 'The email of the user',
	})
	email: string;

	@ApiProperty({
		example: '12345TestValid',
		description: 'The password of the user',
	})
	password: string;

	@ApiProperty({
		example: 'Test Name',
		description: 'The name of the user',
	})
	name: string;
}

export class LoginDto {
	@ApiProperty({
		example: 'test@test.com',
		description: 'The email of the user',
	})
	email: string;

	@ApiProperty({
		example: '12345TestValid',
		description: 'The password of the user',
	})
	password: string;
}

export class TokenResponse {
	@ApiProperty({
		example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
		description: 'The access token of the user',
	})
	accessToken: string;
}

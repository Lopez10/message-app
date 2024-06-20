import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBody {
	@ApiProperty({
		example: 'John Doe',
		description: 'User name',
		required: true,
	})
	name: string;

	@ApiProperty({
		example: 'test@test.com',
		description: 'User email',
		required: true,
	})
	email: string;
}

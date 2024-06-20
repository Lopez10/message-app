import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageBodyDto {
	@ApiProperty({
		example: 'Hello, world!',
		description: 'The message to be sent',
		required: true,
	})
	content: string;

	@ApiProperty({
		example: '40735409-a410-4aa8-b26a-242dc4399899',
		description: 'The receiver id',
		required: true,
	})
	receiverId: string;
}

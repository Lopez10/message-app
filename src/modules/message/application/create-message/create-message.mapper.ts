import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
	@ApiProperty({
		example: 'Hello',
		description: 'Message content',
		required: true,
	})
	content: string;

	@ApiProperty({
		example: '1',
		description: 'Origin user id',
		required: true,
	})
	originUserId: string;

	@ApiProperty({
		example: '2',
		description: 'Destination user id',
		required: true,
	})
	destinationUserId: string;
}

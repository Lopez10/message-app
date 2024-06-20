import {
	UserRepositoryPortSymbol,
	UserRepositoryPort,
} from '@modules/user/domain/user.repository.port';
import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
	MessageRepositoryPortSymbol,
	MessageRepositoryPort,
} from '../domain/message.repository.port';

@ApiTags('message')
@Controller('message')
export class MessageController {
	constructor(
		@Inject(MessageRepositoryPortSymbol)
		private readonly messageRepository: MessageRepositoryPort,
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserRepositoryPort,
	) {}
}

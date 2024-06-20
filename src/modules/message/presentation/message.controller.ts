import {
	UserRepositoryPortSymbol,
	UserRepositoryPort,
} from '@modules/user/domain/user.repository.port';
import {
	Body,
	Controller,
	HttpException,
	Inject,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	MessageRepositoryPortSymbol,
	MessageRepositoryPort,
} from '../domain/message.repository.port';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { CreateMessageBodyDto } from './message.dto';
import { CreateMessage } from '../application/create-message/create-message.use-case';
import { CreateMessageDto } from '../application/create-message/create-message.mapper';

@ApiTags('message')
@Controller('message')
export class MessageController {
	constructor(
		@Inject(MessageRepositoryPortSymbol)
		private readonly messageRepository: MessageRepositoryPort,
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserRepositoryPort,
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	@ApiBearerAuth()
	@ApiResponse({
		status: 201,
		description: 'Message created',
	})
	async create(
		@Request() req,
		@Body() createMessageBodyDto: CreateMessageBodyDto,
	) {
		const createMessage = new CreateMessage(
			this.messageRepository,
			this.userRepository,
		);

		const createMessageDto: CreateMessageDto = {
			content: createMessageBodyDto.content,
			senderId: req.user.id,
			receiverId: createMessageBodyDto.receiverId,
		};

		const messageCreated = await createMessage.run(createMessageDto);

		if (messageCreated.isLeft()) {
			const error = messageCreated.getLeft();
			throw new HttpException(error.message, 500);
		}

		return messageCreated.get();
	}
}

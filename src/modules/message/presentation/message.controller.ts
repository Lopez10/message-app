import {
	UserRepositoryPortSymbol,
	UserRepositoryPort,
} from '@modules/user/domain/user.repository.port';
import {
	Body,
	Controller,
	Get,
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
import { MessagePrismaRepository } from '../infrastructure/message.prisma.repository';
import { UserPrismaRepository } from '@modules/user/infrastructure/user.prisma.repository';
import { MessageDto } from '../application/message.mapper';
import { GetAllMessages } from '../application/get-all/get-all-messages.use-case';
import { CreateNotification } from '@modules/notification/application/create-notification/create-notification.use-case';
import {
	NotificationRepositoryPort,
	NotificationRepositoryPortSymbol,
} from '@modules/notification/domain/notification.repository.port';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
	constructor(
		@Inject(MessageRepositoryPortSymbol)
		private readonly messageRepository: MessagePrismaRepository,
		@Inject(UserRepositoryPortSymbol)
		private readonly userRepository: UserPrismaRepository,
		@Inject(NotificationRepositoryPortSymbol)
		private readonly notificationRepository: NotificationRepositoryPort,
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

		const createNotification = new CreateNotification(
			this.notificationRepository,
		);

		const createMessageDto: CreateMessageDto = {
			content: createMessageBodyDto.content,
			senderId: req.user.id,
			receiverId: createMessageBodyDto.receiverId,
		};

		const messageCreated = await createMessage.run(createMessageDto);
		const notificationCreated = await createNotification.run({
			userId: createMessageBodyDto.receiverId,
			message: createMessageBodyDto.content,
			isRead: false,
		});

		if (messageCreated.isLeft()) {
			const error = messageCreated.getLeft();
			throw new HttpException(error.message, 500);
		}

		if (notificationCreated.isLeft()) {
			const error = notificationCreated.getLeft();
			throw new HttpException(error.message, 500);
		}

		return {
			message: 'Message created and notification sent',
		};
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: 'Get all messages',
		type: [MessageDto],
	})
	async getAll(@Request() req) {
		const getAllMessagesDto = {
			userId: req.user.id,
		};

		const getAllMessages = new GetAllMessages(
			this.messageRepository,
			this.userRepository,
		);

		const messages = await getAllMessages.run(getAllMessagesDto);

		// if (messages.isLeft()) {
		// 	const error = messages.getLeft();
		// 	throw new HttpException(error.message, 500);
		// }

		return messages.get();
	}
}

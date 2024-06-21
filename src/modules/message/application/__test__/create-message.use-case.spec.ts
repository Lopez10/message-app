import { UserMother } from '@modules/user/infrastructure/__test__/user.mother';
import { UserMemoryRepository } from '@modules/user/infrastructure/user.memory.repository';
import { CreateMessage } from '../create-message/create-message.use-case';
import { MessageMemoryRepository } from '@modules/message/infrastructure/message.memory.repository';
import { CreateMessageDto } from '../create-message/create-message.mapper';
import { Id } from '@lib';
import {
	UserReceiverIsNotActiveException,
	UserReceiverNotFoundException,
} from '../message.exception';

describe('Create Message Use Case', () => {
	let userRepository: UserMemoryRepository;
	let messageRepository: MessageMemoryRepository;

	beforeEach(() => {
		userRepository = new UserMemoryRepository();
		messageRepository = new MessageMemoryRepository();
	});
	it(`
        GIVEN a valid message, a correct sender id, a correct receiver id with active status
        WHEN I call the create message use case
        THEN the message should be created in the database
    `, async () => {
		// GIVEN
		const content = 'Test message';

		const senderId = '40735409-a410-4aa8-b26a-242dc4399899';
		const senderEmail = 'sender@test.com';

		const receiverId = '49391d67-fa31-4074-b2a1-159beb8d9c8b';
		const receiverEmail = 'receiver@test.com';

		await userRepository.insert(
			UserMother.create({ id: senderId, email: senderEmail }),
		);
		await userRepository.insert(
			UserMother.create({ id: receiverId, email: receiverEmail }),
		);

		const createMessageDto: CreateMessageDto = {
			content,
			senderId,
			receiverId,
		};

		// WHEN
		const createMesssage = new CreateMessage(messageRepository, userRepository);
		await createMesssage.run(createMessageDto);

		// THEN
		const messages = await messageRepository.findAllByReceiverId(
			new Id(receiverId),
		);
		expect(messages.get().length).toBe(1);
		expect(messages.get()[0].content).toBe(content);
	});

	it(`
        GIVEN a valid message, a correct sender id, a correct receiver id with inactive status
        WHEN I call the create message use case
        THEN an error should be thrown
    `, async () => {
		// GIVEN
		const content = 'Test message';

		const senderId = '40735409-a410-4aa8-b26a-242dc4399899';
		const senderEmail = 'sender@test.com';

		const receiverId = '49391d67-fa31-4074-b2a1-159beb8d9c8b';
		const receiverEmail = 'receiver@test.com';

		await userRepository.insert(
			UserMother.create({ id: senderId, email: senderEmail }),
		);
		await userRepository.insert(
			UserMother.create({
				id: receiverId,
				email: receiverEmail,
				isActive: false,
			}),
		);

		const createMessageDto: CreateMessageDto = {
			content,
			senderId,
			receiverId,
		};

		// WHEN
		const createMessage = new CreateMessage(messageRepository, userRepository);
		const message = await createMessage.run(createMessageDto);

		// THEN
		expect(message.isLeft()).toBeTruthy();
		expect(message.getLeft()).toBeInstanceOf(UserReceiverIsNotActiveException);
	});

	it(`
        GIVEN a valid message, a correct sender id, an incorrect receiver id
        WHEN I call the create message use case
        THEN an error should be thrown
    `, async () => {
		// GIVEN
		const content = 'Test message';

		const senderId = '40735409-a410-4aa8-b26a-242dc4399899';
		const senderEmail = 'sender@test.com';

		const receiverId = '49391d67-fa31-4074-b2a1-159beb8d9c8b';

		await userRepository.insert(
			UserMother.create({ id: senderId, email: senderEmail }),
		);

		const createMessageDto: CreateMessageDto = {
			content,
			senderId,
			receiverId,
		};

		// WHEN
		const createMessage = new CreateMessage(messageRepository, userRepository);
		const message = await createMessage.run(createMessageDto);

		// THEN
		expect(message.isLeft()).toBeTruthy();
		expect(message.getLeft()).toBeInstanceOf(UserReceiverNotFoundException);
	});
});

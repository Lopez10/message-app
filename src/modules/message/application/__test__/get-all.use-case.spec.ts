import { MessageMother } from '@modules/message/infrastructure/__test__/message.mother';
import { MessageMemoryRepository } from '@modules/message/infrastructure/message.memory.repository';
import { UserMother } from '@modules/user/infrastructure/__test__/user.mother';
import { UserMemoryRepository } from '@modules/user/infrastructure/user.memory.repository';
import { GetAllMessages } from '../get-all-messages/get-all-messages.use-case';

describe('Get All Messages Use Case', () => {
	let userRepository: UserMemoryRepository;
	let messageRepository: MessageMemoryRepository;

	beforeEach(() => {
		userRepository = new UserMemoryRepository();
		messageRepository = new MessageMemoryRepository();
	});

	it(`
        GIVEN a user id with messages
        WHEN I call the get all messages use case
        THEN it should return all messages for that user
    `, async () => {
		// GIVEN
		const userId = '40735409-a410-4aa8-b26a-242dc4399899';
		const user = UserMother.create({ id: userId });

		await userRepository.insert(user);

		const message1 = MessageMother.create({ receiverId: userId });
		const message2 = MessageMother.create({ receiverId: userId });

		await messageRepository.insert(message1);
		await messageRepository.insert(message2);

		// WHEN
		const getAllMessages = new GetAllMessages(
			messageRepository,
			userRepository,
		);
		const messages = await getAllMessages.run({ userId });

		// THEN
		expect(messages.isRight()).toBeTruthy();
		expect(messages.isLeft()).toBeFalsy();
		expect(messages.get().length).toBe(2);
	});
});

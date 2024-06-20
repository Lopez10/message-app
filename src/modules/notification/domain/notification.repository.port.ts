import { Id } from '@lib';
import { Notification } from './notification.entity';

export interface NotificationRepositoryPort {
	insert(notification: Notification): Promise<void>;
	findAllByUserId(userId: Id): Promise<Notification[]>;
}

export const NotificationRepositoryPortSymbol = Symbol(
	'NotificationRepositoryPort',
);

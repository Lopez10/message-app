export interface NotificationRepositoryPort {
	insert(notification: Notification): Promise<void>;
}

export const NotificationRepositoryPortSymbol = Symbol(
	'NotificationRepositoryPort',
);

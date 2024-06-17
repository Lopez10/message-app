import type { Paginated, PaginationQueryParams } from './pagination';
import type { Id } from './value-object';

export interface RepositoryPort<Entity> {
	insert(entity: Entity): Promise<Entity>;
	insertSome(entity: Entity[]): Promise<Entity[]>;
	findOneById(id: Id): Promise<Entity | null>;
	findAll(): Promise<Entity[]>;
	delete(id: Id): Promise<boolean>;
	findPaginationByCriteria(
		paginated: PaginationQueryParams,
		criteria?: unknown,
	): Promise<Paginated<Entity>>;
	update(entity: Entity): Promise<Entity>;
	transaction<T>(handler: () => Promise<T>): Promise<T>;
}

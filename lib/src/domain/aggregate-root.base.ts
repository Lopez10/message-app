import { Entity } from './entity.base';
import type { DomainEvent } from './event/domain-event';
import { DomainEvents } from './event/domain-events';
import type { Id } from './value-object';

export abstract class AggregateRoot<T> extends Entity<T> {
	private _domainEvents: DomainEvent[] = [];

	get id(): Id {
		return this._id;
	}

	get domainEvents(): DomainEvent[] {
		return this._domainEvents;
	}

	protected addDomainEvent(domainEvent: DomainEvent): void {
		this._domainEvents.push(domainEvent);

		DomainEvents.markAggregateForDispatch(this);
		this.logDomainEventAdded(domainEvent);
	}

	public clearEvents(): void {
		this._domainEvents.splice(0, this._domainEvents.length);
	}

	private logDomainEventAdded(domainEvent: DomainEvent): void {
		const thisClass = Reflect.getPrototypeOf(this);
		const domainEventClass = Reflect.getPrototypeOf(domainEvent);
		// console.info(
		//   `[Domain Event Created]:`,
		//   thisClass.constructor.name,
		//   '==>',
		//   domainEventClass.constructor.name,
		// );
	}
}

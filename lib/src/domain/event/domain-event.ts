import { Id } from '../value-object';

export interface DomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): Id;
}

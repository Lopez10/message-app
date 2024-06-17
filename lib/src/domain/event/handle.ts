export interface Handle<DomainEvent> {
  setupSubscriptions(): void;
}

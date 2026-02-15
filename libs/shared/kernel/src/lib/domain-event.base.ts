import { v4 as uuidv4 } from 'uuid';

export abstract class DomainEvent {
  public readonly id: string;
  public readonly occurredAt: Date;

  constructor(
    public readonly aggregateId: string,
    id?: string,
    occurredAt?: Date
  ) {
    this.id = id || uuidv4();
    this.occurredAt = occurredAt || new Date();
  }
}

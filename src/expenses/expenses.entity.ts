import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expenses')
export class Expense {
  @ObjectIdColumn() id: ObjectId;

  @Column() description: string;
  @Column() amount: number;
  @Column() userId: string; // Assume this is the user's ObjectId or a unique identifier

  @UpdateDateColumn() updatedAt: Date;

  constructor(expense?: Partial<Expense>) {
    Object.assign(this, expense);
  }
}

import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectId;
  @Column() name: string;
  @Column() password: string;
  @Column() email: string;
  @UpdateDateColumn() updatedAt: Date;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}

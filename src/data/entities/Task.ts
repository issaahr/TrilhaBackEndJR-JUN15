import { TaskStatus } from 'models/ENUMS/taskStatus';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity, User } from './index';

@Entity()
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.PENDING })
  status: TaskStatus;

  @ManyToOne(() => User, user => user.tasks)
  user: User;
}

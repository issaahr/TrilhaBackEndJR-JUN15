import { Column, Entity, ManyToOne } from 'typeorm';
import { TaskStatus } from '../../models';
import { BaseEntity, User } from './index';

@Entity()
export class Task extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({ type: 'varchar', enum: TaskStatus, default: TaskStatus.PENDING, nullable: false })
  status: string;

  @ManyToOne(() => User, user => user.tasks)
  user: User;
}

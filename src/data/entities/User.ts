import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity, Task } from './index';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];
}

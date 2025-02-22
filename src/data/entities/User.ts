import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity, Task } from './index';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];
}

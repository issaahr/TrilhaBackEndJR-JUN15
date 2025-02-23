import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword } from '../../helppers/passwordHelpper';
import { User } from '../entities';

export class CreateInitialUserMigration1740209279440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();

    user.name = 'Liara';
    user.email = process.env.USER_EMAIL;
    user.password = await hashPassword(process.env.USER_PASSWORD);

    await queryRunner.manager.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, { email: process.env.USER_EMAIL });
  }
}

import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/database/taskManagerDatabase.db',
  synchronize: true,
  logging: true,
  migrationsRun: true,
  entities: ['src/data/entities/**/*.ts'],
  migrations: ['src/data/migrations/**/*.ts']
});

export default AppDataSource;

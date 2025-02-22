import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/taskManagerDatabase.db',
  synchronize: true,
  logging: true,
  entities: ['src/data/entities/**/*.ts'],
  migrations: []
});

export default AppDataSource;

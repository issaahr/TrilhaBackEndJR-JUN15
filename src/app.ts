import 'dotenv/config';
import express from 'express';
import { errorMiddleware } from 'middlewares/errorMiddleware';
import 'reflect-metadata';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import AppDataSource from './config/datasource';
import { swaggerConfig } from './config/swagger';
import router from './routes/routes';

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Error connecting to database', err);
  });

app.use(express.json());
app.use(router);

const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/swagger.json', (_req, res) => res.send(swaggerSpec));

console.log(`Add swagger on /swagger`);

app.use(errorMiddleware);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});

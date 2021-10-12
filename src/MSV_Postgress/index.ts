import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { config } from '../configurations/index';
import router from './network';
const app: Application = express();

app.use(bodyParser.json());
// RUTAS
app.use('/', router);

app.listen(config.MSV_PSQL.host, () => {
  // eslint-disable-next-line prettier/prettier
  console.log('Servicio de mysql escuchando en el puerto', config.MSV_PSQL.port);
});

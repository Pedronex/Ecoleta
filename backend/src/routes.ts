import express from 'express';
import knex from './database/connection';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();
/*
  Rota: Endereço completo da requisição
  Recurso: Qual entidade que estamos acessando do sistema

  Get: Buscar uma ou mais informações do back-end
  Post: Criar uma nova informação no back-end
  Put: Atualizar uma informação existente no back-end
  Delete: Remover uma informações no back-end
 */

// Request Param: Parâmetros que vem na própria rota que identificam um recurso
// Query Param: Parâmetros que vem na própria rota geralmente opcionais
// para filtros, paginação
// Request Body: Parâmetros para criação/atualização de informações

// index, show, create/store, update, delete/destroy
routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);

export default routes;
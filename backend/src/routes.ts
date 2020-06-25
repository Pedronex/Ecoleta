import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

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
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.string().required(),
      longitude: Joi.string().required(),
      city: Joi.string().required().max(2),
      items: Joi.string().regex(/[0-9,]/g).required(),
    }),
  }, {
    abortEarly: false
  }),
  pointsController.create);

export default routes;
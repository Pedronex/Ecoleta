import express from 'express';
import knex from './database/connection';

const routes = express.Router();

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

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  // Transformando os dados para o usuario
  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }
  });

  return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = request.body;

  // Trasaction transação
  const trx = await knex.transaction();

  const insertedIds = await trx('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  const point_id = insertedIds[0]

  const pointItems = items.map((item_id: Number) => {
    return {
      item_id,
      point_id,
    }
  });

  await trx('point_items').insert(pointItems);

  return response.json({ message: true })
});

export default routes;
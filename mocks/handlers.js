import { rest } from 'msw';

const taskHandlers = [
  // create task
  rest.post('/api/v1/lists/:listId/tasks', (req, res, ctx) => {
    const { listId } = req.params;
    const { text } = req.body;
    return res(
      ctx.json({
        text, listId: Number(listId), id: 4, completed: false, touched: 1649792281363,
      }),
    );
  }),
  // delete task
  rest.delete('/api/v1/tasks/:taskId', (req, res, ctx) => res(ctx.status(200))),
  // patch task
  rest.patch('/api/v1/tasks/:taskId', (req, res, ctx) => {
    const { taskId } = req.params;
    const { completed } = req.body;
    return res(
      ctx.json({
        text: 'helll', listId: 1, id: taskId, completed, touched: 1649793308505,
      }),
    );
  }),
];

const listHandlers = [
  // create list
  rest.post('/api/v1/lists', (req, res, ctx) => {
    const { name } = req.body;
    return res(
      ctx.json({ name, removable: true, id: 4 }),
    );
  }),
  // delete list
  rest.delete('/api/v1/lists/:listId', (req, res, ctx) => res(ctx.status(200))),
];

export default [...taskHandlers, ...listHandlers];

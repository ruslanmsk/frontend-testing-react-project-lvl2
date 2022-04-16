import { rest } from 'msw';


// const state = {};

const handlers = [
  // create task
  rest.post('/api/v1/lists/:listId/tasks', (req, res, ctx) => {
    const { listId } = req.params;
    const { text } = req.body;
    return res(
      ctx.json({
        text, listId, id: 4, completed: false, touched: 1649792281363,
      }),
    );
  }),
  // delete task
  rest.get('/api/v1/tasks/:taskId', (req, res, ctx) => res(ctx.status(200))),
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

export default handlers;

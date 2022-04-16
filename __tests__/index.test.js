import start from '@hexlet/react-todo-app-with-backend';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { screen, render, waitFor } from '@testing-library/react';
import { server } from '../mocks/server.js';

beforeAll(() => server.listen({
  onUnhandledRequest: 'warn',
}));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const state = {
  lists: [
    { id: 1, name: 'primary', removable: false },
  ],
  tasks: [],
  currentListId: 1,
};

// let user;

beforeEach(async () => {

//   console.log(debug())
});

describe('test', () => {
  test('app started', async () => {
    const app = await start(state);
    render(app);
    expect(await screen.getByText('Hexlet Todos')).toBeInTheDocument();
    expect(await screen.getByRole('heading', { name: /lists/i })).toBeInTheDocument();
    expect(await screen.getByRole('heading', { name: /tasks/i })).toBeInTheDocument();
  });

  test('create task', async () => {
    const user = userEvent.setup();

    const app = await start(state);
    render(app);
    const input = screen.getByRole('textbox', { name: /new task/i });
    await user.type(input, 'task1');
    expect(input).toHaveValue('task1');

    const button = screen.getAllByRole('button', { name: /add/i })[1];
    await user.click(button);
    waitFor(() => {
      expect(screen.getByRole('textbox', { name: /new task/i })).toHaveValue('');
    });
  });
});

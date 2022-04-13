import start from '@hexlet/react-todo-app-with-backend';
import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const state = {
  lists: [
    { id: 1, name: 'primary', removable: false },
  ],
  tasks: [],
  currentListId: 1,
};

// beforeEach(async () => {

// });

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

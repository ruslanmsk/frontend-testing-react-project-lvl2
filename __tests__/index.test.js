import start from '@hexlet/react-todo-app-with-backend';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { screen, render, waitFor } from '@testing-library/react';
import server from '../mocks/server.js';

beforeEach(async () => {
  const state = {
    lists: [
      { id: 1, name: 'primary', removable: false },
      { id: 2, name: 'secondary', removable: true },
    ],
    tasks: [],
    currentListId: 1,
  };

  server.listen({
    onUnhandledRequest: 'warn',
  });
  const vdom = await start(state);

  render(vdom);
});

afterEach(() => {
  server.resetHandlers();
  server.close();
});

describe('tasks', () => {
  test('app started', async () => {
    expect(await screen.getByText('Hexlet Todos')).toBeInTheDocument();
    expect(await screen.getByRole('heading', { name: /lists/i })).toBeInTheDocument();
    expect(await screen.getByRole('heading', { name: /tasks/i })).toBeInTheDocument();
  });

  test('create task', async () => {
    const input = screen.getByRole('textbox', { name: /new task/i });
    await userEvent.type(input, 'task1');
    expect(input).toHaveValue('task1');

    const button = screen.getAllByRole('button', { name: /add/i })[1];
    await userEvent.click(button);
    expect(await screen.findByText(/task1/i)).toBeInTheDocument();
  });

  test('delete task', async () => {
    const input = screen.getByRole('textbox', { name: /new task/i });
    const button = screen.getAllByRole('button', { name: /add/i })[1];

    await userEvent.type(input, 'task1');
    await userEvent.click(button);

    const task = await screen.findByText(/task1/i);
    expect(task).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /^remove$/i });
    await userEvent.click(deleteButton);
    await waitFor(() => {
      expect(task).not.toBeInTheDocument();
    });
  });

  test('complete task', async () => {
    const input = screen.getByRole('textbox', { name: /new task/i });
    await userEvent.type(input, 'task1');
    expect(input).toHaveValue('task1');

    const button = screen.getAllByRole('button', { name: /add/i })[1];
    await userEvent.click(button);
    const task1 = await screen.findByText(/task1/i);
    expect(task1).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /task1/i });
    expect(checkbox).not.toBeChecked();

    await userEvent.click(task1);
    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });
});

describe('lists', () => {
  test('create list', async () => {
    const listName = 'list1';
    const input = screen.getByRole('textbox', { name: /new list/i });
    await userEvent.type(input, listName);
    expect(input).toHaveValue(listName);

    const button = screen.getByRole("button", { name: /add list/i });
    await userEvent.click(button);
    expect(await screen.findByText(/list1/i)).toBeInTheDocument();
  });

  test('delete list', async () => {
    const list = screen.getByRole("button", { name: /secondary/i })
    await userEvent.click(list);
    const input = screen.getByRole("textbox", { name: /new task/i });
    await userEvent.type(input, 'task1');

    const button = screen.getAllByRole('button', { name: /add/i })[1];
    await userEvent.click(button);
    expect(await screen.findByText(/task1/i)).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /remove list/i });
    await userEvent.click(deleteButton);
    await waitFor(() => {
      expect(list).not.toBeInTheDocument();
    });
    expect(screen.queryByText(/secondary list task/i)).not.toBeInTheDocument();
  });
});

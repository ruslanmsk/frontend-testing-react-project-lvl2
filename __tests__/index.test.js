import start from '@hexlet/react-todo-app-with-backend';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';


const state = {
    lists: [
      { id: 1, name: 'primary', removable: false },
    ],
    tasks: [],
    currentListId: 1,
  };

beforeAll(async () => {
    const app = await start(state);
    render(app);
})

describe('test', () => {
    test('app started', async () => {
        expect(await screen.getByText("Hexlet Todos")).toBeInTheDocument();
        expect(await screen.getByRole("heading", { name: /lists/i })).toBeInTheDocument();
        expect(await screen.getByRole("heading", { name: /tasks/i })).toBeInTheDocument();
    });
});

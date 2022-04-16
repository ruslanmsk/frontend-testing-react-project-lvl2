import { setupServer } from 'msw/node';
import taskHandlers from './handlers';

const server = setupServer(...taskHandlers);
export default server;

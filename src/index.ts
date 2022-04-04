import { startServer } from './app';
import { connectDatabase } from './database';

(async () => {
  await connectDatabase();

  startServer();
})();

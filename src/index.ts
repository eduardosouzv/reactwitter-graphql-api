import { initApp } from './app';
import { connectDatabase } from './database';

(async () => {
  await connectDatabase();

  initApp();
})();

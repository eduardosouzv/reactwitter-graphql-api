import server from './app';
import { connectDatabase } from './database';

(async () => {
  await connectDatabase();

  const { url } = await server.start();
  console.log(`running at ${url}`);
})();

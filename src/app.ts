import Koa from 'koa';
import mount from 'koa-mount';
import { graphqlHTTP } from 'koa-graphql';

import schema from './graphql/schema';

export function initApp() {
  const app = new Koa();

  app.on('error', err => {
    console.log('server error', err);
  });

  app.use(
    mount(
      '/graphql',
      graphqlHTTP({
        schema,
        graphiql: true,
      }),
    ),
  );

  app.listen(3333, () => console.log('runnin at http://localhost:3333'));
}

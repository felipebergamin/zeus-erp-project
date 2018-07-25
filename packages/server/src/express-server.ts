import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';

import { makeGraphQLServer } from './graphql/schema';
import { exportJwtMiddleware } from './middlewares/extract-jwt.middleware';
import db from './models';

class App {
  public express: express.Application;
  public graphQLServer: ApolloServer;

  constructor() {
    this.express = express();
    this.middleware();
  }

  private middleware(): void {

    this.express.use(
      exportJwtMiddleware(),
    );

    makeGraphQLServer({ db })
      .applyMiddleware({ app: this.express });
  }
}

export default new App().express;

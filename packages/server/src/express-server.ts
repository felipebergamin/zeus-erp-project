import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';

import { makeGraphQLServer } from './graphql/schema';
import { exportJwtMiddleware } from './middlewares/extract-jwt.middleware';
import db from './models';
import { authenticateBewit } from './middlewares/authenticateBewit';

import downloadRemessa from './routes/remessa/download';

class App {
  public express: express.Application;
  public graphQLServer: ApolloServer;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private routes(): void {
    this.express.get('/download/remessa/:id', authenticateBewit(), downloadRemessa);
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

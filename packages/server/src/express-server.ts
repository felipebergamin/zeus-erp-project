import { ApolloServer } from 'apollo-server-express';
import * as cors from 'cors';
import * as express from 'express';

import { makeGraphQLServer } from './graphql/schema';
import { authenticateBewit } from './middlewares/authenticateBewit';
import { exportJwtMiddleware } from './middlewares/extract-jwt.middleware';
import db from './models';

import printChamado from './routes/chamado/print-chamado';
import downloadRemessa from './routes/remessa/download';

class App {
  public express: express.Application;
  public graphQLServer: ApolloServer;

  constructor() {
    this.express = express();
    this.express.set('view engine', 'pug');
    this.middleware();
    this.routes();
  }

  private routes(): void {
    this.express.get('/download/remessa/:id', authenticateBewit(), downloadRemessa);
    this.express.get('/chamado/:chamadoid', authenticateBewit(), printChamado);
  }

  private middleware(): void {

    this.express.use(
      cors(),
      exportJwtMiddleware(),
    );

    makeGraphQLServer({ db })
      .applyMiddleware({ app: this.express });
  }
}

export default new App().express;

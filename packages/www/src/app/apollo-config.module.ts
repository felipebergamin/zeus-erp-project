import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { ApolloLink, split, from } from 'apollo-link';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'cross-fetch';

import { environment } from '../environments/environment';
import { StorageKeys } from './storage-keys';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
  ]
})
export class ApolloConfigModule {

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
  ) {

    const uri = environment.graphQlURI;
    const http = httpLink.create({ uri });
    const uploadLink = createUploadLink({ uri, fetch });

    const authMiddleware: ApolloLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });
      return forward(operation);
    });

    const linkError = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError) {
        console.log(`[Network error]:`);
        console.dir(networkError);
      }
    });

    const networkLink = split(
      (op) => {
        return op.operationName.startsWith('upload');
      },
      uploadLink,
      http,
    );

    apollo.create({
      link: from([
        linkError,
        authMiddleware,
        networkLink,
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: !environment.production,
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache',
        },
      },
    });
  }

  private getAuthToken(): string {
    return window.localStorage.getItem(StorageKeys.AUTH_TOKEN);
  }
}

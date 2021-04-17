import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';


const uri = 'https://graphqlinfo802.azurewebsites.net/api'; // <-- add the URL of the GraphQL server here


const enchancedFetch = (url, init) => {
  return fetch(url, {
      ...init,
      headers: {
          ...init.headers,
          'Access-Control-Allow-Origin': 'https://info802.visarsylejmani.com/',
      },
  }).then(response => response)
}

const httpLink = createHttpLink({
  uri, 
  credentials: 'include', 
  fetchOptions: {
    mode: 'cors',
  },
  fetch: enchancedFetch,
})

export function createApollo(): ApolloClientOptions<any> {
  return {
    link: httpLink,
    cache: new InMemoryCache()
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }

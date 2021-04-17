import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';


const uri = 'https://graphqlinfo802.azurewebsites.net/api'; // <-- add the URL of the GraphQL server here

const httpLink = createHttpLink({
  uri: uri,

});

const headers = {
  'Origin': '*',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'no-cors',
  'Sec-Fetch-Site': 'cross-site',
}
const link = setContext(() => {
  return {
    fetchOptions: {

    },
    headers: headers,
    fetch,
  }
});
export function createApollo(): ApolloClientOptions<any> {
  return {
    link: link.concat(httpLink),
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

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
  'Access-Control-Allow-Origin': 'https://info802.visarsylejmani.com/'

}
const link = setContext(() => {
  return {
    fetchOptions: {
      mode:'cors'
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

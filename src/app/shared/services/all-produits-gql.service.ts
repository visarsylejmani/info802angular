import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export interface Produit {
  uid: string;
  nom: string;
  description: string;
  prix: string;
  poids: string;
  vendeur: string;
}
export interface Response {
  produits: Produit[];
}


@Injectable({
  providedIn: 'root'
})
export class AllProduitsGQLService extends Query<Response> {

  document = gql`
  query{
    produits
    {
        nodes{
            produitID
            nom
            longitude
            latitude
        }
    }
  }
  `;
}

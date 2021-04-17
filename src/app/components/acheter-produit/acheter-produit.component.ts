import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PanierService } from 'src/app/shared/services/panier.service';
import { Product } from 'src/app/shared/services/product';
import { Apollo ,gql} from 'apollo-angular';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Produit, AllProduitsGQLService } from 'src/app/shared/services/all-produits-gql.service';






const GET_PRODUITS = gql`
{
  produits
  {
          produitID,
          nom,
          longitude,
          latitude,
  }
}
`;


@Component({
  selector: 'app-acheter-produit',
  templateUrl: './acheter-produit.component.html',
  styleUrls: ['./acheter-produit.component.scss']
})
export class AcheterProduitComponent implements OnInit {
  public productList = new Array<Product>();

  loading: boolean;
  produits: Observable<Produit[]>;



  constructor(
    public authService:AuthService,
    public afs: AngularFirestore,
    public panier:PanierService,
    private apollo: Apollo,
    private allProduitsGQL: AllProduitsGQLService
    ) { }

    ngOnInit() {
      this.GetData();
      this.produits = this.allProduitsGQL.watch()
      .valueChanges
      .pipe(
        map(result => result.data.produits)
      );
    }
  
    ngOnDestroy() {
    }

  async GetData(){
    const docs =  this.afs.collection("products");
    const products = await docs.get();
    console.log(products.subscribe(r=>{
      r.forEach(e=>{
         this.productList.push(<Product>e.data());
      })
    }))
    console.log(this.productList)
  }
  ajouterPanier(product){
    this.panier.ajouter(product);
  }
}

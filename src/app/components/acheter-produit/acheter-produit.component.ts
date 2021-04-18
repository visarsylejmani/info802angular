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
  styleUrls: []
})
export class AcheterProduitComponent implements OnInit {
  productList:  Observable<any[]>;

  loading: boolean;
  produits: Observable<any[]>;



  constructor(
    public authService:AuthService,
    public afs: AngularFirestore,
    public panier:PanierService,
    private apollo: Apollo,
    private allProduitsGQL: AllProduitsGQLService
    ) { }

    ngOnInit() {
      this.GetData();
    }
  
    ngOnDestroy() {
    }

  async GetData(){
    const myUID = await this.authService.userData.uid;
    const docs =  this.afs.collection("products",ref =>
    ref.where("vendeur", "!=", myUID));
    this.productList = docs.get().pipe(map((item) => {
      return item.docs.map((dataItem) => dataItem.data());
    }));
  }
  ajouterPanier(product:Product){
    this.panier.ajouter(product);
  }
  supprimerPanier(product:Product){
    this.panier.supprimer(product);
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PanierService } from 'src/app/shared/services/panier.service';
import { Product } from 'src/app/shared/services/product';

@Component({
  selector: 'app-acheter-produit',
  templateUrl: './acheter-produit.component.html',
  styleUrls: ['./acheter-produit.component.scss']
})
export class AcheterProduitComponent implements OnInit {
  public productList = new Array<Product>();
  constructor(
    public authService:AuthService,
    public afs: AngularFirestore,
    public panier:PanierService,
    ) { }

  ngOnInit(): void {
    this.GetData()
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

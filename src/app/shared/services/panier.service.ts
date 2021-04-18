import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  mesProduits = new Array<Product>();
  total:number = 0;
  constructor() { }

  ajouter(product:Product){
    this.mesProduits.push(product);
    this.total = 0;
    this.mesProduits.forEach(element => {
      this.total += element.prix;
    });
    window.alert("Produit ajouté");
  }
  supprimer(product:Product){
    delete this.mesProduits[this.mesProduits.indexOf(product)];
  }
}

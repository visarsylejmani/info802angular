import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  mesProduits = new Array<Product>();
  constructor() { }

  ajouter(product){
    this.mesProduits.push(product);
  }
}

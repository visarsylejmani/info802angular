import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PanierService } from 'src/app/shared/services/panier.service';
import { Product } from 'src/app/shared/services/product';

@Component({
  selector: 'app-mon-panier',
  templateUrl: './mon-panier.component.html',
  styleUrls: ['./mon-panier.component.scss']
})
export class MonPanierComponent implements OnInit {

  monPanier = new Array<Product>();
  constructor(
    public afs: AngularFirestore,
    public authService:AuthService,
    public panier:PanierService,
    ) { }

  ngOnInit(): void {
    this.monPanier = this.panier.mesProduits;
  }

  acheter(){

  }

  vide(){
    return this.monPanier.length==0;
  }
  

}

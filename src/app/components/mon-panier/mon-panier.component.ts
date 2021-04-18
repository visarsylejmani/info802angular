import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientAPI, Commande, CompteEnBanque } from 'src/app/shared/services/clientapi.service';
import { PanierService } from 'src/app/shared/services/panier.service';
import { Product } from 'src/app/shared/services/product';

declare function soapRequest(km, poids): any;

@Component({
  selector: 'app-mon-panier',
  templateUrl: './mon-panier.component.html',
  styleUrls: []
})
export class MonPanierComponent implements OnInit {

  CarteBanqueForm = this.formBuilder.group({
    numero: '',
  });

  maCarte: CompteEnBanque;

  clientApi = new ClientAPI();
  constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public panier: PanierService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  async verifierCarteBanque() {
    console.log(this.CarteBanqueForm.value["numero"]);
    this.maCarte = await this.clientApi.query(this.CarteBanqueForm.value["numero"])
    if (this.maCarte != null) {
      console.log(this.maCarte)
      const div = document.getElementById("ResponseFromServer");
      div.className = "alert alert-success";
      div.innerHTML = 'Carte Valide'
      document.getElementById("buttonAcheter").className = "visible btn btn-success"
    } else {
      const div = document.getElementById("ResponseFromServer");
      div.className = "alert alert-danger";
      div.innerHTML = 'Carte Invalide'
      document.getElementById("buttonAcheter").className = "invisible btn btn-success"

    };
  }

  prixDeLivraison() {
    soapRequest(Math.floor(Math.random() * (100 - 20 + 1) + 0), Math.floor(Math.random() * (50 - 20 + 1) + 0));
  }

  acheter() {
    const commande = new Commande;

    const r = document.getElementById("ResponseFromSoap").innerHTML;
    const divRes = document.getElementById("ResponseAchat");
    const divAlert = document.getElementById("AlertForAll");
    
    commande.init({
      iDacheteur: this.maCarte.id,
      iDvendeur: this.panier.mesProduits[0].vendeur,
      montant: (this.panier.total + parseFloat(document.getElementById("ResponseFromSoap").innerHTML))
    });
    console.log(commande)
    this.clientApi.commande(commande).then(() => {
      divRes.className = "alert alert-success";
      divRes.innerHTML = "Payment Réussi"
      divAlert.className = "alert alert-success";
      divAlert.innerHTML = "Payment Réussi";
      this.panier.mesProduits = new Array<Product>();
    }).catch((err) => {
      divRes.className = "alert alert-danger";
      divRes.innerHTML = "Payment Echoué"
    });
  }
  vide() {
    return this.panier.mesProduits.length == 0;
  }


}

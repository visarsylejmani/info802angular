import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Product } from 'src/app/shared/services/product';


@Component({
  selector: 'app-vendre-produit',
  templateUrl: './vendre-produit.component.html',
  styleUrls: ['./vendre-produit.component.scss']
})
export class VendreProduitComponent implements OnInit {
  userData: any; // Save logged in user data

  constructor(public authService:AuthService, public afs: AngularFirestore, public router:Router) { }

  ngOnInit(): void {
  }

  SetProductData(description,nom,poids,prix) {
    const myId = this.afs.createId();
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(`products/${myId}`);
    const productData: Product = {
      uid: myId,
      description: description,
      nom: nom,
      poids: poids,
      prix: prix,
      vendeur:this.authService.userData.uid
    }
    
    return productRef.set(productData, {
      merge: true
    }).then(()=>
      this.router.navigate(['acheter-produit'])
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Product } from 'src/app/shared/services/product';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-vendre-produit',
  templateUrl: './vendre-produit.component.html',
  styleUrls: []
})
export class VendreProduitComponent implements OnInit {

  VendreForm = this.formBuilder.group({
    description: '',
    nom: '',
    poids: '',
    prix: ''
  });

  productList:Observable<any>;

  constructor(
    public authService:AuthService,
    public userService:UserService,
    public afs: AngularFirestore,
    public router:Router,
    public formBuilder:FormBuilder,
    ) { }

  ngOnInit(): void {
    setTimeout(()=>{this.authService.userData;},200)
    this.userService.GetAdresseData()
    this.GetMyProducts();
  }

  onVendre() {
    const myId = this.afs.createId();
    const productRef: AngularFirestoreDocument<Product> = this.afs.doc(`products/${myId}`);
    this.userService.GetAdresseData();
    const productData: Product = {
      uid: myId,
      description: this.VendreForm.value["description"],
      nom: this.VendreForm.value["nom"],
      poids: +this.VendreForm.value["poids"],
      prix: +this.VendreForm.value["prix"],
      longitude : this.userService.adresse2.longitude,
      latitude : this.userService.adresse2.latitude,
      vendeur:this.authService.userData.uid
    }
    setTimeout(()=>{productRef.set(productData, {
      merge: true
    }).then(()=>{
      this.VendreForm.reset();
      this.GetMyProducts();
    }
    )},300);

  }

  async GetMyProducts(){
    var myUID = await this.authService.userData.uid;
    const docs =  this.afs.collection("products",ref =>
    ref.where("vendeur", "==", myUID)
    );
    this.productList = docs.get().pipe(map((item) => {
      return item.docs.map((dataItem) => dataItem.data());
    }));

  }

  DeleteProduct( id:string){
    this.afs.collection("products").doc(id).delete().then(
      ()=>{
        this.GetMyProducts();
      }
    )
    
  }
}

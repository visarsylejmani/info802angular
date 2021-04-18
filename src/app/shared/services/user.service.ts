import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Adresse } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  public adresse: Observable<any>;
  public adresse2: Adresse;

  public myId : any;
  constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public router: Router,
  ) { 
    this.myId = this.authService.userData.uid;
  }

  SetAdresseData(longitude,latitude) {
    const productRef: AngularFirestoreDocument<Adresse> = this.afs.doc(`adresses/${this.myId}`);
    const data: Adresse = {
      uid: this.myId,
      longitude: longitude,
      latitude: latitude,
    }
    
    return productRef.set(data, {
      merge: true
    });
  }

  GetAdresseData() {
    const myId = this.authService.userData.uid;
    setTimeout(()=>{
      const docs =  this.afs.collection("adresses");
      this.adresse = docs.doc(myId).get();
      this.adresse.subscribe((value) => {
        this.adresse2 =value.data();
      });
    },200);
    
  }
}

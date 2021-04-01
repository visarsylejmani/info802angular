import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-vendre-produit',
  templateUrl: './vendre-produit.component.html',
  styleUrls: ['./vendre-produit.component.scss']
})
export class VendreProduitComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

}

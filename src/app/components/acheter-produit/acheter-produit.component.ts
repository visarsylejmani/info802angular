import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-acheter-produit',
  templateUrl: './acheter-produit.component.html',
  styleUrls: ['./acheter-produit.component.scss']
})
export class AcheterProduitComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

}

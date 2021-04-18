import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: []
})
export class NavComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  signOut(){
    this.authService.SignOut();
  }

}

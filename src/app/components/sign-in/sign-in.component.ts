import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  SignInForm = this.formBuilder.group({
    inputEmail: '',
    inputPassword: ''
  });

  constructor(public authService:AuthService, public router: Router, public formBuilder:FormBuilder) { }

  ngOnInit() :void {
    const res = this.authService.isLoggedIn();
    if(res == true) {
      this.router.navigate(['acheter-produit'])
    }
  }

  onSignIn() {
    this.authService.SignIn(this.SignInForm.value["inputEmail"],this.SignInForm.value["inputPassword"]);
    this.SignInForm.reset();
    this.router.navigate(['acheter-produit']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  SignUpForm = this.formBuilder.group({
    inputDisplayName:'',
    inputEmail: '',
    inputPassword: ''
  });

  constructor(public authService:AuthService, public formBuilder:FormBuilder, public router : Router) { }

  ngOnInit(): void {
  }

  onSignUp() {
    this.authService.SignUp(this.SignUpForm.value["inputDisplayName"], this.SignUpForm.value["inputEmail"],this.SignUpForm.value["inputPassword"]);
    this.SignUpForm.reset();
    this.router.navigate(['acheter-produit']);
  }

}

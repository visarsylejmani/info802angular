import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  AdresseForm = this.formBuilder.group({
    inputLatitude: '',
    inputLongitude: ''
  });

  constructor(
    public authService:AuthService,
    public userService:UserService,
    public formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.GetAdresseData();
  }
  onChangeAdresse() {
    this.userService.SetAdresseData(this.AdresseForm.value["inputLongitude"],this.AdresseForm.value["inputLatitude"]);
    setInterval(()=>{this.userService.GetAdresseData()},300);
    this.AdresseForm.reset();  
  }

}

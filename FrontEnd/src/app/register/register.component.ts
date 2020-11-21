import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Account } from './model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  account: Account = {id: 0, email: '', password: ''};
  confirmPass: string = '';
  showAlert: boolean = false;
  alertType: string = 'danger';
  alertMsg: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void 
  {

  }
  setAlert(msg: string, type: string)
  {
    this.showAlert = true;
    this.alertMsg = msg;
    this.alertType = type;
    var _this = this;
    setTimeout(function() 
    {
      _this.showAlert = false;
      if (_this.alertType == 'success') _this.router.navigate(['/login']);
    }, 3000);
  }

  async register()
  {
    let url = ApiService.backendHost + '/api/Accounts/Register';
    try
    {
      let result = await this.http.post(url, this.account).toPromise();
      console.log(result)
      if (result == null) this.setAlert('Email has already been used! Change email', 'danger');
      else this.setAlert('You have successfully created an account!', 'success');
    }
    catch(e) { console.log(e) }
  }
}

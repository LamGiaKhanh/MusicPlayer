import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public auth: AuthenticationService, private http: HttpClient) { }

  passwords: any = {accoundId: 0 , password: '', newPass: ''};
  confirmPass: string = '';
  showAlert: boolean = false;
  alertType: string = 'danger';
  alertMsg: string = '';
  isLoaded: boolean = true;

  ngOnInit(): void 
  {
    this.passwords.accountId = this.auth.currentAccountValue.id;
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
    }, 3000);
  }

  async save()
  {
    this.isLoaded = false;
    let url = ApiService.backendHost + '/api/Accounts/ChangePassword';
    try
    {
      let result = await this.http.post(url, this.passwords).toPromise();
      if (result == 'fail') this.setAlert('Current password is incorrect!', 'danger');
      else if (result == null) this.setAlert('You have successfully changed password!', 'success');
    }
    catch(e) 
    { 
      this.setAlert('Something went wrong!', 'danger');
    }
    this.isLoaded = true;
  }

}

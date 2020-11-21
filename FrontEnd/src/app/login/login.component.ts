import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Account } from '../register/model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  account: Account = {id: 0, email: '', password: ''};
  showAlert: boolean = false;
  remember: boolean = false;
  constructor(private auth: AuthenticationService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void 
  {

  }
  setAlert()
  {
    this.showAlert = true;
    var _this = this;
    setTimeout(function() 
    {
      _this.showAlert = false;
    }, 4000);
  }
  async login()
  {
    let url = ApiService.backendHost + '/api/Accounts';
    try 
    {
      let result = await this.http.post(url, this.account).toPromise() as any;
      if (result == null) this.setAlert();
      else 
      {
        this.auth.saveAccount(result.account, this.remember, result.activities);
        console.log(this.auth.currentAccountValue)
        this.router.navigateByUrl('/index');
      }
    } 
    catch(e) { console.log(e); }
  }
  
}

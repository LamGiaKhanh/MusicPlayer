import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public auth: AuthenticationService) { }
  query: string = '';
  
  ngOnInit(): void 
  {

  }
  search()
  {
    this.router.navigate(['/search'], {queryParams: {query: this.query}});
  }
  logout()
  {
    this.auth.logout();
    this.router.navigate(['/index']);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  users : any;
  constructor(private accountService : AuthService){}

  ngOnInit(): void {
    this.autoLogin();
  }
  autoLogin()
  {
    this.accountService.autoLogin();
  }
}

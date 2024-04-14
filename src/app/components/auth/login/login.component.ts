import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(
      public authService : AuthService,
      private router : Router,
      private toastr : ToastrService  ) { }

  login(authForm : NgForm) {
    this.authService.login(authForm.value).subscribe({
      next : user => {
        if (user.userRole === "STANDARD_USER")
          this.router.navigateByUrl("/");
        else if (user.userRole === "ADMIN")
          this.router.navigateByUrl("/management/nodes")
      },
      error : errorMsg => {
        console.log(errorMsg);
        for(const element of errorMsg) {
          this.toastr.error(element);
        }
      }
    });
  }
}

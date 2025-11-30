import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-form',
  imports: [RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  router = inject(Router)

  login() {
    alert("Logado")
    this.router.navigate(['/feed'])
  }

}

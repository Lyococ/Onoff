import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  email: string = '';
  password: string = '';
  error: string = '';

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/todo']);
      },
      error: () => this.error = 'Credenciales inválidas'
    });
  }
}

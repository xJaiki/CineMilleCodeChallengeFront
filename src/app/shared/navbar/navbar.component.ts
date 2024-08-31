import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getUser().username || '';
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isUser(): boolean {
    const user = this.authService.getUser();
    return user && user.role === 'user'; 
  }

  isAdmin(): boolean {
    const user = this.authService.getUser();
    return user && user.role === 'admin'; 
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

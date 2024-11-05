import { Component } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private sqlite: SqliteService, private authService: AuthService, private router:Router) {
  }









 

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }




}

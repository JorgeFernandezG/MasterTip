import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public username: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.username = '';
    this.password = '';
  }

  async login() {
    try {
      await this.authService.login(this.username, this.password);
      this.router.navigate(['/home']);
      this.showAlert('Success', 'Logged in successfully');
    } catch (err) {
      console.error('Error logging in', err);
      this.showAlert('Error', 'Invalid username or password');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

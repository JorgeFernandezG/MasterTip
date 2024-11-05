import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public username: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.username = '';
    this.password = '';
  }

  async register() {
    try {
      await this.authService.register(this.username, this.password);
      console.log('User registered');
      this.showAlert('Success', 'User registered successfully');
    } catch (err) {
      console.error('Error registering user', err);
      this.showAlert('Error', 'There was an error registering the user');
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

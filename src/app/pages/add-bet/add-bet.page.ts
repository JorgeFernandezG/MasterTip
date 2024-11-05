import { Component, OnInit } from '@angular/core';
import { SqliteService } from 'src/app/services/sqlite.service';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-add-bet',
  templateUrl: './add-bet.page.html',
  styleUrls: ['./add-bet.page.scss'],
})
export class AddBetPage implements OnInit {
  public apuesta = { id: null, titulo: '', descripcion: '', stake: '' };
  public apuestas: any[];

  constructor( private navCtrl: NavController,private sqliteService:SqliteService, private alertController: AlertController) {
 
  }



  

 

  async create() {
    if (!this.apuesta.titulo) {
      await this.showAlert('Error', 'El título no puede estar vacío');
      return;
    }

    if (!this.apuesta.descripcion) {
      await this.showAlert('Error', 'La descripción no puede estar vacía');
      return;
    }

    if (!this.apuesta.stake) {
      await this.showAlert('Error', 'El stake no puede estar vacío');
      return;
    }

    this.sqliteService.createApuesta(this.apuesta.titulo, this.apuesta.descripcion, this.apuesta.stake).then(changes => {
       this.showAlert('Exito', 'La apuesta fue creada correctamente');
      this.resetForm();
      this.read();
    }).catch(err => {
      console.error("Error al crear la apuesta", err);
      this.showAlert('Error', 'Hubo un error al crear la apuesta');
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  resetForm() {
    this.apuesta = { id: null, titulo: '', descripcion: '', stake: '' };
  }

  read() {
    this.sqliteService.readApuestas().then(apuestas => {
      this.apuestas = apuestas;
      console.log("Apuestas leídas", this.apuestas);
    }).catch(err => {
      console.error("Error al leer las apuestas", err);
    });
  }

  dismiss() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}

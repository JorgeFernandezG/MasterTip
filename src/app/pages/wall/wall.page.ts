import { Component, OnInit } from '@angular/core';
import { SqliteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.page.html',
  styleUrls: ['./wall.page.scss'],
})
export class WallPage implements OnInit {
  public apuesta = { id: null, titulo: '', descripcion: '', stake: null };
  public apuestas: any[];
  

  constructor(private sqliteService: SqliteService) { 
    
   }
   ionViewWillEnter() {
    this.read();
  }

  read() {
    this.sqliteService.readApuestas().then(apuestas => {
      this.apuestas = apuestas;
      console.log("Apuestas leídas", this.apuestas);
    }).catch(err => {
      console.error("Error al leer las apuestas", err);
    });
  }

  selectApuesta(apuesta: any) {
    this.apuesta = { ...apuesta };
  }

  delete(id: number) {
    this.sqliteService.deleteApuesta(id).then(changes => {
      console.log("Apuesta borrada", changes);
      this.read();
    }).catch(err => {
      console.error("Error al borrar la apuesta", err);
    });
  }

  ngOnInit() {
  }

}

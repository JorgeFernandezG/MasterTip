import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBetPageRoutingModule } from './add-bet-routing.module';

import { AddBetPage } from './add-bet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBetPageRoutingModule
  ],
  declarations: [AddBetPage],
  exports: [AddBetPage]
})
export class AddBetPageModule {}

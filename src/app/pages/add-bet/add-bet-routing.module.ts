import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBetPage } from './add-bet.page';

const routes: Routes = [
  {
    path: '',
    component: AddBetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBetPageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'wall',
        loadChildren: () => import('../pages/wall/wall.module').then(m => m.WallPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'bets',
        loadChildren: () => import('../pages/bets/bets.module').then(m => m.BetsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-bet',
        loadChildren: () => import('../pages/add-bet/add-bet.module').then(m => m.AddBetPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'wall',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ReservationComponent } from './reservation/reservation.component';
import { LoginComponent } from './login/login.component';
import { PlatComponent } from './plat/plat.component';
import { authGuard } from './auth.guard';
import { ListeReseervationComponent } from './liste-reseervation/liste-reseervation.component';
import { AddPlatComponent } from './add-plat/add-plat.component';
import { ManageMenusComponent } from './manage-menus/manage-menus.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'reservation', component: ReservationComponent,canActivate: [authGuard]},
  { path: 'plat/:menuId', component: PlatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listeReservation', component: ListeReseervationComponent },
  { path: 'add-menu', component: AddPlatComponent },      // Route vers Ajouter Plat
  { path: 'manage-menus', component: ManageMenusComponent }
];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

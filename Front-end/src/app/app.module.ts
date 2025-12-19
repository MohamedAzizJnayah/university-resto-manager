import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'; // Suppression de provideClientHydration ici
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationComponent } from './reservation/reservation.component';
import { PlatComponent } from './plat/plat.component';
import { ListeReseervationComponent } from './liste-reseervation/liste-reseervation.component';
import { AddPlatComponent } from './add-plat/add-plat.component';
import { ManageMenusComponent } from './manage-menus/manage-menus.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    ReservationComponent,
    PlatComponent,
    ListeReseervationComponent,
    AddPlatComponent,
    ManageMenusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [], // Suppression temporaire de provideClientHydration()
  bootstrap: [AppComponent]
})
export class AppModule { }

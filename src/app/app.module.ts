import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ArtefactoComponent } from './components/artefacto/artefacto.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { RefreshTokenInterceptor } from './shared/helpers/refresh-token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    NavBarComponent,
    ArtefactoComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SweetAlert2Module,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi : true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor (libreria : FaIconLibrary) {
    libreria.addIconPacks(fas);
   // libreria.addIcons(faPlus, faPencil, faTrashCan);
  }
}

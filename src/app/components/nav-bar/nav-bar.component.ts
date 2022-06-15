import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  usuario : string = '';
  constructor(
    private authSrv : AuthService
  ) { }
  onSalir() {
    this.authSrv.logout()
  }
  ngOnInit(): void {
     this.usuario = this.authSrv.valorUsrActual.usr
     this.authSrv.usrActual
     .subscribe(
        data => this.usuario = data.nom
     )
  }

}

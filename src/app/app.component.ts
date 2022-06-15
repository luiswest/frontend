import { Component, HostListener } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Taller';
  constructor(
    private authSrv : AuthService
  ) {
   // @HostListener("window:beforeunload", ["$event"]) unloadHandler() {
    //  this.authSrv.logout()
   // }
  }
}
function unloadHandler(event: Event | undefined, Event: { new(type: string, eventInitDict?: EventInit | undefined): Event; prototype: Event; readonly AT_TARGET: number; readonly BUBBLING_PHASE: number; readonly CAPTURING_PHASE: number; readonly NONE: number; }) {
  throw new Error('Function not implemented.');
}


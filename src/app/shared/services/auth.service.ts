import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';
import { Injectable } from '@angular/core';
import { Observable, retry, tap, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usrActualSubject = new BehaviorSubject<User>(new User());
  public usrActual = this.usrActualSubject.asObservable();
  constructor(
    private http : HttpClient,
    private srvToken : TokenService,
    private router : Router
  ) { }
  public get valorUsrActual() : User {
    return this.usrActualSubject.value
  }
  public login(user : {usr: '', passw:''}) : Observable<any> {
    return this.http.post<Token>(`${environment.SRV}/auth/iniciar`, user)
      .pipe(
        retry(1),
        tap(
          tokens => {
            this.doLogin(tokens);
            this.router.navigate(['/home']);
            console.log(tokens);
          }
        ),
        map(() => true),
        catchError(
          error => { return of (error.status)}
        )
      )
  }
  public logout() {
    this.http.patch(`${environment.SRV}/auth/cerrar`,	{
      "idUsuario": this.valorUsrActual.usr
    })
      .subscribe();
    this.doLogout()
  }
  private doLogin(tokens : Token) : void {
    this.srvToken.setTokens(tokens);
    this.usrActualSubject.next(this.getUserActual())

  }
  private doLogout(){
    if(this.srvToken.token){
      this.srvToken.eliminarTokens();
    }
    this.usrActualSubject.next(this.getUserActual())
  }
  public isLogged() : boolean {
     return !!this.srvToken.token && !this.srvToken.jwtTokenExp();
  }
  private getUserActual() : User {
    if (!this.srvToken.token) {
      return new User(); //{usr:'', rol:-1}
    } 
    const tokenD = this.srvToken.decodeToken();
    console.log(tokenD); /////
    return {usr: tokenD.sub, rol:tokenD.rol}
  }
  public verificarRefrescar() : boolean {
    if (this.isLogged() && this.srvToken.tiempoExpToken() <= 20) {
      this.srvToken.refreshTokens();
      return true;
    } else {
      return false;
    }
  }

}

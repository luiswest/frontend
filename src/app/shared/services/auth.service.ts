import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';
import { Injectable } from '@angular/core';
import { Observable, retry, tap, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usrActualSubject = new BehaviorSubject<User>(new User());
  //private usrActual = this.usrActualSubject.asObservable();
  constructor(
    private http : HttpClient,
    private srvToken : TokenService
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
            console.log(tokens);
          }
        ),
        map(() => true),
        catchError(
          error => { return of (error.status)}
        )
      )
  }
  private doLogin(tokens : Token) : void {
    this.srvToken.setTokens(tokens);
    this.usrActualSubject.next(this.getUserActual())

  }
  public doLogout(){
    if(this.srvToken.token){
      this.srvToken.eliminarTokens();
    }
    this.usrActualSubject.next(this.getUserActual())
  }
  public isLogged() : boolean {
     return !!this.srvToken.token;
  }
  private getUserActual() : User {
    if (!this.srvToken.token) {
      return new User(); //{usr:'', rol:-1}
    } 
    const tokenD = this.srvToken.decodeToken();
    console.log(tokenD); /////
    return {usr: tokenD.sub, rol:tokenD.rol}
  }

}

import { Token } from '../models/token';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private JWT_TOKEN = 'JWT_TOKEN';
  private REFRESH_TOKEN = 'REFRESH_TOKEN';
  constructor() { }
  setTokens(tokens: Token) : void {
    this.setToken(tokens.token);
    this.setRefreshToken(tokens.refreshToken)
  }
  private setToken(token: string) : void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }
  private setRefreshToken(token: string) : void {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }
  get token() : string {
    return localStorage.getItem(this.JWT_TOKEN)!
  }
  get refreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN)!
  }
  eliminarTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
  public decodeToken() : any {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.token); 
  }
}
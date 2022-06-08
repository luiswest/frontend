import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frmLogin : FormGroup;
  errorLogin : boolean = false;
  constructor(
    private fb : FormBuilder,
    private authSrv : AuthService
  ) { 
    this.frmLogin = this.fb.group({
      idUsuario : ['',Validators.required],
      passw : ['',Validators.required]
    })
  }

  onSubmit() {
    console.log(this.frmLogin.value);
    this.authSrv.login(this.frmLogin.value)
      .subscribe(
        res => {
          this.errorLogin = (!res || res === 401)
        }
      )

  }
  ngOnInit(): void {
  }

}

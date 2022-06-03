import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frmLogin : FormGroup;
  constructor(
    private fb : FormBuilder
  ) { 
    this.frmLogin = this.fb.group({
      idUsuario : ['',Validators.required],
      passw : ['',Validators.required]
    })
  }

  onSubmit() {
    console.log(this.frmLogin.value);
  }
  ngOnInit(): void {
  }

}

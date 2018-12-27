import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { NotificationService } from '../../shared/messages/notification.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.loginService.login(email, password)
    .subscribe(user => 
      this.notificationService.notify(`Bem vindo(a), ${user.name}`),
      response => this.notificationService.notify(response.error.message));
  }

}

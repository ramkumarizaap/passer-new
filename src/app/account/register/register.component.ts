import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerFormSubmitted: boolean = false;
  constructor(public _fb: FormBuilder) {
    this.loadForm();
   }

  ngOnInit() {
  }

  loadForm(){
    this.registerForm = this._fb.group({
      firstname: ['',Validators.compose([Validators.required])],
      lastname: ['',Validators.compose([Validators.required])],
      email: ['',Validators.compose([Validators.required,Validators.email])],
      password: ['',Validators.compose([Validators.required])],
    });
  }

  submitForm(){
    this.registerFormSubmitted = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordIcon: string = 'eye';
  inputType: string = "password";
  loginForm: FormGroup;
  loginFormSubmitted: boolean = false;
  constructor(/*private faio: FingerprintAIO*/public _fb: FormBuilder) {
    this.loadForm();
   }

   loadForm(){
     this.loginForm = this._fb.group({
       password:['',Validators.compose([Validators.required])]
     });
   }

  ngOnInit() {
  }

  submitLoginForm(){
    this.loginFormSubmitted = true;
  }

  changeInput(){
    if(this.inputType === "password"){
      this.inputType = "text";
      this.passwordIcon = "eye-off";
    }
    else if(this.inputType === "text"){
      this.inputType = "password";
      this.passwordIcon = "eye";
    }
  }


  // fingerPrint(){
  //   this.faio.show({
  //     clientId: 'Fingerprint-Demo',
  //     clientSecret: 'password', //Only necessary for Android
  //     disableBackup:true,  //Only for Android(optional)
  //     localizedFallbackTitle: 'Use Pin', //Only for iOS
  //     localizedReason: 'Please authenticate' //Only for iOS
  //   })
  //   .then((result: any) => alert('Success'+JSON.stringify(result)))
  //   .catch((error: any) => alert('Error'+JSON.stringify(error)));
  // }

}

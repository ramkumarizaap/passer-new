import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordIcon: string = 'eye';
  inputType: string = "password";
  constructor(private faio: FingerprintAIO) {
    this.fingerPrint();
   }

  ngOnInit() {
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


  fingerPrint(){
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup:true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    })
    .then((result: any) => alert('Success'+JSON.stringify(result)))
    .catch((error: any) => alert('Error'+JSON.stringify(error)));
  }

}

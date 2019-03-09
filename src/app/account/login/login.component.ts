import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import { AccountService } from '../../services/account.service';
import { CommonUtils } from '../../utils/commonUtils';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordIcon: string = 'eye';
  inputType: string = "password";
  loginForm: FormGroup;
  errorMsg: any = { status:'Sorry',message: 'Something went wrong!!!' };
  loginFormSubmitted: boolean = false;
  constructor(
    public accountService: AccountService,
    private faio: FingerprintAIO,
    public commonUtils: CommonUtils,
    public _fb: FormBuilder
    ) {
    this.loadForm();
   }

   loadForm(){
     this.loginForm = this._fb.group({
       password:['',Validators.compose([Validators.required])],
       uuid:['abcdefghij']
     });
   }

  ngOnInit() {
    // this.fingerPrint();
  }

  submitLoginForm(){
    this.loginFormSubmitted = true;
    this.commonUtils.presentLoading();
    if(this.loginForm.valid)
    {
      this.accountService.checkLogin(this.loginForm.value).subscribe((res:any) => {
        console.log('Login Res',res);
        if( res.status === 'success' )
          this.commonUtils.loaderDismiss(null,'apps',true);
        else
          this.commonUtils.loaderDismiss(res);
      },err=>{
        this.commonUtils.loaderDismiss(this.errorMsg);
      })
    }
    else
    {
      this.commonUtils.loaderDismiss();
    }
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
      clientId: 'Passer',
      clientSecret: '123', //Only necessary for Android
      disableBackup:true,  //Only for Android(optional)
    })
    .then((result: any) => { 
      alert('Success'+JSON.stringify(result))
      this.checkFingerPrint(result);
    })
    .catch((error: any) => this.commonUtils.loaderDismiss(this.errorMsg));
  }

  checkFingerPrint(data){

    this.accountService.checkFingerLogin(data).subscribe((res:any)=>{
      alert("Finger Check"+JSON.stringify(res));
    },err=>{
      this.commonUtils.loaderDismiss(this.errorMsg);
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { CommonUtils } from '../../utils/commonUtils';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  uuid: any;
  registerFormSubmitted: boolean = false;
  constructor(
    private uniqueDeviceID: UniqueDeviceID,
    private commonUtils:CommonUtils,
    public _fb: FormBuilder,
    public accountService: AccountService) {
    }
    
    ngOnInit() {      
      this.loadForm();
      this.getInfo();
    }

    getInfo(){
      this.uniqueDeviceID.get()
      .then((uuid: any) => this.uuid = uuid)
      .catch((error: any) => alert('Error'+JSON.stringify(error)));
    
    }

  loadForm(){
    this.registerForm = this._fb.group({
      firstname: ['',Validators.compose([Validators.required])],
      lastname: ['',Validators.compose([Validators.required])],
      email: ['',Validators.compose([Validators.required,Validators.email])],
      password: ['',Validators.compose([Validators.required])],
      uuid:['']
    });
  }


  submitForm(){
    this.registerFormSubmitted = true;
    this.commonUtils.presentLoading();
    if(this.registerForm.valid){
      this.registerForm.value.uuid = this.uuid;
      this.accountService.registerUser(this.registerForm.value).subscribe((res:any)=>{
        this.commonUtils.loaderDismiss(res,'login');
      },err=>{
        this.commonUtils.loaderDismiss(err);
      });
    }
    else{
      this.commonUtils.loaderDismiss();
    }
  }

  

}

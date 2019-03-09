import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { CommonUtils } from '../../../utils/commonUtils';
import { AppsService } from '../../../services/apps.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  appAddForm: FormGroup;
  get gDetails(): FormArray {
    return <FormArray>this.appAddForm.get('details');
  }
  private details;
  errorMsg: any = {status:'Sorry',message:'Something Went Wrong!!!'};
  private len;
  param: any;
  deletedRows:any;
  passwordType = ['password'];
  passwordIcon = ['md-eye'];
  appAddFormSubmitted: boolean = false;
  constructor(
    public changeDetectorRefs: ChangeDetectorRef,
    public route: ActivatedRoute,
    public commonUtils: CommonUtils,
    public appsService: AppsService,
    public nav: NavController,public _fb: FormBuilder
    ) {
    }
    
    ngOnInit() {
      this.loadForm();
      this.route.queryParams.subscribe(params => {
        this.param = params;
        if ( params != null)
          this.getAppById(params);
      });      
    }
    getAppById(params:any)
    {
      this.details = this.appAddForm.get('details') as FormArray;
      this.appAddForm.patchValue({
        appname: params.appname,
        id: params.id
      });
      let det: any = JSON.parse(params.details);
      for( const d of det )
      {
        const arr: any = this._fb.group({
          id:d.id,
          username: d.username,
          password: d.password,
          comments: d.comments
        });
        this.details.push(arr);
      }
      this._addNew();
      this._removeItem(0);
      this._removeItem(this.details.length - 1);
    }

  loadForm(){

    this.appAddForm = this._fb.group({
      id:[null],
      appname: ['',Validators.compose([Validators.required])],
      uuid:['abcdefghij'],
      details: this._fb.array([ this.createList() ]),
      deletedRow: this._fb.array([ this.deletedRows ])
    });

    this.len = this.appAddForm.get('details') as FormArray;
  }

  createList(){
    return this._fb.group({
      id:'',
	    username: '',
	    password: '',
	    comments: ''
	  });
  }

  saveForm(){
    this.appAddFormSubmitted = true;
    this.commonUtils.presentLoading();
    console.log('Form',this.appAddForm);
    if( this.appAddForm.valid )
    {
      this.appsService.addApps(this.appAddForm.value).subscribe((res:any)=>{
        console.log('Apps Save',res);
        this.commonUtils.loaderDismiss(res,'apps',true);
      },err=>{
        this.commonUtils.loaderDismiss(this.errorMsg);
      });
    }
  }

  _addNew():void
	{
		this.details = this.appAddForm.get('details') as FormArray;
		console.log(this.details);
    this.details.push(this.createList());
    this.passwordIcon.push('md-eye');
    this.passwordType.push('password');
    this.changeDetectorRefs.detectChanges();
  }
  
  private _removeItem(i,item=null,event=null):void
	{
    console.log('Event',event);
    this.passwordIcon.slice(i,1);
    this.passwordType.slice(i,1);
		this.details = this.appAddForm.get('details') as FormArray;
    console.log(i);
    if( this.param && ( event !== null  &&  event.type === 'click' ))
    {
      this.pushDeletedRows(item);
    }
		// let index = this.items.indexOf(i);
		// console.log(index);
 	  //   if(index > -1){
      this.details.removeAt(i);
      this.changeDetectorRefs.detectChanges();
    // }
  }

  pushDeletedRows(item){
    let row = this.appAddForm.get('deletedRow') as FormArray;
    row.push(item);
  }
  
  changeInputType(i){
    if(this.passwordType[i] === 'text'){
      this.passwordType[i] = 'password';
      this.passwordIcon[i] = 'md-eye';
    }
    else if(this.passwordType[i] === 'password'){
      this.passwordType[i] = 'text';
      this.passwordIcon[i] = 'md-eye-off';
    }
    this.changeDetectorRefs.detectChanges();
  }

  cancel(){
    this.nav.goBack();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  appAddForm: FormGroup;
  private details;
  private len;
  passwordType = ['password'];
  passwordIcon = ['md-eye'];
  appAddFormSubmitted: boolean = false;
  constructor(public _fb: FormBuilder) {
    this.loadForm();
   }

  ngOnInit() {
  }

  loadForm(){

    this.appAddForm = this._fb.group({
      appname: ['',Validators.compose([Validators.required])],
      details: this._fb.array([ this.createList() ])
    });

    this.len = this.appAddForm.get('details') as FormArray;
  }

  createList(){
    return this._fb.group({
	    username: '',
	    password: '',
	    comments: ''
	  });
  }

  saveForm(){
    this.appAddFormSubmitted = true;
  }

  _addNew():void
	{
		this.details = this.appAddForm.get('details') as FormArray;
		console.log(this.details);
    this.details.push(this.createList());
    this.passwordIcon.push('md-eye');
    this.passwordType.push('password');
  }
  
  private _removeItem(i):void
	{
    this.passwordIcon.slice(i,1);
    this.passwordType.slice(i,1);
		this.details = this.appAddForm.get('details') as FormArray;
		console.log(i);
		// let index = this.items.indexOf(i);
		// console.log(index);
 	  //   if(index > -1){
      this.details.removeAt(i);
    // }
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
  }

}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {
  submitted = false;
  addPersonForm:any;
  
  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.addPersonForm = this.fb.group(
        {
          id: [''],
          fullname: new FormControl('', [Validators.required]),
          username: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
          password: ['', Validators.required],
          repassword: ['', Validators.required],
          
        }, { validator: this.checkPasswords }
      )
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.addPersonForm.controls; }
  
 
  //Checking of the same values of password and repassword
  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.repassword.value;
    return pass === confirmPass ? null : { notSame: true }; 
  }
  onSubmit(){
    this.submitted = true;
    if(this.addPersonForm.valid){

      //Fetching old data from localstorage
      var old :any = JSON.parse(localStorage.getItem('itemsArray')!) || [];
      this.addPersonForm.patchValue({
        id: old.length + 1
      })
      old.push(this.addPersonForm.value);

      //Pushing new data to local storage
      localStorage.setItem('itemsArray', JSON.stringify(old));
      this.successMessage('User data added in local storage', 'Successfully Added')
      //To reset the form data
      this.addPersonForm.reset();
    }
    
  }

  successMessage(msg:string, title:string){
    //Added success toaster message
    this.toastr.success(msg, title, {
      timeOut: 5000,
      positionClass: 'toast-bottom-right'
    } );
  }

  resetData(){
    //To reset the form data
    this.addPersonForm.reset();
    this.successMessage('Data cleared', 'Successfully Reset Data')
  }


}

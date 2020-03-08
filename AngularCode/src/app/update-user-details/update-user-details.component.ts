import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, ResponseModel } from '../app.data-model';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { createWiresService } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-update-user-details',
  templateUrl: './update-user-details.component.html',
  styleUrls: ['./update-user-details.component.css']
})
export class UpdateUserDetailsComponent implements OnInit {

  @Input() userDetails: User;
  @Input() isLoading : boolean;
  @Input() overflow : string;
  @Output() close : EventEmitter<any> = new EventEmitter();
  @Output() clearInput : EventEmitter<any> = new EventEmitter();
  @Output() reloadList : EventEmitter<any> = new EventEmitter();

  userDetailFetch: User = {
    sno : 0,
    name : "",
    email : "",
    role_type : "",
    status : "",
    mobile_number : null
  }
  title : string = "Add";
  form: FormGroup;
  checkedValue : any = "";
  updateUserModal : User = {
    sno : 0,
    name : "",
    email : "",
    role_type : "",
    status : "",
    mobile_number : ""
  }

  constructor(private formBuilder: FormBuilder, private appservice: AppService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }


  ngOnChanges(){
    if(this.userDetails != undefined){
      this.userDetailFetch = this.userDetails;
      this.checkedValue = this.userDetailFetch.role_type;

      console.log(this.userDetailFetch);
      if(this.userDetailFetch.sno == 0){

        this.userDetailFetch = {
          sno : 0,
          name : "",
          email : "",
          role_type : "",
          status : "",
          mobile_number : ""
        }

        this.userDetails = {
          sno : 0,
          name : "",
          email : "",
          role_type : "",
          status : "",
          mobile_number : ""
        }

        this.title = "Add";
        console.log('Add');
      } else {
        this.title = "Update";
        document.getElementById("inputName").innerHTML = this.userDetailFetch.name;
        console.log('Update');
      }
    }
  }


  closeModal() {
    this.close.emit(null);
  }

  reloadUserList() {
    this.reloadList.emit(null);
  }

  updateUser(name,email,mobilenumber){
     if(name == ""){
      alert("Name can't be empty");
      return;
     }
     if(email == ""){
      alert("Email can't be empty");
      return;
     }
      if(this.checkedValue == "") {
        alert("Please select the role type as Admin or Customer Executive");
        return;
      }

      console.log(name,email,mobilenumber);
      this.updateUserModal.sno = this.userDetailFetch.sno;
      this.updateUserModal.name = name;
      this.updateUserModal.email = email;
      this.updateUserModal.role_type = this.checkedValue;
      this.updateUserModal.status = this.updateUserModal.status;
      this.updateUserModal.mobile_number = mobilenumber;
      this.updateUserModal.status = "Pending";

      if(this.title == 'Add'){
      this.appservice.insertUser(this.updateUserModal).subscribe((res : ResponseModel) => {
        console.log(res.message);
        this.clearInput.emit(null);
        console.log(this.userDetailFetch);
        this.form.reset();
        this.closeModal();
        this.reloadUserList();

      });
    } else if(this.title == 'Update'){
      this.appservice.updateUser(this.updateUserModal).subscribe((res : ResponseModel) => {
        console.log(res.message);
        this.closeModal();
        this.reloadUserList()
      });
    }

  }

  onItemChange(value){
    console.log(" Value is : ", value );
    this.checkedValue = value;
 }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

}

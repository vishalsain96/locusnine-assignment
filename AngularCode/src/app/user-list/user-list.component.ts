import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import { User, ResponseModel } from '../app.data-model';
import { UpdateUserDetailsComponent } from '../update-user-details/update-user-details.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userData: User[];
  tempUserData : User[];
  display: any = 'none';
  addUserData : User = {
    sno : 0,
    name : "",
    email : "",
    role_type : "",
    status : "",
    mobile_number : ""
  }
  userDetails : User ;
  isLoading = true;
  overflow : any = 'hidden';
  isAscending = false;
  transform = "scaleY(1)"
  @Output() open: EventEmitter<any> = new EventEmitter();
  // @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(private appservice: AppService) { }

  headElements = ['NAME', 'EMAIL', 'ROLE TYPE', 'STATUS', ''];


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.appservice.getUsers().subscribe((ret: any[]) => {
      this.userData = ret;
      this.tempUserData = this.userData;
      console.log(this.userData);
      this.isLoading = false;
      this.overflow = 'scroll';
    });
  }

  openModal(data) {
    this.userDetails = data;
    this.display = 'block';
  }

  clearAddModel(){
    this.userDetails = {
      sno : 0,
      name : "",
      email : "",
      role_type : "",
      status : "",
      mobile_number : ""
    }
  }

  deleteUser(user) {
    if(confirm("Are you sure to delete user :- " + user.name)) {
      this.appservice.deleteUser(user.sno).subscribe((ret: ResponseModel) => {
        console.log(ret.message);
        this.isLoading = false;
        this.overflow = 'scroll';
        this.getUsers();
      });
    }
  }

  onCloseHandled() {
    this.display = 'none'
  }

  searchUsers(ev) {
    this.userData = this.tempUserData.filter(elem => elem.name.toLowerCase().includes(ev.toLowerCase()));
  }

  sortNames(ascending : boolean){
    if(ascending) {
      this.userData = this.tempUserData.sort((a,b) => a.name.localeCompare(b.name));
      this.transform = "scaleY(1)"
      this.isAscending = !this.isAscending;
    } else {
      this.userData = this.tempUserData.sort((a,b) => b.name.localeCompare(a.name));
      this.transform = "scaleY(-1)"
      this.isAscending = !this.isAscending;
    }
  }
}

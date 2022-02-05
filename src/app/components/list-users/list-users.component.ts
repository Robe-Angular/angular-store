import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import{ User } from '../../models/user'

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  public consumers: Array<User>;
  public page: number;
  public total: number;
  public pages: number;
  public sort: string;
  public status: string;
  public token: any;


  constructor(
    private _userService: UserService
  ) { 
    this.consumers = [];
    this.page = 1;
    this.total = 0;
    this.pages = 0;
    this.sort = '';
    this.status = '';
    this.token = this._userService.getToken ();
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this._userService.getUsers(this.page, this.sort, this.token.token).subscribe(
      response => {
        this.consumers = response.users;
        this.total = response.total;
        this.pages = response.pages;
        this.status = 'success'
      }, error => {
        this.status = 'error'
      }
    )
  }

}


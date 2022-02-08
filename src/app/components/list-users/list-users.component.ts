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
  public ellipses: Array<Boolean>;
  public page: number;
  public total: number;
  public pages: number;
  public pageInitHalf: number;
  public pageFinalHalf: number;
  public sort: string;
  public status: string;
  public token: any;


  constructor(
    private _userService: UserService
  ) { 
    this.consumers = [];
    this.page = 1;
    this.pageInitHalf = 0;
    this.pageFinalHalf = 0;
    this.total = 0;
    this.pages = 0;
    this.sort = '';
    this.status = '';
    this.ellipses = [];
    this.token = this._userService.getToken ();
  }

  ngOnInit(): void {
    this.goPage(this.page);
  }
  
  pageSort(sort:string){
    this.sort =  sort;
    this.goPage(this.page);
  }

  goPage(page:number){
    this._userService.getUsers(page, this.sort, this.token.token).subscribe(
      response => {
        this.consumers = response.users;
        this.total = response.total;
        this.page = parseInt(response.page);
        this.pages = response.pages;
        this.pageInitHalf = Math.ceil(this.page/2);
        this.pageFinalHalf = Math.ceil(this.page + (this.pages - this.page)/2);
        this.checkSequence();
        this.status = 'success'
      }, error => {
        this.status = 'error'
      }
    );
  }

  checkSequence(){
    let firstVisible = {
      visible: this.page != 1,
      value: 1
    };
    let initHalfVisible = {
      visible: this.page != this.pageInitHalf && 1 != this.pageInitHalf,
      value: this.pageInitHalf
    };
    let page = {
      visible: true,
      value: this.page
    };
    let finalHalfVisible = {
      visible: this.page != this.pageFinalHalf && this.pages != this.pageFinalHalf,
      value: this.pageFinalHalf
    };
    let lastPageVisible = {
      visible: this.page != this.pages,
      value: this.pages
    };
    let pagesTargeted = [firstVisible, initHalfVisible, page ,finalHalfVisible, lastPageVisible];
    this.ellipses = [false,false,false,false]; // ellipses are ...
    let count = 0;//Count for index Ellipses array
    let firstValue = 0; //To compare between loops on forEach
    let secondValue = 0; //Íbidem

    pagesTargeted.forEach( target => {
      if(target.visible && firstValue == 0){
        firstValue = target.value;
      }else if(target.visible && firstValue != 0){
        secondValue = target.value;
        if(secondValue - 1 != firstValue){
          this.ellipses[count] = true;
        }
        firstValue = secondValue;
      }
      count += 1;     
    } );
  } //check consequence of numbers for ellipses

}


import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import{ User } from '../../models/user'
import { Router } from '@angular/router';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
  public consumers: Array<User>;
  
  public page: number;
  public total: number;
  public pagesParent: number;
  public pageInitHalf: number;
  public pageFinalHalf: number;
  public sort: string;
  public status: string;
  public token: any;


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBarService: SnackbarAdviceService
  ) { 
    this.consumers = [];
    this.page = 1;
    this.pageInitHalf = 0;
    this.pageFinalHalf = 0;
    this.total = 0;
    this.pagesParent = 0;
    this.sort = '';
    this.status = '';
    
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
        this.pagesParent = response.pages;
        this.pageInitHalf = Math.ceil(this.page/2);
        this.pageFinalHalf = Math.ceil(this.page + (this.pagesParent - this.page)/2);
        //this.checkSequence();
        this.status = 'success'
        this._snackBarService.showSnackBar('Elementos cargados','success')
      }, error => {
        this.status = 'error';
        this._snackBarService.showSnackBar(error.error.message,'error')
        this._router.navigate(['/models-boot']);

      }
    );
  }
  getPage($event:any){
    this.goPage($event);
  }
}


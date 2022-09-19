import { Component, OnInit} from '@angular/core';
import { NewCategoryKeyWordDialogComponent } from '../new-category-key-word-dialog/new-category-key-word-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { KeywordServiceService } from 'src/app/services/keyword-service.service';
import { UserService } from 'src/app/services/user.service';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';

@Component({
  selector: 'app-key-word-list',
  templateUrl: './key-word-list.component.html',
  styleUrls: ['./key-word-list.component.css']
})
export class KeyWordListComponent implements OnInit {
  public panelOpenState:boolean;
  public panelOpenStateArray:Array<boolean>;
  public token: string;
  public page: number;
  public total: number;
  public pagesParent: number;
  public pageInitHalf: number;
  public pageFinalHalf: number;  
  public categories: Array<any>;

  constructor(
    public dialog: MatDialog,
    private _adviceService:SnackbarAdviceService,
    private _keyWordService: KeywordServiceService,
    private _userService: UserService

  ) { 
    this.panelOpenState = false;
    this.panelOpenStateArray = [false,false];
    this.token = this._userService.getToken().token;
    this.page = 1;
    this.pageInitHalf = 0;
    this.pageFinalHalf = 0;
    this.total = 0;
    this.pagesParent = 0;
    this.categories = [];
  }

  ngOnInit(): void {
    this.goPage(this.page);
  }

  goPage(page:number):void{
    this._keyWordService.getCategories(this.page,this.token).subscribe(
      response => {
       
        this.categories = response.categories;//modelsBoot --> modelBoots on api :P Sorry
        this.total = response.total;
        this.page = parseInt(response.page);
        this.pagesParent = response.pages;
        this.pageInitHalf = Math.ceil(this.page / 2);
        this.pageFinalHalf = Math.ceil(this.page + (this.pagesParent - this.page) / 2);
        
        
      }, error => {
        this._adviceService.showSnackBar(error.error.message, 'error');
      }
      
    );
  }

  setBoolean(index:number){
    this.panelOpenStateArray[index] = true;
  }

  newCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryKeyWordDialogComponent, {
      width: '80%',
      maxWidth: '300px',
      restoreFocus: false,      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}

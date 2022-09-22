import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryKeyWord } from '../../models/categoryKeyWord';
import { KeywordServiceService } from 'src/app/services/keyword-service.service';
import { UserService } from 'src/app/services/user.service';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';

@Component({
  selector: 'app-new-category-key-word-dialog',
  templateUrl: './new-category-key-word-dialog.component.html',
  styleUrls: ['./new-category-key-word-dialog.component.css']
})
export class NewCategoryKeyWordDialogComponent implements OnInit {
  public newCategoryKeyWord: CategoryKeyWord;
  public token: string;

  constructor(
    private _keyWordService: KeywordServiceService,
    private _userService:UserService,
    private _snackbarAdvices: SnackbarAdviceService,
    public dialogRef:MatDialogRef<NewCategoryKeyWordDialogComponent>
  ) { 
    this.newCategoryKeyWord = new CategoryKeyWord("",[],"");
    this.token = this._userService.getToken().token;
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._keyWordService.createCategory(this.newCategoryKeyWord, this.token).subscribe(
      response => {
        this._snackbarAdvices.showSnackBar("Se ha creado una nueva categoría","success");
      },error => {
        this._snackbarAdvices.showSnackBar(error.error.message,"error");
      }
    );
  }

  closeThisDialog(){
    this.dialogRef.close();
  }

}

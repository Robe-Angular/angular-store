import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog} from '@angular/material/dialog';
import { DialogDeleteModel } from '../components/models-boot/models-boot.component';


export interface DialogData {
  model_id: string;
  modelBootTitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarAdviceService {

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  showSnackBar(snackBarText:string, status:string, durationSnackbar:number = 2000){
    if(status == 'error'){
      this._snackBar.open(snackBarText, ":)", {
        duration: durationSnackbar,
        panelClass: ['red-snackbar'],
        });
    }
    if(status == 'success'){
      this._snackBar.open(snackBarText, "ok", {
        duration: durationSnackbar,
        panelClass: ['green-snackbar']
        });
    }
  }

  openDialogDeleteModel(modelBoot_id: string, modelBoot_title: string): void {
    const dialogRef = this.dialog.open(DialogDeleteModel, {
      width: '80%',
      maxWidth: '300px',
      restoreFocus: false,
      data: { model_id: modelBoot_id, modelBootTitle: modelBoot_title }
    });

  }
}


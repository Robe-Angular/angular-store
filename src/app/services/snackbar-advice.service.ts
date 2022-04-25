import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarAdviceService {

  constructor(
    private _snackBar: MatSnackBar,
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
}

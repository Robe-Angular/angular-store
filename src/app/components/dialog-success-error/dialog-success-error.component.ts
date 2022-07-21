import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogAdvice {
  message:string;
  title:string;
  action:string;
}

@Component({
  selector: 'dialog-success',
  templateUrl: 'dialog-success.component.html',
})

export class DialogSuccess {
  constructor(
    public dialogRef: MatDialogRef<DialogSuccess>,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogAdvice
  ) {}

  okClick(): void {
    this.dialogRef.close();
    if(this.data.action="toModelsComponentReloadOnDelete"){
      this._router.navigate(['models-boot']);
    }   
  }
}

@Component({
  selector: 'dialog-error',
  templateUrl: 'dialog-error.component.html',
})

export class DialogError {
  constructor(
    public dialogRef: MatDialogRef<DialogError>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAdvice
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
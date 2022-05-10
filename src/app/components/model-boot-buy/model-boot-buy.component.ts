import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ModelBoot } from 'src/app/models/modelBoot';
import { ModelBootService } from 'src/app/services/modelBoot.service';
import { global } from 'src/app/services/global';
import {NgxImageCompressService} from "ngx-image-compress";

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-model-boot-buy',
  templateUrl: './model-boot-buy.component.html',
  styleUrls: ['./model-boot-buy.component.css']
})
export class ModelBootBuyComponent implements OnInit{

  public animal: string;
  public name: string;
  public url:string;
  public modelToBuy: ModelBoot;
  public mainImagePos: number;

  constructor(
      public dialog: MatDialog,
      private _route:ActivatedRoute,
      private _modelBootService: ModelBootService
    ) {
    this.animal = "";
    this.name = "";
    this.modelToBuy = new ModelBoot("","","","",0,"",[],[],0,0);
    this.url = global.url;
    this.mainImagePos = 0;
  }
  ngOnInit(): void {
    this._route.params.subscribe( params => {
      this.modelToBuy._id = params["modelBootId"];
      this._modelBootService.getModelBootSizes(this.modelToBuy._id).subscribe(
        response => {
          console.log(response);
          this.modelToBuy = response.modelBoot;
          this.modelToBuy.images.every( imageName => {
            if(this.modelToBuy.mainImage == imageName){
              return false;
            }
            this.mainImagePos += 1;
            return true;
          });

        },
        error => {
          console.log(error);
        }
      );

    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
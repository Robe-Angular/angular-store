import { Component, OnInit, Inject,ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelBoot } from 'src/app/models/modelBoot';
import { ModelBootService } from 'src/app/services/modelBoot.service';
import { SizesService } from 'src/app/services/sizes.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';
import { QuantitiesModelBootComponent } from '../quantities-model-boot/quantities-model-boot.component';
import { DialogDeleteModel } from '../models-boot/models-boot.component';

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
export class ModelBootBuyComponent implements OnInit, AfterViewChecked{

  public animal: string;
  public name: string;
  public url:string;
  public modelToBuy: ModelBoot;
  public mainImagePos: number;
  public bigImagePos: number;//Image on big screen}
  public images: Array<string>;
  public sizes: Array<any>;
  public capableSizes: Array<any>;
  public loggedCostumer:User;
  public token:string;
  

  constructor(
      public dialog: MatDialog,
      private _route:ActivatedRoute,
      private _modelBootService: ModelBootService,
      private _sizesService: SizesService,
      private _userService: UserService,
      private _advicesService: SnackbarAdviceService,
      private _router: Router,
      private _cdr: ChangeDetectorRef
    ) {
    this.animal = "";
    this.name = "";
    this.modelToBuy = new ModelBoot("","","","",0,"",[],[],0,0);
    this.url = global.url;
    this.mainImagePos = 0;
    this.bigImagePos = 0;
    this.images = [];
    this.sizes = [];
    this.capableSizes = [];
    this.loggedCostumer = this._userService.getIdentity().user;
    this.token = this._userService.getToken();
  }

  ngAfterViewChecked(): void {
    this._cdr.detectChanges();
  }

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      this.modelToBuy._id = params["modelBootId"];
      this._modelBootService.getModelBootSizes(this.modelToBuy._id).subscribe(
        response => {
          
          this.modelToBuy = response.modelBoot;
          this.images = this.modelToBuy.images;
          this.sizes = response.sizes;
          

          this.modelToBuy.images.every( imageName => {
            if(this.modelToBuy.mainImage == imageName){
              return false;
            }
            this.mainImagePos += 1;
            return true;
          });//Find position of the main image in the array
          this.bigImagePos = this.mainImagePos;
          
          this.sortSizesAndShow(this.sizes);

        },
        error => {
          console.log(error);
        }
      );

    })
  }

  sortSizesAndShow(sizesModelBoot:any){
    this.capableSizes = this._sizesService.getCapableSizes(sizesModelBoot);
  }

  openDialogQuantities(isAdd:boolean){
    const dialogRef = this.dialog.open(QuantitiesModelBootComponent, {
      width: '80%',
      maxWidth: '300px',
      restoreFocus: false,
      data: { addOrSubtract:isAdd, modelBootId: this.modelToBuy._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  showBigImage(i:number){
    this.bigImagePos = i;
  }

  openDialogDeleteModel(modelToBuyId:string,modelTitle:string){
    let modelBoot_id_title = [modelToBuyId,modelTitle];
    this._advicesService.openDialogDeleteModel(modelBoot_id_title, (result:any) => {
      if(result){
        this._router.navigate(['models-boot']);
      }
      
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
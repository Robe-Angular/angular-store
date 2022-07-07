import { ModelBoot } from 'src/app/models/modelBoot';
import { User } from 'src/app/models/user';
import { ModelBootService } from 'src/app/services/modelBoot.service';
import { UserService } from 'src/app/services/user.service';

import { global } from 'src/app/services/global';
import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogError, DialogSuccess } from '../dialog-success-error/dialog-success-error.component';
import { ActivatedRoute, Router } from '@angular/router';

import { SizesService } from 'src/app/services/sizes.service';


export interface DialogData {
  model_id: string;
  modelBootTitle: string;
}

/**
 * @title Dialog Overview
 */

@Component({
  selector: 'app-models-boot',
  templateUrl: './models-boot.component.html',
  styleUrls: ['./models-boot.component.css']
})
export class ModelsBootComponent implements OnInit {

  public user: User;
  public token: string;
  public createModelStatus: string;
  public modelsBoot: Array<ModelBoot>;
  public url: string;
  public page: number;
  public total: number;
  public pagesParent: number;
  public pageInitHalf: number;
  public pageFinalHalf: number;
  public sort: string;
  public status: string;
  public totalSizes: Array<any>;
  public capableSizesOfListModels: Array<Array<any>>;
  public descriptionToURL: Array<string>;


  constructor(
    private _userService: UserService,
    private _modelBootService: ModelBootService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sizesService: SizesService,
    public dialog: MatDialog
  ) {
    this.createModelStatus = '';
    this.modelsBoot = [];
    this.url = global.url;
    this.page = 1;
    this.pageInitHalf = 0;
    this.pageFinalHalf = 0;
    this.total = 0;
    this.pagesParent = 0;
    this.sort = '';
    this.status = '';
    this.totalSizes = [];
    this.capableSizesOfListModels = [];
    this.user = this._userService.getIdentity().user;
    this.token = this._userService.getToken().token;
    this.descriptionToURL = [];
    this._router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
  }

  ngOnInit(): void {
    this.getPageFromURL();
    this.goPage(this.page);
    
  }

  getPageFromURL(): void {
    this._route.params.subscribe(params => {
      this.page = params["page"];
    });
  }

  getPage(page: number) {
    this._router.navigate(["models-boot",page]);
  }

  goPage(page: number) {
    this._modelBootService.getModels(page, this.sort).subscribe(
      response => {
        this.capableSizesOfListModels = [];
        this.descriptionToURL = [];        
        this.modelsBoot = response.modelBoots;//modelsBoot --> modelBoots on api :P Sorry
        this.total = response.total;
        this.page = parseInt(response.page);
        this.pagesParent = response.pages;
        this.pageInitHalf = Math.ceil(this.page / 2);
        this.pageFinalHalf = Math.ceil(this.page + (this.pagesParent - this.page) / 2);
        this.getModelBootSizes();//Get sizes for Models Boot

        this.modelsBoot.forEach( modelBoot => {
          let descriptionOptimized = "";
          descriptionOptimized = modelBoot.description.replaceAll(" ","-");
          this.descriptionToURL.push(descriptionOptimized);
        });//human-read to description on url

        //console.log(this.totalSizes);
        //console.log(this.capableSizesOfListModels);
        //this.checkSequence();
        this.status = 'success'
      }, error => {
        this.status = 'error'
      }
    );
  }

  getModelBootSizes() {
    this.modelsBoot.forEach(modelBoot => {
      this._modelBootService.getModelBootSizes(modelBoot._id).subscribe(
        response => {
          let modelSizes = response.sizes;
          let capableSizesModel: any = this._sizesService.getCapableSizes(modelSizes);

          this.totalSizes.push(modelSizes);         

          this.capableSizesOfListModels.push(capableSizesModel);
          /*this.capableSizesOfListModels.forEach((capableSizesModel: any) => {
            capableSizesModel.sort();
          });//Sort for correct visualization*///--replaced with service

        }, error => {
          this.totalSizes.push([]);
          this.capableSizesOfListModels.push([]);          
        }
      );
    });
  }
  parentFeedback(feedback: string) {
    if (feedback == 'create-model-boot-success') {
      this.createModelStatus = 'success';
    }
  }

  openDialogDelete(modelBoot_id: string, modelBoot_title: string): void {
    const dialogRef = this.dialog.open(DialogDeleteModel, {
      width: '80%',
      maxWidth: '300px',
      restoreFocus: false,
      data: { model_id: modelBoot_id, modelBootTitle: modelBoot_title }
    });

  }
  trackByFn(index: any, item: any) {
    return index;
  }
}

@Component({
  selector: 'dialog-delete-model',
  templateUrl: 'dialog-delete-model.html',
})

export class DialogDeleteModel {
  public token:string;
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteModel>,
    public dialog: MatDialog,
    private _modelBootService: ModelBootService,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    this.token = this._userService.getToken().token;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(model_id: string): void {
    this.dialogRef.close();
    this._modelBootService.deleteModel(model_id, this.token).subscribe(
      response => {
        const dialogSuccess = this.dialog.open(DialogSuccess, {
          width: '80%',
          maxWidth: '300px',
          restoreFocus: false,
          data: { title: "Eliminado", message: "Se ha eliminado con éxito", action:"reloadOnDelete" }
        });
        
      }, error => {
        const dialogError = this.dialog.open(DialogError, {
          width: '80%',
          maxWidth: '300px',
          restoreFocus: false,
          data: { title: "Error", message: error.error.message, action:""}
        });
      }
    )
  }

}
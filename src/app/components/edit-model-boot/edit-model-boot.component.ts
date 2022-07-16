import { Component, OnInit, Output ,EventEmitter,Inject } from '@angular/core';

import { Router, ActivatedRoute, RouterState} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelBoot } from '../../models/modelBoot';
import { ModelBootService } from '../../services/modelBoot.service';
import { UserService } from 'src/app/services/user.service';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';
import { global } from 'src/app/services/global';

export interface DialogData {
  discard: boolean;
  index: number;
}

@Component({
  selector: 'app-edit-model-boot',
  templateUrl: './edit-model-boot.component.html',
  styleUrls: ['./edit-model-boot.component.css']
})
export class EditModelBootComponent implements OnInit {
  
  messageEvent = new EventEmitter<string>();
  public editModelBoot: ModelBoot;
  public status:string;
  public maxSize: number;
  public minSize: number;
  public url: string;
  public token: string;
  public filesSelected: File[];
  public filesToUpload: File[];
  public urlsOnLocal: string[];
  public imagesUploaded: string[];
  public mainImage: string;
  
  //public filesNon: File[];
  //public filesPar: File[];

  constructor(
    public dialog: MatDialog,
    private _snackbarService: SnackbarAdviceService,
    private _modelBootService: ModelBootService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) { 
    this.status = '';
    this.editModelBoot = new ModelBoot();
    this.maxSize = 0;
    this.minSize = 0;
    this.url = global.url;
    this.token = this._userService.getToken().token;
    this.filesSelected = [];
    this.filesToUpload = [];
    this.urlsOnLocal = [];
    this.imagesUploaded = [];
    this.mainImage = "";
    
    
    //this.filesNon = [];
    //this.filesPar = [];
  }

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      
      this.editModelBoot._id = params['modelBootId'];

      this._modelBootService.getModelBootSizes(this.editModelBoot._id).subscribe(
        response => {
          this.editModelBoot = response.modelBoot;
          let sizes = response.sizes;
          sizes.sort((s1:any,s2:any) => {return s1.size - s2.size});
          let lastOnSizes = sizes.length - 1;
          this.maxSize = sizes[lastOnSizes].size;
          this.minSize = sizes[0].size;

          this.imagesUploaded = this.editModelBoot.images;
          this.mainImage = this.editModelBoot.mainImage;

        },error => {
          this._snackbarService.showSnackBar(error.error.message,'error');
          console.log(error);
        }
      );
    });   
        
  }

  onSubmit(form:any):void{ 
    this.editModelBoot.maxSize = this.maxSize;
    this.editModelBoot.minSize = this.minSize;
    this._modelBootService.updateModel(this.editModelBoot, this.token).subscribe(
      async response => {
        //identity        
        if(response.status != Error){
          this.status = 'success';
          this.messageEvent.emit('create-model-boot-success');
          this._snackbarService.showSnackBar('Modelo actualizado con éxito', 'success');
          await this.uploadImages();
          this._router.navigate(['/models-boot']);
          
        }else{
          this.status = 'error';
          this._snackbarService.showSnackBar(response.error.message, 'error');

        }
      },
      error => {
        this._snackbarService.showSnackBar(error.error.message, 'error');
        this.status = error.error && error.error.status == 300 ? 'createInvalid':'createError'       
      }
    );
  }

  

  fileChangeEvent(fileInput: any){
    this.urlsOnLocal = [];
    this.filesSelected = <Array<File>>fileInput.target.files;

    Array.from(this.filesSelected).forEach((element:any) => {
      this.filesToUpload.push(element);
    });
    this.setUrlsOfFilesToUpload();
    console.log("here uploading...");
    console.log(this.filesToUpload);

    /*
    console.log(this.filesToUpload);
    let counter = 0
    Array.from(this.filesToUpload).forEach((element:any) => {
      if(counter % 2 != 0){
        this.filesNon.push(element);
        console.log("true");
      }else{
        this.filesPar.push(element);
      }
      counter += 1;
    })
    counter = 0;
    console.log(this.filesNon);
    console.log(this.filesPar);
    */
  }

  setUrlsOfFilesToUpload(){
    this.urlsOnLocal = [];
    if(this.filesToUpload){
      for(let file of this.filesToUpload){
        let reader = new FileReader();
        reader.onload = (e:any) => {
          this.urlsOnLocal.push(e.target.result)
        }
        reader.readAsDataURL(file);
      }
    }
  }

  uploadImages(){
    this._modelBootService.uploadModelImage(this.filesToUpload,this.token,this.editModelBoot._id);
  }

  activateUpload(){
    document.getElementById('upload')!.click(); 
  }

  discardPreUpload(preUploadPos:number){
    this.filesToUpload.splice(preUploadPos, 1);
    this.setUrlsOfFilesToUpload();
  }

  dialogDiscardFile(preUploadPos:number){
    const dialogRef = this.dialog.open(DialogDiscardFile, {
      width: '250px',
      data: {discard: true, index: preUploadPos},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.discardPreUpload(preUploadPos);
      }
    });
  }
}

@Component({
  selector: 'dialog-discard-file',
  templateUrl: 'dialog-discard-file.html',
})

export class DialogDiscardFile {
  constructor(
    public dialogRef: MatDialogRef<DialogDiscardFile>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}



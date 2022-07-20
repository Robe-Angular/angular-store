import { Component, OnInit, Output ,EventEmitter,Inject } from '@angular/core';

import { Router, ActivatedRoute, RouterState} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelBoot } from '../../models/modelBoot';
import { ModelBootService } from '../../services/modelBoot.service';
import { UserService } from 'src/app/services/user.service';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';
import { global } from 'src/app/services/global';

export interface DialogData {
  deleteFile: boolean;
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
      this.loadData();
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

  deleteUploaded(posToDelete:number){
    let deleteFileCommandString :string = this.editModelBoot._id + '/' + this.imagesUploaded[posToDelete];
    this._modelBootService.deleteFile(deleteFileCommandString,this.token).subscribe( 
      response => {
        this._snackbarService.showSnackBar('Imagen eliminada con éxito', 'success');
        this.loadData();
      },
      error => {
        this._snackbarService.showSnackBar(error.error.message, 'error');
      }
    );
  }

  setMainImage(posToSetMain:number){
    let urlNewMainImage = this.imagesUploaded[posToSetMain];
    let mainImageCommandString = this.editModelBoot._id + '/' + urlNewMainImage;

    this._modelBootService.setMainImage(mainImageCommandString,this.token).subscribe(
      response => {
        this._snackbarService.showSnackBar('Se ha cambiado la imagen principal', 'success');
        this.loadData();
      },
      error => {
        this._snackbarService.showSnackBar(error.error.message, 'error');
      }
    );
  }

  loadData(){
    this._modelBootService.getModelBootSizes(this.editModelBoot._id).subscribe(
      response => {
        this.editModelBoot = response.modelBoot;
        let sizes = response.sizes;
        console.log(response);
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
  }

  dialogDiscardFile(disallowedFile:number,deleteFile: boolean){
    const dialogRef = this.dialog.open(DialogDiscardFile, {
      width: '250px',
      data: {deleteFile: deleteFile ,discard: true, index: disallowedFile},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(deleteFile){
          this.deleteUploaded(disallowedFile);
        }else{
          this.discardPreUpload(disallowedFile);
        }
        
      }
    });
  }
}

@Component({
  selector: 'dialog-discard-file',
  templateUrl: 'dialog-discard-file.html',
})

export class DialogDiscardFile {
  public deleteFile: boolean;
  constructor(

    public dialogRef: MatDialogRef<DialogDiscardFile>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.deleteFile = data.deleteFile;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}



import { Component, OnInit,Inject, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelBootService } from 'src/app/services/modelBoot.service';
import { UserService } from 'src/app/services/user.service';
import { SizesService } from 'src/app/services/sizes.service';


interface DialogData{
  addOrSubtract: boolean;
  modelBootId: string;
}

@Component({
  selector: 'app-quantities-model-boot',
  templateUrl: './quantities-model-boot.component.html',
  styleUrls: ['./quantities-model-boot.component.css']
})
export class QuantitiesModelBootComponent implements OnInit,AfterViewChecked {
  
  public token: string;
  public sizes:any[];
  public sizesValues:string[];
  public isAdd:boolean;
  public bodyReq: any;

  constructor(
    public dialogRef: MatDialogRef<QuantitiesModelBootComponent>,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _advicesService: SnackbarAdviceService,
    private _userService: UserService,
    private _modelBootService: ModelBootService,
    private _sizesService:SizesService,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    this.token = this._userService.getToken().token;
    this.sizes = [];
    this.sizesValues = [];
    this.isAdd = true;
  }

  ngAfterViewChecked(){
    this._changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.setIsAdd(this.data.addOrSubtract);
    this.getModelSetSizesToZero();
  }

  change(event:any,index:number){
    this.sizesValues[index] = event.target.value;
  }

  submit(){
    this.constructBodyReq();
    if(this.isAdd){
      this._modelBootService.addQuantity(this.data.modelBootId,this.bodyReq,this.token).subscribe( 
        response => {
          this.dialogRef.close();
          this._advicesService.showSnackBar("Cantidades añadidas", "success");
        },error => {
          console.log(error);
          this._advicesService.showSnackBar(error.error.message, "error");
        }
      );
    }else{
      this._modelBootService.subtractQuantity(this.data.modelBootId,this.bodyReq,this.token).subscribe( 
        response => {
          this.dialogRef.close();
          this._advicesService.showSnackBar("Cantidades restadas", "success");
        },error => {
          console.log(error);
          this._advicesService.showSnackBar(error.error.message, "error");
        }
      );
    }
    
  }

  constructBodyReq(){
    let minSize = this.sizes[0].size;
    let maxSize = this.sizes[this.sizes.length-1].size;
    let objectStringToParse = "";
    let counter = 0;
    this.sizes.forEach(sizeElement => {      

      if(sizeElement.size==minSize){

        objectStringToParse += "{"+ "\""  + sizeElement.size + "\""+ ":" + "\"" + this.sizesValues[0] + "\"" + ',';

      }
      if(sizeElement.size==maxSize){
        objectStringToParse += "\""  + sizeElement.size + "\"" + ":" + "\"" +this.sizesValues[this.sizes.length - 1] + "\"" +  '}';
      }
      
      if(sizeElement.size != minSize && sizeElement.size != maxSize){
        objectStringToParse += "\""  + sizeElement.size + "\"" + ":" + "\"" + this.sizesValues[counter] + "\"" + ',';
      }

      counter += 1;

    });

    this.bodyReq = JSON.parse(objectStringToParse) as string;
    
  }
  

  getModelSetSizesToZero(){
    this._modelBootService.getModelBootSizes(this.data.modelBootId).subscribe(
      response => {    
        this.sizes = this._sizesService.sortSizes(response.sizes);
        for(let i = 0; i < this.sizes.length; i++){
          this.sizesValues[i] = "0";
        }
      },error => {
        this._advicesService.showSnackBar("error loading data","error");
      }
    )
  }

  setIsAdd(isAdd:boolean){
    this.isAdd = isAdd;
  }

  closeThisDialog(){
    this.dialogRef.close();
  }
}

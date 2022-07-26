import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelBootService } from 'src/app/services/modelBoot.service';
import { ModelBoot } from 'src/app/models/modelBoot';
import { UserService } from 'src/app/services/user.service';

interface DialogData{
  addOrSubtract: boolean;
  modelBootId: string;
}

@Component({
  selector: 'app-quantities-model-boot',
  templateUrl: './quantities-model-boot.component.html',
  styleUrls: ['./quantities-model-boot.component.css']
})
export class QuantitiesModelBootComponent implements OnInit {
  
  public token: string;
  public sizes:any[];
  public isAdd:boolean;

  constructor(
    public dialogRef: MatDialogRef<QuantitiesModelBootComponent>,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _advicesService: SnackbarAdviceService,
    private _userService: UserService,
    private _modelBootService: ModelBootService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    this.token = '';
    this.sizes = [];
    this.isAdd = true;
  }

  ngOnInit(): void {
    this.setIsAdd(this.data.addOrSubtract);
  }

  getModel(){
    this._modelBootService.getModelBootSizes(this.data.modelBootId).subscribe(
      response => {
        this.sizes = response.sizes;
      },error => {
        this._advicesService.showSnackBar("error loading data","error");
      }
    )
  }

  setIsAdd(isAdd:boolean){
    this.isAdd = isAdd;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';
import { ModelBootService } from 'src/app/services/modelBoot.service';
import { ModelBoot } from 'src/app/models/modelBoot';


@Component({
  selector: 'app-quantities-model-boot',
  templateUrl: './quantities-model-boot.component.html',
  styleUrls: ['./quantities-model-boot.component.css']
})
export class QuantitiesModelBootComponent implements OnInit {
  public paramAdd: string;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _advicesService: SnackbarAdviceService
  ) { 
    this.paramAdd = '';
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe( params => {
      this.paramAdd = params['add'];
   },error => {
    this._advicesService.showSnackBar( error,'error' );
   });
  }

  setParamAdd(paramNewValue:string){
    this.paramAdd = paramNewValue;
    console.log(this.paramAdd);
  }
}

import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ModelBoot } from '../../models/modelBoot';
import { ModelBootService } from '../../services/modelBoot.service';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';

@Component({
  selector: 'app-create-model-boot',
  templateUrl: './create-model-boot.component.html',
  styleUrls: ['./create-model-boot.component.css']
})
export class CreateModelBootComponent implements OnInit {
  
  messageEvent = new EventEmitter<string>();
  public newModel: ModelBoot;
  public status:string;
  constructor(
    private _snackbarService: SnackbarAdviceService,
    private _modelBootService: ModelBootService,
    private _router: Router,
    private _route: ActivatedRoute

  ) { 
    this.status = '';
    this.newModel = new ModelBoot();
  }

  ngOnInit(): void {
    //Se ejecuta siempre y cierra sesión sólo cuando le llega el parámetro action por la urL
        
  }

  onSubmit(form:any):void{
    
    this._modelBootService.newModel(this.newModel).subscribe(
      response => {
        //identity        
        if(response.status != Error){
          this.status = 'success';
          this.messageEvent.emit('create-model-boot-success');
          this._router.navigate(['/models-boot']);
          this._snackbarService.showSnackBar("modelBootSuccess","success");
        }else{
          this.status = 'error';
          
        }
      },
      error => {
        console.log(error);
        this._snackbarService.showSnackBar(error.error.message,"error");
        this.status = error.error && error.error.status == 300 ? 'createInvalid':'createError'       
      }
    );
  }
}


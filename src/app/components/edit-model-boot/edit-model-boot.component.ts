import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, RouterState} from '@angular/router';
import { ModelBoot } from '../../models/modelBoot';
import { ModelBootService } from '../../services/modelBoot.service';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';
import { global } from 'src/app/services/global';

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
  constructor(
    private _snackbarService: SnackbarAdviceService,
    private _modelBootService: ModelBootService,
    private _router: Router,
    private _route: ActivatedRoute

  ) { 
    this.status = '';
    this.editModelBoot = new ModelBoot();
    this.maxSize = 0;
    this.minSize = 0;
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      
      this.editModelBoot._id = params['modelBootId'];

      this._modelBootService.getModelBootSizes(this.editModelBoot._id).subscribe(
        response => {
          this.editModelBoot = response.modelBoot;
          let sizes = response.sizes;
          sizes.sort((s1:any,s2:any) => s2.size > s1.size);
          let lastOnSizes = sizes.length - 1;
          this.maxSize = sizes[lastOnSizes].size;
          this.minSize = sizes[0].size;

        },error => {
          this._snackbarService.showSnackBar(error.error.message,'error');
          console.log(error);
        }
      );
    });
    
        
  }

  onSubmit(form:any):void{ 
    
    this._modelBootService.updateModel(this.editModelBoot).subscribe(
      response => {
        //identity        
        if(response.status != Error){
          this.status = 'success';
          this.messageEvent.emit('create-model-boot-success');
          this._snackbarService.showSnackBar('Modelo actualizado con éxito', 'success');
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
}



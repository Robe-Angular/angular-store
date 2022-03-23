import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, RouterState} from '@angular/router';
import { ModelBoot } from '../../models/modelBoot';
import { ModelBootService } from '../../services/modelBoot.service';

@Component({
  selector: 'app-edit-model-boot',
  templateUrl: './edit-model-boot.component.html',
  styleUrls: ['./edit-model-boot.component.css']
})
export class EditModelBootComponent implements OnInit {
  
  messageEvent = new EventEmitter<string>();
  public editModelBoot: ModelBoot;
  public status:string;
  constructor(
    private _modelBootService: ModelBootService,
    private _router: Router,
    private _route: ActivatedRoute

  ) { 
    this.status = '';
    this.editModelBoot = new ModelBoot();
  }

  ngOnInit(): void {
    this._route.params.subscribe( params => {
      
      this.editModelBoot._id = params['modelBootId'];

      this._modelBootService.getModelBootSizes(this.editModelBoot._id).subscribe(
        response => {
          console.log(response);
        },error => {
          console.log(error);
        }
      );
    });
    
        
  }

  onSubmit(form:any):void{ 
    
    this._modelBootService.newModel(this.editModelBoot).subscribe(
      response => {
        //identity        
        if(response.status != Error){
          this.status = 'success';
          this.messageEvent.emit('create-model-boot-success');
          this._router.navigate(['/models-boot']);
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = error.error && error.error.status == 300 ? 'createInvalid':'createError'       
      }
    );
  }
}



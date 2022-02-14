import { Component, OnInit } from '@angular/core';
import { ModelBoot } from 'src/app/models/modelBoot';
import { ModelBootService } from 'src/app/services/modelBoot.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-models-boot',
  templateUrl: './models-boot.component.html',
  styleUrls: ['./models-boot.component.css']
})
export class ModelsBootComponent implements OnInit {
  
  public createModelStatus: string;
  public modelsBoot : Array<ModelBoot>;
  public url: string;

  constructor(
    private _modelBootService: ModelBootService

  ) { 
    this.createModelStatus = '';
    this.modelsBoot = [];
    this.url = global.url;
  }

  ngOnInit(): void {
    this._modelBootService.getModels().subscribe(
      response => {
        this.modelsBoot = response.modelBoots
      },error => {

      }
    );
  }

  parentFeedback(feedback: string){
    if(feedback == 'create-model-boot-success'){
      this.createModelStatus = 'success';
    }
  }

}

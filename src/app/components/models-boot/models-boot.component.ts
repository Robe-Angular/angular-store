import { Component, OnInit } from '@angular/core';
import { ModelBoot } from 'src/app/models/modelBoot';
import { ModelBootService } from 'src/app/services/modelBoot.service';
import { global } from 'src/app/services/global';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-models-boot',
  templateUrl: './models-boot.component.html',
  styleUrls: ['./models-boot.component.css']
})
export class ModelsBootComponent implements OnInit {
  
  public createModelStatus: string;
  public modelsBoot : Array<ModelBoot>;
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


  constructor(
    private _modelBootService: ModelBootService

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
  }

  ngOnInit(): void {
    this.goPage(this.page);
  }
  getPage(page:number){
    this.goPage(page);
  }

  goPage(page:number){
    this._modelBootService.getModels(page, this.sort).subscribe(
      response => {
        this.capableSizesOfListModels = [];
        this.modelsBoot = response.modelBoots;//modelsBoot --> modelBoots on api :P Sorry
        this.total = response.total;
        this.page = parseInt(response.page);
        this.pagesParent = response.pages;
        this.pageInitHalf = Math.ceil(this.page/2);
        this.pageFinalHalf = Math.ceil(this.page + (this.pagesParent - this.page)/2);

        this.getModelBootSizes();//Get sizes for Models Boot
        
        console.log(this.totalSizes);
        console.log(this.capableSizesOfListModels);
        //this.checkSequence();
        this.status = 'success'
      }, error => {
        this.status = 'error'
      }
    );
  }

  getModelBootSizes(){
    this.modelsBoot.forEach( modelBoot => {
      this._modelBootService.getModelBootSizes(modelBoot._id).subscribe(
        response=>{
          let modelSizes = response.sizes;
          let capableSizesModel:any = [];

          this.totalSizes.push(modelSizes);
          
          modelSizes.forEach( (modelSize:any) => {
            if(modelSize.quantity > 0){
              capableSizesModel.push(modelSize.size);
            }
          });
          this.capableSizesOfListModels.push(capableSizesModel);
          this.capableSizesOfListModels.forEach( (capableSizesModel:any) => {
            capableSizesModel.sort();
          });//Sort for correct visualization
          
        },error => {
          this.totalSizes.push([]);
          this.capableSizesOfListModels.push([]);
          console.log(error)
        }
      );
    });
  }
  parentFeedback(feedback: string){
    if(feedback == 'create-model-boot-success'){
      this.createModelStatus = 'success';
    }
  }

}

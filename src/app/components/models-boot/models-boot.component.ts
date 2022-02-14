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
  public page: number;
  public total: number;
  public pagesParent: number;
  public pageInitHalf: number;
  public pageFinalHalf: number;
  public sort: string;
  public status: string;

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
  }

  ngOnInit(): void {
    this._modelBootService.getModels().subscribe(
      response => {
        this.modelsBoot = response.modelBoots;//modelBoots many modelsBoot :P Sorry
      },error => {

      }
    );
  }
  getPage(page:number){
    this.goPage(page);
  }

  goPage(page:number){
    this._modelBootService.getModels(page, this.sort).subscribe(
    response => {
      this.modelsBoot = response.modelBoots;//modelBoots many modelsBoot on api :P Sorry
      this.total = response.total;
      this.page = parseInt(response.page);
      this.pagesParent = response.pages;
      this.pageInitHalf = Math.ceil(this.page/2);
      this.pageFinalHalf = Math.ceil(this.page + (this.pagesParent - this.page)/2);
      //this.checkSequence();
      this.status = 'success'
    }, error => {
      this.status = 'error'
    }
  );
}

  parentFeedback(feedback: string){
    if(feedback == 'create-model-boot-success'){
      this.createModelStatus = 'success';
    }
  }

}

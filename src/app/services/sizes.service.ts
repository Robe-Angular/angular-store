import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizesService {

  constructor() { 

  }

  sortSizes(modelSizes:Array<any>){
    modelSizes.sort((a:any,b:any) =>
      a.size - b.size
    );    
    return modelSizes;
  }

  getCapableSizes(modelSizes:Array<any>): any[]{
    let capableSizesModel: any[] = [];
    let modelSizesSorted = this.sortSizes(modelSizes);
    modelSizesSorted.forEach((modelSize: any) => {
      if (modelSize.quantity > 0) {
        capableSizesModel.push(modelSize.size);              
      }
    });

    return capableSizesModel;
  }
}

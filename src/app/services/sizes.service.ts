import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizesService {

  constructor() { 

  }

  getCapableSizes(modelSizes:Array<any>): any[]{
    let capableSizesModel: any[] = [];
    modelSizes.sort((a:any,b:any) =>
      a.size - b.size
    );    
    modelSizes.forEach((modelSize: any) => {
      if (modelSize.quantity > 0) {
        capableSizesModel.push(modelSize.size);              
      }
    });

    return capableSizesModel;
  }
}

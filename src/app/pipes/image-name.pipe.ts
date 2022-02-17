import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageName'
})
export class ImageNamePipe implements PipeTransform {

  transform(value: string): string {
    let valueSplitDash = value.split('/');
    let getMime = valueSplitDash[5].split('.')
    console.log(valueSplitDash[6]);
    let noConflictiveCharakters = valueSplitDash[6].replaceAll(' ','-')
      .replaceAll('á','a')
      .replaceAll('é','e')
      .replaceAll('í','i')
      .replaceAll('ó','o')
      .replaceAll('ú','u')

    console.log(noConflictiveCharakters);
    valueSplitDash[6] =  noConflictiveCharakters + '.' +getMime[1];
    valueSplitDash[5] = getMime[0];
    let completeUrl = valueSplitDash.join('/');
    return completeUrl;
  }

}

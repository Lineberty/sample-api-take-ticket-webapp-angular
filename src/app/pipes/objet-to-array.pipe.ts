import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objetToArray'
})
export class ObjetToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (let key in value) {
      keys.push(value[key]);
    }
    return keys;
  }

}

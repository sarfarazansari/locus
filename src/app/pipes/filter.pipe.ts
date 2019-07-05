import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], fields: string[], value: string): any[] {
    if (!items) {
      return [];
    }
    if (!value || value.length === 0) {
      return items;
    }
    return items.filter(item => {
      if (item) {
        return item[fields[0]].toLowerCase().indexOf(value.toLowerCase()) !== -1
        || item[fields[1]].toLowerCase().indexOf(value.toLowerCase()) !== -1
        || item[fields[2]].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1
        || item[fields[3]].toLowerCase().indexOf(value.toLowerCase()) !== -1
        || item[fields[4]].toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }
    });
  }

}

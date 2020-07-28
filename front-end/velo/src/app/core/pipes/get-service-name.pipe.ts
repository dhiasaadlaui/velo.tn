import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getServiceName'
})
export class GetServiceNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}

import { MarketplaceService } from './../services/marketplace.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getProductName'
})
export class GetProductNamePipe implements PipeTransform {

  constructor(private _marketplaceService: MarketplaceService) {

  }

  transform(value: any, ...args: any[]): any {
    return null;
  }

}

import {inject, Injectable} from '@angular/core';
import {ValueService} from "./value.service";

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private valueService = inject(ValueService);

  // constructor( private valueService: ValueService) { }
  constructor() { }

  getValue(): string {
    return this.valueService.getValue();
  }
}

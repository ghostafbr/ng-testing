import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  private value = 'my value';

  constructor() { }

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }

  getPromiseValue(): Promise<string> {
    return Promise.resolve('Promise Value');
  }

  getObservableValue(): Observable<string> {
    return of('observable value');
  }
}

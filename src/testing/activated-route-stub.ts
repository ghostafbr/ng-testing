import { convertToParamMap, ParamMap, Params } from '@angular/router';
import {Observable, ReplaySubject} from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject: ReplaySubject<ParamMap> = new ReplaySubject<ParamMap>();
  private subjectQuery: ReplaySubject<ParamMap> = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap: Observable<ParamMap> = this.subject.asObservable();
  readonly queryParamMap: Observable<ParamMap> = this.subjectQuery.asObservable();

  /** Set the paramMap observable's next value */
  setParamMap(params: Params = {}) {
    this.subject.next(convertToParamMap(params));
  }

  setQueryParamMap(params: Params = {}) {
    this.subjectQuery.next(convertToParamMap(params));
  }
}

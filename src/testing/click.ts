import {ComponentFixture} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {queryByClass, queryByTestId} from "./finders";

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
  event: unknown = null
) {
  let element: DebugElement;
  if (withTestId) {
    element = queryByTestId(fixture, selector);
  } else {
    element = queryByClass(fixture, selector);
  }

  element.triggerEventHandler('click', event);
}

export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
) {
  let elementDebug: DebugElement;
  if (withTestId) {
    elementDebug = queryByTestId(fixture, selector);
  } else {
    elementDebug = queryByClass(fixture, selector);
  }

  const element: HTMLElement = elementDebug.nativeElement;
  element.click();
}

import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges{

  defaultColor =  'gray';
  @Input('appHighlight') bgColor: string = '';

  constructor( private element: ElementRef ) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges() {
    this.element.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }

}

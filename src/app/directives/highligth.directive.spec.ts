import {HighlightDirective} from './highlight.directive';
import {Component} from "@angular/core";
import {PersonModel} from "../models/person.model";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

@Component({
  template: `
    <h5 appHighlight>default</h5>
    <h5 class="title" appHighlight>yellow</h5>
    <p appHighlight="blue">Paragraph</p>
    <p>Other paragraph</p>
    <input [(ngModel)]="color" [appHighlight]="color">
  `,
})
class HostComponent {
  person = new PersonModel('Andrés', 'Bolaños', 28, 80, 1.75);
  selectedPerson: PersonModel | undefined;
  color: string = 'pink';

  onSelected(person: PersonModel) {
    this.selectedPerson = person;
  }
}

describe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HostComponent, HighlightDirective]
    });
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    /*const directive = new HighlightDirective();
    expect(directive).toBeTruthy();*/
    expect(component).toBeTruthy();
  });

  it('should have 3 elements with the directive', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    const elementsWithoutDirective = fixture.debugElement.queryAll(By.css('p:not([appHighlight])'));
    expect(elements.length).toBe(4);
    expect(elementsWithoutDirective.length).toBe(1);
  });

  it('should the elements match with the bgColor', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should the h5.title be default color', () => {
    const titleDebug = fixture.debugElement.query(By.css('.title'));
    const directive = titleDebug.injector.get(HighlightDirective);
    expect(titleDebug.nativeElement.style.backgroundColor).toEqual(directive.defaultColor);
  });

  it('should bind <input> and change the bgColor', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputDebug.nativeElement;
    const newColor = 'red';

    expect(inputElement.style.backgroundColor).toEqual('pink');

    inputElement.value = newColor;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputElement.style.backgroundColor).toEqual(newColor);
    expect(component.color).toEqual(newColor);
  });
});



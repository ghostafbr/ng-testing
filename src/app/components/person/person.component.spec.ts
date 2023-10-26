import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonComponent} from './person.component';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {PersonModel} from "../../models/person.model";
import {clickEvent, getText} from "../../../testing";

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonComponent]
    });
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have the name "Andrés"', () => {
    component.person = new PersonModel('Andrés', 'Bolaños', 28, 80, 1.75);
    expect(component.person.name).toEqual('Andrés');
  });

  it('should have <p>"Hello, {person.name}"', () => {
    // Arrange
    component.person = new PersonModel('Valentina', 'Ramírez', 28, 80, 1.75);
    const expectedMessage = `Hello, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3Element?.textContent).toEqual(expectedMessage);
  });

  it('should have <p> with "My height is {{person.height}}"', () => {
    // Arrange
    component.person = new PersonModel('Valentina', 'Ramírez', 28, 80, 1.75);
    const expectedMessage = `My height is ${component.person.height}`;
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    // const personElement: HTMLElement = personDebug.nativeElement;
    const pElement: HTMLElement = pDebug.nativeElement;
    // Act
    fixture.detectChanges();
    expect(pElement?.textContent).toContain(expectedMessage);
  });

  it('should display a text with the BMI when call calculateBMI', () => {
    // Arrange
    component.person = new PersonModel('Valentina', 'Ramírez', 28, 130, 1.80);
    const expectedMessage = `Morbidly Obese`;
    // const button = fixture.debugElement.query(By.css('button.btn-bmi')).nativeElement;
    // Act
    component.calculateBMI();
    fixture.detectChanges();
    const btnText = getText(fixture, 'btn-bmi');
    // Assert
    expect(btnText).toContain(expectedMessage);
  });

  it('should display a text with the BMI when click', () => {
    // Arrange
    component.person = new PersonModel('Valentina', 'Ramírez', 28, 130, 1.80);
    const expectedMessage = `Morbidly Obese`;
    // Act
    clickEvent(fixture, 'btn-bmi', true);
    fixture.detectChanges();
    const btnText = getText(fixture, 'btn-bmi');
    // Assert
    expect(btnText).toContain(expectedMessage);
  });

  it('should emit an event when do click.ts', () => {
    // Arrange
    component.person = new PersonModel('Valentina', 'Ramírez', 28, 130, 1.80);
    const buttonDebug: DebugElement = fixture.debugElement.query(By.css('button.btn-choose'));
    let selectedPerson: PersonModel | undefined;
    component.onSelected.subscribe((person: PersonModel) => {
      selectedPerson = person;
    });
    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toBe(component.person);
  });

});

@Component({
  template: `
    <app-person [person]="person" (onSelected)="onSelected($event)"/>`,
})
class TestHostComponent {
  person = new PersonModel('Andrés', 'Bolaños', 28, 80, 1.75);
  selectedPerson: PersonModel | undefined;

  onSelected(person: PersonModel) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from TestHostComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, PersonComponent]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Show the name of the person', () => {
    // Arrange
    const expectedName = component.person.name;
    const h3Debug: DebugElement = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3Element?.textContent).toContain(expectedName);
  });

  it('should rise an event when do click.ts', () => {
    // Arrange
    const buttonDebug: DebugElement = fixture.debugElement.query(By.css('app-person button.btn-choose'));
    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.person);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import {PersonComponent} from "../person/person.component";
import {PersonModel} from "../../models/person.model";
import {By} from "@angular/platform-browser";

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent]
    });
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person component', () => {
    // Arrange
    component.people = [
      new PersonModel('Juan', 'test',18, 80, 1.80),
      new PersonModel('Felipe', 'Lopéz',19, 90, 1.60)
    ];
    // Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    // Assert
    expect(debugElement.length).toEqual(component.people.length);
  });

  it('should rise an event when clicked', () => {
    // Arrange
    const debugElement = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    debugElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render the selected person', () => {
    // Arrange
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDebug = fixture.debugElement.query(By.css('.selectedPerson ul > li'));
    // Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDebug.nativeElement.textContent).toContain(component.selectedPerson?.name);
  });

});

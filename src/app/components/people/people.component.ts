import { Component } from '@angular/core';
import {PersonModel} from "../../models/person.model";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {

  person: PersonModel = new PersonModel('Juan', 'test',18, 80, 1.80);
  people: PersonModel[] = [
    new PersonModel('Juan', 'test',18, 80, 1.80),
    new PersonModel('Felipe', 'Lopéz',19, 90, 1.60)
  ];
  selectedPerson!: PersonModel | null;

  choosePerson(person: PersonModel) {
    this.selectedPerson = person;
  }

}

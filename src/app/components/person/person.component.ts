import {Component, Input} from '@angular/core';
import {PersonModel} from "../../models/person.model";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {

  @Input() person!: PersonModel; // el signo "!" es para indicar que no es null permite inicializarlo después
  bmi: string = '';

  calculateBMI(): void {
    this.bmi = this.person.calculateBMI();
  }


}

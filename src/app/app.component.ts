import {Component, OnInit} from '@angular/core';
import {Calculator} from "./calculator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title: string = 'ng-testing';

  ngOnInit(): void {
    const calculator = new Calculator();
    const rta: number = calculator.multiply(3,3);
    // console.log(rta === 9);
    const rta2: number = calculator.divide(3,1);
    // console.log(rta2 === null);
  }

}

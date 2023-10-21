import {Component, OnInit} from '@angular/core';
import {Calculator} from "./calculator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-testing-services';

  ngOnInit() {
    const calculator = new Calculator();
    const response = calculator.multiply(2, 3);
    console.log(response);

    const response2 = calculator.divide(6, 3);
    console.log(response2);
  }

}

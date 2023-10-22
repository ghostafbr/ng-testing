export class PersonModel {

  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number,
  ) {}

  calculateBMI(): string {
    const BMI = this.weight / (this.height * this.height);
    // 0 - 18 = underweight
    // 18 - 25 = normal
    // 25 - 30 = overweight
    // 30 - 35 = obese
    // 35 - 40 = severely obese
    // 40+ = morbidly obese

    if (BMI < 0 ) {
      return 'Not a valid BMI';
    } else if (BMI >= 0 && BMI < 18) {
      return 'Underweight';
    } else if (BMI >= 18 && BMI < 25) {
      return 'Normal';
    } else if (BMI >= 25 && BMI < 30) {
      return 'Overweight';
    } else if (BMI >= 30 && BMI < 35) {
      return 'Obese';
    } else if (BMI >= 35 && BMI < 40) {
      return 'Severely Obese';
    } else if (BMI >= 40) {
      return 'Morbidly Obese';
    } else {
      return 'Not a valid BMI';
    }

  }
}

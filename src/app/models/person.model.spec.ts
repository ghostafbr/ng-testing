import {PersonModel} from "./person.model";

describe('Tests for PersonModel', () => {
  let person: PersonModel;
  beforeEach(() => {
    person = new PersonModel('John', 'Doe', 30, 80, 1.80);
  });

  it('attrs', () => {
    expect(person.name).toEqual('John');
    expect(person.lastName).toEqual('Doe');
    expect(person.age).toEqual(30);
    expect(person.weight).toEqual(80);
    expect(person.height).toEqual(1.80);
  });

  describe('calculateBMI', () => {
    it('should return Underweight', () => {
      // Arrange
      person.weight = 50;
      person.height = 1.80;
      // Act
      const result = person.calculateBMI();
      // Assert
      expect(result).toEqual('Underweight');
    });

    it('should return Normal', () => {
      // Arrange
      person.weight = 70;
      person.height = 1.80;
      // Act
      const result = person.calculateBMI();
      // Assert
      expect(result).toEqual('Normal');
    });

    it('should return Overweight', () => {
      // Arrange
      person.weight = 90;
      person.height = 1.80;
      // Act
      const result = person.calculateBMI();
      // Assert
      expect(result).toEqual('Overweight');
    });

    it('should return Obese', () => {
      // Arrange
      person.weight = 100;
      person.height = 1.80;
      // Act
      const result = person.calculateBMI();
      // Assert
      expect(result).toEqual('Obese');
    });

    it('should return Severely Obese', () => {
      // Arrange
      person.weight = 110;
      person.height = 1.80;
      // Act
      const result = person.calculateBMI();
      // Assert
      expect(result).toEqual('Severely Obese');
    });

    it('should return Morbidly Obese', () => {
      // Arrange
      person.weight = 120;
      person.height = 1.80;
      // Act
      const result = person.calculateBMI();
      // Assert
      expect(result).toEqual('Morbidly Obese');
    });

    it('should return Not a valid BMI', () => {
      // Arrange
      person.weight = -1;
      person.height = 1.80;
      // Act
      const result = person.calculateBMI();
      // Assert
      expect(result).toEqual('Not a valid BMI');
    });

  });

});

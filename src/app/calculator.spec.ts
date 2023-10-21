import {Calculator} from "./calculator";

describe('Test for Calculator', () => {

  describe('Test for multiply', () => {
    it('should multiply 2 and 3', () => {
      // Arrange
      const calculator = new Calculator();

      // Act
      const response = calculator.multiply(2, 3);

      // Assert
      expect(response).toBe(6);
    });

    it('#multiply should return 4', () => {
      // Arrange
      const calculator = new Calculator();

      // Act
      const response = calculator.multiply(2, 2);

      // Assert
      expect(response).toBe(4);
    });
  });


  describe('Test for divide', () => {
    it('#divide should throw an error if divide by zero', () => {
      // Arrange
      const calculator = new Calculator();

      // Act
      const response = () => calculator.divide(6, 0);

      // Assert
      expect(response).toThrowError('Cannot divide by zero');
    })

    it('#divide should return 2', () => {
      // Arrange
      const calculator = new Calculator();

      // Act
      const response = calculator.divide(6, 3);

      // Assert
      expect(response).toBe(2);
    });
  });

  it('tests matchers', () => {
    let name = 'John';
    let name2;

    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    expect(1 + 3 === 4).toBeTruthy();
    expect(1 + 1 === 3).toBeFalsy();

    expect(5).toBeLessThan(10);
    expect(20).toBeGreaterThan(10);

    expect('1234567').toMatch(/123/);
    expect(['apples', 'oranges', 'pears']).toContain('oranges');
  });

});

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(number) {
    this.result += number;
  }

  subtract(number) {
    this.result -= number;
  }

  multiply(number) {
    this.result *= number;
  }

  divide(number) {
    if (number === 0) {
      throw new Error("Invalid den");
    }
    this.result /= number;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(inputExpression) {
    const temp = inputExpression;
    const clean = temp.replace(/\s+/g, "");
    const isValid = /^[0-9+\-*/().]+$/.test(clean);

    if (!isValid) {
      throw new Error("Invalid");
    }

    try {
      this.result = eval(inputExpression);
    } catch (error) {
      throw new Error("Invalid");
    }

    if (this.result === Infinity) {
      throw new Error("Cannot ");
    }

    return this.result;
  }
}

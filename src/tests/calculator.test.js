const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  runCli,
} = require('../calculator');

describe('calculator operations from the basic examples image', () => {
  test('adds 2 + 3', () => {
    expect(addition(2, 3)).toBe(5);
  });

  test('subtracts 10 - 4', () => {
    expect(subtraction(10, 4)).toBe(6);
  });

  test('multiplies 45 * 2', () => {
    expect(multiplication(45, 2)).toBe(90);
  });

  test('divides 20 / 5', () => {
    expect(division(20, 5)).toBe(4);
  });
});

describe('calculator arithmetic functions', () => {
  test('supports addition with negative numbers', () => {
    expect(addition(-4, 10)).toBe(6);
  });

  test('supports subtraction with decimal numbers', () => {
    expect(subtraction(10.5, 4.25)).toBe(6.25);
  });

  test('supports multiplication with zero', () => {
    expect(multiplication(45, 0)).toBe(0);
  });

  test('supports division with decimal results', () => {
    expect(division(7, 2)).toBe(3.5);
  });

  test('throws for division by zero', () => {
    expect(() => division(20, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('calculate', () => {
  test.each([
    ['addition', 2, 3, 5],
    ['+', 2, 3, 5],
    ['subtraction', 10, 4, 6],
    ['-', 10, 4, 6],
    ['multiplication', 45, 2, 90],
    ['*', 45, 2, 90],
    ['x', 9, 3, 27],
    ['division', 20, 5, 4],
    ['/', 20, 5, 4],
  ])('calculates %s for %d and %d', (operation, left, right, expected) => {
    expect(calculate(operation, left, right)).toBe(expected);
  });

  test('throws for an unsupported operation', () => {
    expect(() => calculate('%', 5, 2)).toThrow('Unsupported operation "%"');
  });
});

describe('runCli', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('prints the result when arguments are provided as <operation> <left> <right>', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    runCli(['addition', '2', '3']);

    expect(logSpy).toHaveBeenCalledWith('Result: 5');
  });

  test('prints the result when arguments are provided as <left> <operation> <right>', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    runCli(['20', '/', '5']);

    expect(logSpy).toHaveBeenCalledWith('Result: 4');
  });

  test('throws when the wrong number of arguments is provided', () => {
    expect(() => runCli(['2', '+'])).toThrow(
      'Usage: node src/calculator.js <operation> <left> <right> or node src/calculator.js <left> <operation> <right>',
    );
  });

  test('throws when a value is not numeric', () => {
    expect(() => runCli(['addition', 'two', '3'])).toThrow('Invalid left operand: "two"');
  });
});

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
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

describe('calculator operations from the extended operations image', () => {
  test('calculates modulo with 5 % 2', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('calculates power with 2 ^ 3', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('calculates square root with sqrt(16)', () => {
    expect(squareRoot(16)).toBe(4);
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

  test('supports modulo', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('throws for modulo by zero', () => {
    expect(() => modulo(20, 0)).toThrow('Modulo by zero is not allowed.');
  });

  test('supports exponentiation', () => {
    expect(power(2, 4)).toBe(16);
  });

  test('supports square root', () => {
    expect(squareRoot(81)).toBe(9);
  });

  test('throws for square root of a negative number', () => {
    expect(() => squareRoot(-9)).toThrow('Square root of a negative number is not allowed.');
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
    ['modulo', 10, 3, 1],
    ['%', 10, 3, 1],
    ['%', 5, 2, 1],
    ['power', 2, 4, 16],
    ['^', 2, 4, 16],
    ['^', 2, 3, 8],
  ])('calculates %s for %d and %d', (operation, left, right, expected) => {
    expect(calculate(operation, left, right)).toBe(expected);
  });

  test.each([
    ['squareRoot', 81, 9],
    ['sqrt', 49, 7],
    ['sqrt', 16, 4],
  ])('calculates %s for %d', (operation, value, expected) => {
    expect(calculate(operation, value)).toBe(expected);
  });

  test('throws for an unsupported operation', () => {
    expect(() => calculate('unknown', 5, 2)).toThrow('Unsupported operation "unknown"');
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

  test('prints the result for modulo', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    runCli(['modulo', '10', '3']);

    expect(logSpy).toHaveBeenCalledWith('Result: 1');
  });

  test('prints the result for modulo from the extended operations image', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    runCli(['5', '%', '2']);

    expect(logSpy).toHaveBeenCalledWith('Result: 1');
  });

  test('prints the result for power', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    runCli(['2', '^', '4']);

    expect(logSpy).toHaveBeenCalledWith('Result: 16');
  });

  test('prints the result for power from the extended operations image', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    runCli(['2', '^', '3']);

    expect(logSpy).toHaveBeenCalledWith('Result: 8');
  });

  test('prints the result for square root with <operation> <value>', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    runCli(['squareRoot', '81']);

    expect(logSpy).toHaveBeenCalledWith('Result: 9');
  });

  test('prints the result for square root from the extended operations image', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    runCli(['sqrt', '16']);

    expect(logSpy).toHaveBeenCalledWith('Result: 4');
  });

  test('prints the result for square root with <value> <operation>', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    runCli(['49', 'sqrt']);

    expect(logSpy).toHaveBeenCalledWith('Result: 7');
  });

  test('throws when the wrong number of arguments is provided', () => {
    expect(() => runCli(['2'])).toThrow(
      'Usage: node src/calculator.js <operation> <left> <right>, node src/calculator.js <left> <operation> <right>, or node src/calculator.js <operation> <value>',
    );
  });

  test('throws when a value is not numeric', () => {
    expect(() => runCli(['addition', 'two', '3'])).toThrow('Invalid left operand: "two"');
  });

  test('throws when square root receives a negative number', () => {
    expect(() => runCli(['squareRoot', '-9'])).toThrow(
      'Square root of a negative number is not allowed.',
    );
  });
});

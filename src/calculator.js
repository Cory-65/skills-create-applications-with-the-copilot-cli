#!/usr/bin/env node

/**
 * Supported calculator operations:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*, x)
 * - division (/)
 * - modulo (%, mod)
 * - exponentiation (^, power)
 * - square root (sqrt)
 */

function addition(left, right) {
  return left + right;
}

function subtraction(left, right) {
  return left - right;
}

function multiplication(left, right) {
  return left * right;
}

function division(left, right) {
  if (right === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  return left / right;
}

function modulo(left, right) {
  if (right === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return left % right;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(value);
}

const operationDefinitions = {
  '+': { handler: addition, arity: 2 },
  add: { handler: addition, arity: 2 },
  addition: { handler: addition, arity: 2 },
  '-': { handler: subtraction, arity: 2 },
  subtract: { handler: subtraction, arity: 2 },
  subtraction: { handler: subtraction, arity: 2 },
  '*': { handler: multiplication, arity: 2 },
  x: { handler: multiplication, arity: 2 },
  X: { handler: multiplication, arity: 2 },
  multiply: { handler: multiplication, arity: 2 },
  multiplication: { handler: multiplication, arity: 2 },
  '/': { handler: division, arity: 2 },
  divide: { handler: division, arity: 2 },
  division: { handler: division, arity: 2 },
  '%': { handler: modulo, arity: 2 },
  mod: { handler: modulo, arity: 2 },
  modulo: { handler: modulo, arity: 2 },
  '^': { handler: power, arity: 2 },
  exponentiation: { handler: power, arity: 2 },
  power: { handler: power, arity: 2 },
  sqrt: { handler: squareRoot, arity: 1 },
  squareroot: { handler: squareRoot, arity: 1 },
  squareRoot: { handler: squareRoot, arity: 1 },
};

function getOperationDefinition(operation) {
  return operationDefinitions[operation];
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${label}: "${value}"`);
  }

  return parsedValue;
}

function calculate(operation, left, right) {
  const definition = getOperationDefinition(operation);

  if (!definition) {
    throw new Error(
      `Unsupported operation "${operation}". Use addition, subtraction, multiplication, division, modulo, power, squareRoot, or the symbols +, -, *, /, %, ^.`,
    );
  }

  if (definition.arity === 1) {
    return definition.handler(left);
  }

  return definition.handler(left, right);
}

function runCli(args = process.argv.slice(2)) {
  const usage =
    'Usage: node src/calculator.js <operation> <left> <right>, node src/calculator.js <left> <operation> <right>, or node src/calculator.js <operation> <value>';

  if (args.length !== 2 && args.length !== 3) {
    throw new Error(usage);
  }

  if (args.length === 2) {
    let operation = args[0];
    let valueInput = args[1];

    if (getOperationDefinition(args[1])?.arity === 1) {
      valueInput = args[0];
      operation = args[1];
    }

    const definition = getOperationDefinition(operation);

    if (!definition || definition.arity !== 1) {
      throw new Error(usage);
    }

    const value = parseNumber(valueInput, 'value');
    const result = calculate(operation, value);

    console.log(`Result: ${result}`);
    return;
  }

  let operation = args[0];
  let leftInput = args[1];
  let rightInput = args[2];

  if (getOperationDefinition(args[1])?.arity === 2) {
    leftInput = args[0];
    operation = args[1];
    rightInput = args[2];
  }

  const left = parseNumber(leftInput, 'left operand');
  const right = parseNumber(rightInput, 'right operand');
  const result = calculate(operation, left, right);

  console.log(`Result: ${result}`);
}

if (require.main === module) {
  try {
    runCli();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
};

#!/usr/bin/env node

/**
 * Supported calculator operations:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (*, x)
 * - division (/)
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

const operations = {
  '+': addition,
  add: addition,
  addition,
  '-': subtraction,
  subtract: subtraction,
  subtraction,
  '*': multiplication,
  x: multiplication,
  X: multiplication,
  multiply: multiplication,
  multiplication,
  '/': division,
  divide: division,
  division,
};

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${label}: "${value}"`);
  }

  return parsedValue;
}

function calculate(operation, left, right) {
  const handler = operations[operation];

  if (!handler) {
    throw new Error(
      `Unsupported operation "${operation}". Use addition, subtraction, multiplication, division, or the symbols +, -, *, /.`,
    );
  }

  return handler(left, right);
}

function runCli(args = process.argv.slice(2)) {
  if (args.length !== 3) {
    throw new Error(
      'Usage: node src/calculator.js <operation> <left> <right> or node src/calculator.js <left> <operation> <right>',
    );
  }

  let operation = args[0];
  let leftInput = args[1];
  let rightInput = args[2];

  if (operations[args[1]]) {
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
  calculate,
  runCli,
};

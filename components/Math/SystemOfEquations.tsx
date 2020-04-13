import React from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import Formula from './Formula';
import { Matrix } from '../../src/Utils/math';

interface Props {
  coefficient: Matrix<number>;
  constantTerms: number[];
  block?: boolean;
}

function zipWithVariables(
  coefficient: Matrix<number>,
): Matrix<[number, string]> {
  const variables = ['x', 'y', 'z'];

  return coefficient.map(row =>
    row.map((number: number, index: number) => [number, variables[index]]),
  );
}

function dropZeros(terms: Matrix<[number, string]>): Matrix<[number, string]> {
  return terms.map(row => row.filter(([coefficient]) => coefficient !== 0));
}

function concatTerms(terms: Matrix<[number, string]>): string[] {
  return terms.map(row =>
    row.reduce(
      (accumulator, [coefficient, variable], index) =>
        `${accumulator}${coefficientToEquation(coefficient, index)}${variable}`,
      '',
    ),
  );
}

function coefficientToEquation(coefficient: number, index: number): string {
  return index === 0
    ? skipOne(coefficient, '', '-', coefficient)
    : skipOne(coefficient, '+', '-', numberToEquation(coefficient));
}

function skipOne(
  number: number,
  one: string,
  minusOne: string,
  else_: string | number,
): string {
  if (number === 1) return one;
  if (number === -1) return minusOne;
  if (typeof else_ === 'number') return else_.toString();
  return else_;
}

function numberToEquation(number: number): string {
  return number >= 0 ? `+${number}` : number.toString();
}

const concatWithConstantTerms = (constantTerms: number[]) => (
  leftTerms: string[],
): string[] => {
  return leftTerms.map(
    (row: string, index: number) => `${row}=${constantTerms[index]}`,
  );
};

function concatEquations(equations: string[]): string {
  return equations.join('\\\\');
}

function equationsToSystem(equation: string): string {
  return `\\left\\{\\begin{aligned}${equation}\\end{aligned}\\right.`;
}

function SystemOfEquations({
  coefficient,
  constantTerms,
  block,
}: Props): JSX.Element {
  const formula = pipe(
    coefficient,
    zipWithVariables,
    dropZeros,
    concatTerms,
    concatWithConstantTerms(constantTerms),
    concatEquations,
    equationsToSystem,
  );
  return <Formula block={block}>{formula}</Formula>;
}

export default SystemOfEquations;

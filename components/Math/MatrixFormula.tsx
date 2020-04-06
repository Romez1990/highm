import React from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import Formula from './Formula';
import { Matrix } from '../../src/Utils/math';

interface Props {
  children: Matrix<number | string>;
  block?: boolean;
  name?: string;
  bracket?: Bracket;
  equalsTo?: string;
}

function matrixToFormula(matrix: Matrix<number | string>): string {
  return matrix.map(row => row.join('&')).join('\\\\');
}

const symbols = {
  '(': 'pmatrix',
  '[': 'bmatrix',
  '{': 'Bmatrix',
  '|': 'vmatrix',
  '||': 'Vmatrix',
};

export type Bracket = keyof typeof symbols;

const wrapInBrackets = (bracket: Bracket) => (matrix: string): string => {
  const symbol = symbols[bracket];
  return `\\begin{${symbol}}${matrix}\\end{${symbol}}`;
};

const addName = (name: string | undefined) => (matrix: string): string => {
  if (typeof name === 'undefined') return matrix;
  return `${name} = ${matrix}`;
};

const addRightExpression = (expression: string | undefined) => (
  matrix: string,
): string => {
  if (typeof expression === 'undefined') return matrix;
  return `${matrix} = ${expression}`;
};

function MatrixFormula({
  children: matrix,
  block,
  name,
  bracket = '(',
  equalsTo,
}: Props): JSX.Element {
  const formula = pipe(
    matrix,
    matrixToFormula,
    wrapInBrackets(bracket),
    addName(name),
    addRightExpression(equalsTo),
  );
  return <Formula block={block}>{formula}</Formula>;
}

export default MatrixFormula;

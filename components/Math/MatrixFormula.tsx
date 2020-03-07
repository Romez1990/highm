import React from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import Formula from './Formula';
import { Matrix } from '../../src/Utils/math';

interface Props {
  children: Matrix<number | string>;
  block?: boolean;
  name?: string;
}

function matrixToFormula(matrix: Matrix<number | string>): string {
  return matrix.map(row => row.join('&')).join('\\\\');
}

function wrapInBrackets(matrix: string): string {
  return `\\left(\\begin{matrix}${matrix}\\end{matrix}\\right)`;
}

const addName = (name: string | undefined) => (matrix: string): string => {
  if (typeof name === 'undefined') return matrix;
  return `${name} = ${matrix}`;
};

function MatrixFormula({ children: matrix, block, name }: Props): JSX.Element {
  const formula = pipe(matrix, matrixToFormula, wrapInBrackets, addName(name));
  return <Formula block={block}>{formula}</Formula>;
}

export default MatrixFormula;

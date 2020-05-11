import React, { Fragment, useState, useRef, ChangeEvent } from 'react';
import clsx from 'clsx';
import { FieldProps } from 'formik';
import {
  makeStyles,
  createStyles,
  Theme,
  FormHelperText,
} from '@material-ui/core';
import { NumberField } from '../Fields';
import { Matrix } from '../Utils/math';

export declare type MatrixInputsProps = FieldProps;

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    input: {
      width: 60,
    },
    addInput: {
      opacity: 0.4,
    },
    helperText: {
      margin: spacing(0, 0, 0.5, 1),
    },
  }),
);

function MatrixInputs({
  field: { name },
  form: { getFieldMeta, setFieldValue, setFieldTouched },
}: MatrixInputsProps): JSX.Element {
  const { value: matrixValue, touched } = getFieldMeta<Matrix<number>>(name);

  const [matrix, setMatrix] = useState<Matrix<string>>(() => {
    if (matrixValue.length === 1 && matrixValue[0].length === 0) return [['']];
    return matrixValue.map(row => row.map(number => number.toString()));
  });

  const rowsCount = matrix.length;
  const columnsCount = matrix[0].length;
  const lastRowIndex = rowsCount - 1;
  const lastColumnIndex = columnsCount - 1;

  function updateMatrix(): void {
    setMatrix(matrix.slice());
    const numberMatrix = matrix.map(row =>
      row.map(number => parseFloat(number)),
    );
    setFieldValue(name, numberMatrix);
  }

  function change(
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
  ): void {
    const { value } = e.target;
    const addRight = columnIndex === columnsCount;
    const addBottom = rowIndex === rowsCount;
    const lastRight = columnIndex === lastColumnIndex;
    const lastBottom = rowIndex === lastRowIndex;

    if (addRight || addBottom) {
      addElement(addRight, addBottom, rowIndex, columnIndex, e);
    } else if (lastRight || lastBottom) {
      changeElement(rowIndex, columnIndex, value);
      removeLastElementIfEmpty(lastRight, lastBottom, rowIndex, columnIndex);
    } else {
      changeElement(rowIndex, columnIndex, value);
    }
    updateMatrix();
  }

  function changeElement(
    rowIndex: number,
    columnIndex: number,
    value: string,
  ): void {
    matrix[rowIndex][columnIndex] = value;
  }

  function addElement(
    right: boolean,
    bottom: boolean,
    rowIndex: number,
    columnIndex: number,
    e: ChangeEvent<HTMLInputElement>,
  ): void {
    const { value } = e.target;
    if (right && !bottom) {
      addColumn(rowIndex, value);
    } else if (!right && bottom) {
      addRow(columnIndex, value);
    } else {
      addRowAndColumn(rowIndex, columnIndex, value);
    }
    e.target.value = '';
  }

  function removeLastElementIfEmpty(
    right: boolean,
    bottom: boolean,
    rowIndex: number,
    columnIndex: number,
  ): void {
    if (right && !bottom) {
      removeLastColumnIfEmpty(rowIndex);
    } else if (!right && bottom) {
      removeLastRowIfEmpty(columnIndex);
    } else {
      removeLastRowAndLastColumnIfEmpty(rowIndex, columnIndex);
    }
  }

  const lastElements = {
    right: useRef<HTMLInputElement[]>([]),
    bottom: useRef<HTMLInputElement[]>([]),
  };
  const addElements = {
    right: useRef<HTMLInputElement[]>([]),
    bottom: useRef<HTMLInputElement[]>([]),
  };

  function addRow(columnIndex: number, value: string): void {
    const row = new Array(columnsCount).fill('');
    row[columnIndex] = value;
    matrix.push(row);
    updateMatrix();
    // eslint-disable-next-line no-unused-expressions
    lastElements.bottom.current[columnIndex]?.focus();
  }

  function addColumn(rowIndex: number, value: string): void {
    matrix.forEach((row, i) => row.push(i === rowIndex ? value : ''));
    updateMatrix();
    // eslint-disable-next-line no-unused-expressions
    lastElements.right.current[rowIndex]?.focus();
  }

  function addRowAndColumn(
    rowIndex: number,
    columnIndex: number,
    value: string,
  ): void {
    matrix.forEach(row => row.push(''));
    const row = new Array(columnsCount + 1).fill('');
    row[columnsCount] = value;
    matrix.push(row);
    updateMatrix();
    // eslint-disable-next-line no-unused-expressions
    lastElements.bottom.current[columnIndex - 1]?.focus();
    // I don't know why - 1
    // This is a bug but it works
  }

  function removeLastRowIfEmpty(columnIndex: number): boolean {
    const emptyRow = isLastRowEmpty();
    if (emptyRow) {
      removeLastRow(columnIndex);
    }
    return emptyRow;
  }

  function removeLastRow(columnIndex: number): void {
    matrix.pop();
    updateMatrix();
    // eslint-disable-next-line no-unused-expressions
    addElements.bottom.current[columnIndex]?.focus();
  }

  function removeLastColumnIfEmpty(rowIndex: number): boolean {
    const emptyColumn = isLastColumnEmpty();
    if (emptyColumn) {
      removeLastColumn(rowIndex);
    }
    return emptyColumn;
  }

  function removeLastColumn(rowIndex: number): void {
    matrix.forEach(row => row.pop());
    updateMatrix();
    // eslint-disable-next-line no-unused-expressions
    addElements.right.current[rowIndex]?.focus();
  }

  function removeLastRowAndLastColumnIfEmpty(
    rowIndex: number,
    columnIndex: number,
  ): void {
    const emptyColumn = isLastColumnEmpty();
    const emptyRow = isLastRowEmpty();
    const oneRow = rowsCount === 1;
    const oneColumn = columnsCount === 1;
    if (emptyColumn && emptyRow && !oneRow && !oneColumn) {
      matrix.pop();
      matrix.forEach(row => row.pop());
      updateMatrix();
      // eslint-disable-next-line no-unused-expressions
      addElements.bottom.current[columnIndex + 1]?.focus();
      // I don't know why + 1
      // This is a bug but it works
    } else if (emptyColumn && !oneColumn) {
      removeLastColumn(rowIndex);
    } else if (emptyRow && !oneRow) {
      removeLastRow(columnIndex);
    }
  }

  function isLastColumnEmpty(): boolean {
    return matrix.every(row => row[lastColumnIndex] === '');
  }

  function isLastRowEmpty(): boolean {
    const lastRow = matrix[lastRowIndex];
    return lastRow.every(number => number === '');
  }

  const matrixCells: Matrix<string> = [
    ...matrix.map(row => [...row, '']),
    new Array(columnsCount + 1).fill(''),
  ];

  let timer: number | undefined;

  function focus(): void {
    clearTimeout(timer);
  }

  function blur(): void {
    timer = setTimeout(() => {
      setFieldTouched(name, true);
    });
  }

  const error =
    touched && matrix.some(row => row.some(number => number === ''));

  const classes = useStyles();

  return (
    <Fragment>
      {error && (
        <FormHelperText className={classes.helperText} error>
          Вся матрица должна быть заполнена
        </FormHelperText>
      )}
      {matrixCells.map((row, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={rowIndex}>
          {row.map((number, columnIndex) => {
            const edgeElement =
              columnIndex === columnsCount || rowIndex === rowsCount;
            const elementError =
              touched &&
              number === '' &&
              columnIndex !== columnsCount &&
              rowIndex !== rowsCount;
            return (
              <NumberField
                // eslint-disable-next-line react/no-array-index-key
                key={columnIndex}
                className={clsx(classes.input, {
                  [classes.addInput]: edgeElement,
                })}
                variant="outlined"
                size="small"
                inputProps={{
                  style: { textAlign: 'center' },
                }}
                error={elementError}
                onFocus={focus}
                onBlur={blur}
                value={number}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  change(e, rowIndex, columnIndex)
                }
              />
            );
          })}
        </div>
      ))}
    </Fragment>
  );
}

export default MatrixInputs;

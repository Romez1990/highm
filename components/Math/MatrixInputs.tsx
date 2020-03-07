import React, { Fragment, useState, useRef, ChangeEvent } from 'react';
import clsx from 'clsx';
import { FieldProps } from 'formik';
import { makeStyles, createStyles } from '@material-ui/core';
import { NumberField } from '../Fields';
import { Matrix } from '../../src/Utils/math';

export declare type MatrixInputsProps = FieldProps;

const useStyles = makeStyles(
  createStyles({
    input: {
      width: 60,
    },
    addInput: {
      opacity: 0.4,
    },
  }),
);

function MatrixInputs({
  field: { name },
  form: { getFieldMeta, setFieldValue },
}: MatrixInputsProps): JSX.Element {
  const [matrix, setMatrix] = useState<Matrix<string>>(() => {
    const { value } = getFieldMeta<Matrix<number>>(name);
    if (value.length === 1 && value[0].length === 0) return [['']];
    return value.map(row => row.map(number => number.toString()));
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

  function changeNumber(
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
  ): void {
    const { value } = e.target;
    matrix[rowIndex][columnIndex] = value;
    updateMatrix();
  }

  const lastElements = {
    right: useRef<HTMLInputElement[]>([]),
    bottom: useRef<HTMLInputElement[]>([]),
  };
  const addElements = {
    right: useRef<HTMLInputElement[]>([]),
    bottom: useRef<HTMLInputElement[]>([]),
  };

  function addElementOnChange(
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
  ): void {
    const right = columnIndex === columnsCount;
    const bottom = rowIndex === rowsCount;
    if (right && bottom) {
      addRowAndColumn(rowIndex, columnIndex, e.target.value);
    } else if (right) {
      addColumn(rowIndex, e.target.value);
    } else if (bottom) {
      addRow(columnIndex, e.target.value);
    }
    e.target.value = '';
  }

  function addRow(columnIndex: number, value: string): void {
    const row = new Array(matrix[0].length).fill('');
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
    const row = new Array(matrix[0].length).fill('');
    row[matrix[0].length - 1] = value;
    matrix.push(row);
    updateMatrix();
    // eslint-disable-next-line no-unused-expressions
    lastElements.bottom.current[columnIndex - 1]?.focus();
    // I don't know why - 1
    // This is a bug but it works
  }

  function lastElementOnChange(
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
  ): void {
    const right = columnIndex === lastColumnIndex;
    const bottom = rowIndex === lastRowIndex;
    if (right && bottom) {
      removeRowAndColumn(rowIndex, columnIndex, e.target.value);
    } else if (right) {
      removeColumn(rowIndex, e.target.value);
    } else if (bottom) {
      removeRow(columnIndex, e.target.value);
    }
  }

  function removeRow(
    columnIndex: number,
    value: string,
    emptyRow: boolean = isColumnEmpty(columnIndex, value),
  ): void {
    if (emptyRow) {
      matrix.pop();
      updateMatrix();
      // eslint-disable-next-line no-unused-expressions
      addElements.bottom.current[columnIndex]?.focus();
    }
  }

  function removeColumn(
    rowIndex: number,
    value: string,
    emptyColumn: boolean = isColumnEmpty(rowIndex, value),
  ): void {
    if (emptyColumn) {
      matrix.forEach(row => row.pop());
      updateMatrix();
      // eslint-disable-next-line no-unused-expressions
      addElements.right.current[rowIndex]?.focus();
    }
  }

  function removeRowAndColumn(
    rowIndex: number,
    columnIndex: number,
    value: string,
  ): void {
    const emptyColumn = isColumnEmpty(rowIndex, value);
    const emptyRow = isRowEmpty(columnIndex, value);
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
      removeColumn(rowIndex, value, emptyColumn);
    } else if (emptyRow && !oneRow) {
      removeRow(columnIndex, value, emptyRow);
    }
  }

  function isColumnEmpty(rowIndex: number, value: string): boolean {
    return matrix.every((row, i) =>
      i === rowIndex ? value === '' : row[row.length - 1] === '',
    );
  }

  function isRowEmpty(columnIndex: number, value: string): boolean {
    const lastRow = matrix[lastRowIndex];
    return lastRow.every((el, i) =>
      i === columnIndex ? value === '' : el === '',
    );
  }

  const classes = useStyles();

  return (
    <Fragment>
      {matrix.slice(0, lastRowIndex).map((row: string[], rowIndex: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={rowIndex}>
          {row
            .slice(0, lastColumnIndex)
            .map((number: string, columnIndex: number) => (
              <NumberField
                // eslint-disable-next-line react/no-array-index-key
                key={columnIndex}
                className={classes.input}
                variant="outlined"
                size="small"
                inputProps={{
                  style: { textAlign: 'center' },
                }}
                value={number}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  changeNumber(e, rowIndex, columnIndex)
                }
              />
            ))}
          <NumberField
            className={classes.input}
            inputRef={(input: HTMLInputElement): void => {
              lastElements.right.current[rowIndex] = input;
            }}
            variant="outlined"
            size="small"
            inputProps={{
              style: { textAlign: 'center' },
            }}
            value={matrix[rowIndex][lastColumnIndex]}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
              changeNumber(e, rowIndex, lastColumnIndex);
              lastElementOnChange(e, rowIndex, lastColumnIndex);
            }}
          />
          <NumberField
            className={clsx(classes.input, classes.addInput)}
            inputRef={(input: HTMLInputElement): void => {
              addElements.right.current[rowIndex] = input;
            }}
            variant="outlined"
            size="small"
            inputProps={{
              style: { textAlign: 'center' },
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              addElementOnChange(e, rowIndex, columnsCount)
            }
          />
        </div>
      ))}
      <div>
        {matrix[lastRowIndex]
          .slice(0, lastColumnIndex)
          .map((number: string, columnIndex: number) => (
            <NumberField
              // eslint-disable-next-line react/no-array-index-key
              key={columnIndex}
              className={classes.input}
              inputRef={(input: HTMLInputElement): void => {
                lastElements.bottom.current[columnIndex] = input;
              }}
              variant="outlined"
              size="small"
              inputProps={{
                style: { textAlign: 'center' },
              }}
              value={number}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                changeNumber(e, lastRowIndex, columnIndex);
                lastElementOnChange(e, lastRowIndex, columnIndex);
              }}
            />
          ))}
        <NumberField
          className={classes.input}
          inputRef={(input: HTMLInputElement): void => {
            lastElements.bottom.current[lastColumnIndex] = input;
            lastElements.right.current[lastRowIndex] = input;
          }}
          variant="outlined"
          size="small"
          inputProps={{
            style: { textAlign: 'center' },
          }}
          value={matrix[lastRowIndex][lastColumnIndex]}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            changeNumber(e, lastRowIndex, lastColumnIndex);
            lastElementOnChange(e, lastRowIndex, lastColumnIndex);
          }}
        />
        <NumberField
          className={clsx(classes.input, classes.addInput)}
          inputRef={(input: HTMLInputElement): void => {
            addElements.right.current[lastRowIndex] = input;
          }}
          variant="outlined"
          size="small"
          inputProps={{
            style: { textAlign: 'center' },
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            addElementOnChange(e, lastRowIndex, columnsCount)
          }
        />
      </div>
      <div>
        {matrix[lastRowIndex].map((_: string, columnIndex: number) => (
          <NumberField
            // eslint-disable-next-line react/no-array-index-key
            key={columnIndex}
            className={clsx(classes.input, classes.addInput)}
            inputRef={(input: HTMLInputElement): void => {
              addElements.bottom.current[columnIndex] = input;
            }}
            variant="outlined"
            size="small"
            inputProps={{
              style: { textAlign: 'center' },
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              addElementOnChange(e, rowsCount, columnIndex)
            }
          />
        ))}
        <NumberField
          className={clsx(classes.input, classes.addInput)}
          inputRef={(input: HTMLInputElement): void => {
            addElements.right.current[rowsCount] = input;
            addElements.bottom.current[columnsCount] = input;
          }}
          variant="outlined"
          size="small"
          inputProps={{
            style: { textAlign: 'center' },
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            addElementOnChange(e, rowsCount, columnsCount)
          }
        />
      </div>
    </Fragment>
  );
}

export default MatrixInputs;

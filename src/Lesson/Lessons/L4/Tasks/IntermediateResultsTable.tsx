import React, { useState, ChangeEvent, Fragment } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormHelperText,
} from '@material-ui/core';
import { FieldProps } from 'formik';
import Formula from '../../../../Math/Formula';
import { FloatField } from '../../../../Fields';
import { IntermediateResult } from './IntermediateResult';

type Props = FieldProps;

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    helperText: {
      margin: spacing(0, 0, 3, 14),
    },
    table: {
      width: 300,
    },
    x: {
      width: '40%',
    },
    y: {
      width: '60%',
    },
  }),
);

interface Focused {
  i: number;
  field: 'x' | 'y';
}

function IntermediateResultsTable({
  field: { name },
  form: { getFieldMeta, setFieldValue },
}: Props): JSX.Element {
  const { value: initRows, touched } = getFieldMeta<
    IntermediateResult<number>[]
  >(name);

  const [rows, setRows] = useState<IntermediateResult<string>[]>(() =>
    initRows.map(row => ({
      x: row.x.toString(),
      y: row.y.toString(),
    })),
  );

  function updateValue(): void {
    setRows(rows.slice());
    const numberValue = rows.map(
      (row): IntermediateResult<number> => ({
        x: parseFloat(row.x),
        y: parseFloat(row.y),
      }),
    );
    setFieldValue(name, numberValue);
  }

  function change(
    e: ChangeEvent<HTMLInputElement>,
    i: number,
    field: 'x' | 'y',
  ): void {
    const { value } = e.target;
    rows[i] = {
      ...rows[i],
      [field]: value,
    };
    updateValue();
  }

  const [focused, setFocused] = useState<Focused>();

  function cellFocus(i: number, field: 'x' | 'y'): void {
    setFocused({ i, field });
  }

  function cellBlur(): void {
    setFocused(undefined);
  }

  const error = rows.some(row => row.x.length === 0 || row.y.length === 0);

  const classes = useStyles();

  return (
    <Fragment>
      {touched && error && (
        <FormHelperText className={classes.helperText} error>
          All cell must be filled
        </FormHelperText>
      )}
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Formula>i</Formula>
            </TableCell>
            <TableCell className={classes.x}>
              <Formula>{'x_{i}'}</Formula>
            </TableCell>
            <TableCell className={classes.y}>
              <Formula>{'y_{i}'}</Formula>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ x, y }, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={i}>
              <TableCell>{i}</TableCell>
              <TableCell onClick={(): void => cellFocus(i, 'x')}>
                {typeof focused !== 'undefined' &&
                focused.i === i &&
                focused.field === 'x' ? (
                  <FloatField
                    variant="standard"
                    size="small"
                    autoFocus
                    onBlur={cellBlur}
                    value={rows[i].x}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                      change(e, i, 'x')
                    }
                  />
                ) : (
                  x
                )}
              </TableCell>
              <TableCell onClick={(): void => cellFocus(i, 'y')}>
                {typeof focused !== 'undefined' &&
                focused.i === i &&
                focused.field === 'y' ? (
                  <FloatField
                    variant="standard"
                    size="small"
                    autoFocus
                    onBlur={cellBlur}
                    value={rows[i].y}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                      change(e, i, 'y')
                    }
                  />
                ) : (
                  y
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}

export default IntermediateResultsTable;

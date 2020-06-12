import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { pipe } from 'fp-ts/lib/pipeable';
import { of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { Formik, Form, Field, FormikHelpers, FormikErrors } from 'formik';
import { object, string } from 'yup';
import {
  makeStyles,
  createStyles,
  Typography,
  Button,
  Card,
  CardContent,
  FormHelperText,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { map, filter, range, zip, findFirstMap } from 'fp-ts/lib/Array';
import { isNone, none, some } from 'fp-ts/lib/Option';
import { unknown } from 'io-ts';
import { RegexTextField } from '../../FormikMaterialUI';
import { groupNameRegex, groupNameRegexPartial } from '../Group';
import HttpService from '../../HttpService';
import { runWithErrorThrowing } from '../../Utils/fp-ts/task';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

interface Values {
  name: string;
  students: string;
  nonFieldError?: undefined;
}

const validationSchema = object().shape({
  name: string()
    .matches(groupNameRegex, 'Group name does not match rules')
    .required(),
  students: string(),
});

function AddGroupForm(): JSX.Element {
  const nameInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    nameInputRef.current?.focus();
  }, []);

  const initialValues: Values = {
    name: '',
    students: '',
  };

  function validate(values: Values): void | FormikErrors<Values> {
    const errorRowIndexOption = pipe(
      splitRows(values.students),
      rows => zip(rows, range(0, rows.length - 1)),
      filter(([row]) => isRowEmpty(row)),
      findFirstMap(([rowInit, rowIndex]) => {
        const row = trimAll(rowInit);
        if (/\s/.test(row)) return none;
        return some(rowIndex);
      }),
    );
    if (isNone(errorRowIndexOption)) return undefined;
    const errorRowNumber = errorRowIndexOption.value + 1;
    return {
      students: `separate first name and last name with space on row ${errorRowNumber}`,
    };
  }

  const router = useRouter();

  function submit(values: Values): Promise<void> {
    const students = prepareStudents(values.students);
    return pipe(
      HttpService.post('/group/', unknown, {
        name: values.name,
        students,
      }),
      fold(
        err => {
          throw err;
        },
        () => async (): Promise<void> => {
          await router.push('/groups');
        },
      ),
      runWithErrorThrowing,
    );
  }

  function prepareStudents(
    rows: string,
  ): { firstName: string; lastName: string }[] {
    return pipe(
      rows,
      splitRows,
      map(trimAll),
      filter(isRowEmpty),
      map(row => {
        const parts = row.split(' ');
        return {
          lastName: parts[0],
          firstName: parts[1],
        };
      }),
    );
  }

  function splitRows(rows: string): string[] {
    return rows.split('\n');
  }

  function trimAll(row: string): string {
    return row.trim().replace(/\s+/g, ' ');
  }

  function isRowEmpty(row: string): boolean {
    return !/^\s*$/.test(row);
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card raised>
        <CardContent>
          <Typography component="h2" variant="h5" align="center">
            Add group
          </Typography>
          <Formik<Values>
            initialValues={initialValues}
            validationSchema={validationSchema}
            validate={validate}
            onSubmit={submit}
          >
            {({ errors: { nonFieldError }, isSubmitting }): JSX.Element => (
              <Form>
                <Field
                  name="name"
                  component={RegexTextField}
                  regex={groupNameRegexPartial}
                  variant="outlined"
                  label="Name"
                  margin="normal"
                  fullWidth
                />
                <Field
                  name="students"
                  component={TextField}
                  variant="outlined"
                  label="Students"
                  margin="normal"
                  fullWidth
                  multiline
                  rows={5}
                  rowsMax={Infinity}
                />
                {typeof nonFieldError !== 'undefined' && (
                  <FormHelperText error>{nonFieldError}</FormHelperText>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddGroupForm;

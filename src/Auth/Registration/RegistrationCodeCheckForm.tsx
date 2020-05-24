import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { pipe } from 'fp-ts/lib/pipeable';
import { of } from 'fp-ts/lib/Task';
import { rightTask, chain, mapLeft, fold } from 'fp-ts/lib/TaskEither';
import { Formik, Form, Field, FormikHelpers, FormikErrors } from 'formik';
import { object, string } from 'yup';
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Card,
  CardContent,
  FormHelperText,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { map } from 'fp-ts/lib/Array';
import { RegexTextField } from '../../FormikMaterialUI';
import {
  WrongRegistrationCodeError,
  NamesMismatchError,
  RegistrationCodeCheckParams,
} from '../../AuthenticationService';
import { useRegistrationStore } from '../../Store/Registration';
import { getRegistrationURL } from '../../User';
import { foldErrors } from '../../Error';
import { run } from '../../Utils/fp-ts/task';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    submit: {
      margin: spacing(1, 0, 0),
    },
  }),
);

interface Values extends RegistrationCodeCheckParams {
  nonFieldError?: undefined;
}

const codeRegexPartial = /^(?:c|c\d{1,6})?$/;

const validationSchema = object().shape({
  registrationCode: string().length(7).required(),
  firstName: string().required(),
  lastName: string().required(),
});

function RegistrationCodeCheckForm(): JSX.Element {
  const codeInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    codeInputRef.current?.focus();
  }, []);

  const initialValues: Values = {
    registrationCode: '',
    firstName: '',
    lastName: '',
  };

  const registrationStore = useRegistrationStore();

  const router = useRouter();

  function submit(
    values: Values,
    { setErrors }: FormikHelpers<Values>,
  ): Promise<void> {
    return pipe(
      registrationStore.registrationCodeCheck(values),
      chain(() =>
        rightTask(
          async (): Promise<void> => {
            await router.push(getRegistrationURL(values).path, undefined, {
              shallow: true,
            });
          },
        ),
      ),
      mapLeft(errs =>
        pipe(
          errs,
          map(
            (err): FormikErrors<Values> => {
              if (err instanceof WrongRegistrationCodeError) {
                return {
                  registrationCode: 'Wrong registration code.',
                };
              }
              if (err instanceof NamesMismatchError) {
                return {
                  nonFieldError:
                    'Name does not match name from registration code.',
                };
              }
              throw err;
            },
          ),
          foldErrors,
          setErrors,
        ),
      ),
      fold(
        () => of(undefined),
        () => of(undefined),
      ),
      run,
    );
  }

  const classes = useStyles();

  return (
    <Card raised>
      <CardContent>
        <Typography component="h1" variant="h5" align="center">
          Register
        </Typography>
        <Formik<Values>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ errors: { nonFieldError }, isSubmitting }): JSX.Element => (
            <Form>
              <Field
                name="registrationCode"
                component={RegexTextField}
                regex={codeRegexPartial}
                variant="outlined"
                label="Registration code"
                margin="normal"
                fullWidth
                inputRef={codeInputRef}
              />
              <Field
                name="firstName"
                component={TextField}
                variant="outlined"
                label="First name"
                margin="normal"
                fullWidth
              />
              <Field
                name="lastName"
                component={TextField}
                variant="outlined"
                label="Last name"
                margin="normal"
                fullWidth
              />
              {typeof nonFieldError !== 'undefined' && (
                <FormHelperText error>{nonFieldError}</FormHelperText>
              )}
              <Button
                type="submit"
                className={classes.submit}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Next
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default RegistrationCodeCheckForm;

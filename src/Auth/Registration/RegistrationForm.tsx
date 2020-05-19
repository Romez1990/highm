import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { pipe } from 'fp-ts/lib/pipeable';
import { map } from 'fp-ts/lib/Array';
import { of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
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
import { useRegistrationStore, RegisterParams } from '../../Store/Registration';
import {
  EmailTakenError,
  TooCommonPasswordError,
} from '../../AuthenticationService';
import { foldErrors } from '../../Error';
import { redirectTo } from '../../Redirect';

interface Props {
  redirectUrl: string;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    submit: {
      margin: spacing(1, 0, 0),
    },
  }),
);

interface Values extends RegisterParams {
  passwordConfirmation: string;
  nonFieldError?: undefined;
}

const validationSchema = object().shape({
  email: string().email().required(),
  password: string()
    .min(8)
    .matches(/\D/, 'This password is entirely numeric')
    .required(),
});

function RegistrationForm({ redirectUrl }: Props): JSX.Element {
  const registrationCodeInputRef = useRef<HTMLInputElement>();
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    registrationCodeInputRef.current?.focus();
    const timeout = setTimeout(() => router.prefetch(redirectUrl), 4000);
    return (): void => clearTimeout(timeout);
  }, []);

  const registrationStore = useRegistrationStore();

  const initialValues: Values = {
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  function validate({
    password,
    passwordConfirmation,
  }: Values): FormikErrors<Values> | undefined {
    if (password !== passwordConfirmation) {
      return {
        passwordConfirmation: 'Password does not match',
      };
    }
    return undefined;
  }

  function submit(
    values: Values,
    { setErrors }: FormikHelpers<Values>,
  ): Promise<void> {
    const task = pipe(
      registrationStore.register(values),
      fold(
        errs => {
          pipe(
            errs,
            map(
              (err): FormikErrors<Values> => {
                if (err instanceof EmailTakenError) {
                  return {
                    email:
                      'A user is already registered with this email address.',
                  };
                }
                if (err instanceof TooCommonPasswordError) {
                  return {
                    password: 'This password is too common.',
                  };
                }
                throw err;
              },
            ),
            foldErrors,
            setErrors,
          );
          return of(undefined);
        },
        () => (): Promise<void> => redirectTo(redirectUrl),
      ),
    );
    return task();
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
          validate={validate}
          onSubmit={submit}
        >
          {({ errors: { nonFieldError }, isSubmitting }): JSX.Element => (
            <Form>
              <Field
                name="email"
                type="email"
                component={TextField}
                variant="outlined"
                label="Email address"
                margin="normal"
                fullWidth
              />
              <Field
                name="password"
                type="password"
                component={TextField}
                variant="outlined"
                label="Password"
                margin="normal"
                fullWidth
              />
              <Field
                name="passwordConfirmation"
                type="password"
                component={TextField}
                variant="outlined"
                label="Password confirmation"
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
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default RegistrationForm;

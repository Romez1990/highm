import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { pipe } from 'fp-ts/lib/pipeable';
import { of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { Formik, Form, Field, FormikHelpers } from 'formik';
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
import { useProfileStore } from '../../Store';
import { redirectTo } from '../../Redirect';
import {
  WrongCredentialsError,
  EmailNotVerifiedError,
} from '../../AuthenticationService';
import setTimeout from '../../Utils/setTimeout';

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

interface Values {
  email: string;
  password: string;
  nonFieldError?: undefined;
}

const validationSchema = object().shape({
  email: string().email().required(),
  password: string().matches(/^\S*$/, 'Password cannot be blank').required(),
});

function LoginForm({ redirectUrl }: Props): JSX.Element {
  const emailInputRef = useRef<HTMLInputElement>();
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    emailInputRef.current?.focus();
    const timeout = setTimeout(() => router.prefetch(redirectUrl), 4000);
    return (): void => clearTimeout(timeout);
  }, []);

  const initialValues: Values = {
    email: '',
    password: '',
  };

  const profileStore = useProfileStore();

  function submit(
    values: Values,
    { setErrors }: FormikHelpers<Values>,
  ): Promise<void> {
    const task = pipe(
      profileStore.login(values),
      fold(
        err => {
          if (err instanceof WrongCredentialsError) {
            return of(
              setErrors({
                nonFieldError: 'wrong email or password',
              }),
            );
          }
          if (err instanceof EmailNotVerifiedError) {
            return of(
              setErrors({
                nonFieldError: 'email is not verified',
              }),
            );
          }
          throw err;
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
          Sign in
        </Typography>
        <Formik<Values>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ errors: { nonFieldError }, isSubmitting }): JSX.Element => (
            <Form>
              <Field
                name="email"
                component={TextField}
                variant="outlined"
                label="Email address"
                margin="normal"
                fullWidth
                inputRef={emailInputRef}
              />
              <Field
                name="password"
                component={TextField}
                type="password"
                variant="outlined"
                label="Password"
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default LoginForm;

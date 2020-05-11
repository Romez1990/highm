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
import { runWithErrorThrowing } from '../../Utils/fp-ts/task';

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
  email: string().email().required('Это поле является обязательным'),
  password: string()
    .min(8, 'Пароль должен быть хотя бы 8 символов')
    .matches(/^\S*$/, 'Пароль не должен быть пустым')
    .required('Это поле является обязательным'),
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
    return pipe(
      profileStore.login(values),
      fold(
        err => {
          if (err instanceof WrongCredentialsError) {
            return of(
              setErrors({
                nonFieldError: 'Неверный адрес электронной почты или пароль',
              }),
            );
          }
          if (err instanceof EmailNotVerifiedError) {
            return of(
              setErrors({
                nonFieldError: 'Электронная почта не подтверждена',
              }),
            );
          }
          throw err;
        },
        () => (): Promise<void> => redirectTo(redirectUrl),
      ),
      runWithErrorThrowing,
    );
  }

  const classes = useStyles();

  return (
    <Card raised>
      <CardContent>
        <Typography component="h2" variant="h5" align="center">
          Вход
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
                label="Адрес электронной почты"
                margin="normal"
                fullWidth
                inputRef={emailInputRef}
              />
              <Field
                name="password"
                component={TextField}
                type="password"
                variant="outlined"
                label="Пароль"
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
                Войти
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default LoginForm;

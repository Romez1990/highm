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
import { runWithErrorThrowing } from '../../Utils/fp-ts/task';

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
  registrationCode: string()
    .length(7, 'Код должен быть длиной 7 символос')
    .required('Это поле является обязательным'),
  firstName: string().required('Это поле является обязательным'),
  lastName: string().required('Это поле является обязательным'),
});

function RegistrationCodeCheckForm(): JSX.Element {
  const registrationCodeInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    registrationCodeInputRef.current?.focus();
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
                  registrationCode: 'Неверный регистрационный код.',
                };
              }
              if (err instanceof NamesMismatchError) {
                return {
                  nonFieldError:
                    'Имя не совпадает с именем из регистрационного кода.',
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
      runWithErrorThrowing,
    );
  }

  const classes = useStyles();

  return (
    <Card raised>
      <CardContent>
        <Typography component="h2" variant="h5" align="center">
          Регистрация
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
                label="Регистрационный код"
                margin="normal"
                fullWidth
                inputRef={registrationCodeInputRef}
              />
              <Field
                name="firstName"
                component={TextField}
                variant="outlined"
                label="Имя"
                margin="normal"
                fullWidth
              />
              <Field
                name="lastName"
                component={TextField}
                variant="outlined"
                label="Фамилия"
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
                Далее
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default RegistrationCodeCheckForm;

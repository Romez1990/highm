import React, { FormEvent } from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/TaskEither';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';
import AuthenticationService from '../../AuthenticationService';
import { run } from '../../Utils/fp-ts/task';

interface Props {
  verificationKey: string;
}

function EmailVerificationForm({ verificationKey }: Props): JSX.Element {
  const router = useRouter();

  function submit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    return pipe(
      AuthenticationService.verifyEmail(verificationKey),
      fold(
        err => {
          throw err;
        },
        () => async (): Promise<void> => {
          await router.push('/login');
        },
      ),
      run,
    );
  }

  return (
    <form onSubmit={submit}>
      <Button type="submit" variant="contained" color="primary">
        Verify email
      </Button>
    </form>
  );
}

export default EmailVerificationForm;

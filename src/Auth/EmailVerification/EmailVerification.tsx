import React from 'react';
import { Option, isNone } from 'fp-ts/lib/Option';
import EmailVerificationForm from './EmailVerificationForm';

interface Props {
  verificationKey: Option<string>;
}

function EmailVerification({ verificationKey }: Props): JSX.Element {
  return isNone(verificationKey) ? (
    <div>Link is not valid</div>
  ) : (
    <EmailVerificationForm verificationKey={verificationKey.value} />
  );
}

export default EmailVerification;

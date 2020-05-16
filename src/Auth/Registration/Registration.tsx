import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRegistrationStore } from '../../Store/Registration';
import RegistrationCodeCheckForm from './RegistrationCodeCheckForm';
import RegistrationCodeInvalid from './RegistrationCodeInvalid';
import RegisterForm from './RegisterForm';

interface Props {
  redirectUrl: string;
}

function Registration({ redirectUrl }: Props): JSX.Element {
  const { registrationCodeValid } = useRegistrationStore();

  if (typeof registrationCodeValid === 'undefined') {
    return <RegistrationCodeCheckForm />;
  }

  if (!registrationCodeValid) {
    return <RegistrationCodeInvalid />;
  }

  return <RegisterForm redirectUrl={redirectUrl} />;
}

export default observer(Registration);

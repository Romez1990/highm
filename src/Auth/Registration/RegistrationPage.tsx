import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRegistrationStore } from '../../Store/Registration';
import RegistrationCodeCheckForm from './RegistrationCodeCheckForm';
import RegistrationCodeInvalid from './RegistrationCodeInvalid';
import RegistrationForm from './RegistrationForm';

interface Props {
  redirectUrl: string;
}

function RegistrationPage({ redirectUrl }: Props): JSX.Element {
  const { registrationCodeValid } = useRegistrationStore();

  if (typeof registrationCodeValid === 'undefined') {
    return <RegistrationCodeCheckForm />;
  }

  if (!registrationCodeValid) {
    return <RegistrationCodeInvalid />;
  }

  return <RegistrationForm redirectUrl={redirectUrl} />;
}

export default observer(RegistrationPage);

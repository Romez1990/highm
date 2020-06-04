import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRegistrationStore } from '../../Store/Registration';
import RegistrationCodeCheckForm from './RegistrationCodeCheckForm';
import RegistrationCodeInvalid from './RegistrationCodeInvalid';
import RegistrationForm from './RegistrationForm';

function RegistrationPage(): JSX.Element {
  const { registrationCodeValid } = useRegistrationStore();

  if (typeof registrationCodeValid === 'undefined') {
    return <RegistrationCodeCheckForm />;
  }

  if (!registrationCodeValid) {
    return <RegistrationCodeInvalid />;
  }

  return <RegistrationForm />;
}

export default observer(RegistrationPage);

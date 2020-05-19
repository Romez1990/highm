import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import RegistrationCodesTable from './RegistrationCodesTable';
import { UnregisteredUser } from '../User';

interface Props {
  open: boolean;

  close(): void;

  users(): UnregisteredUser[];
}

function RegistrationCodesDialog({ open, close, users }: Props): JSX.Element {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Registration codes</DialogTitle>
      <DialogContent>
        <RegistrationCodesTable users={users} />
      </DialogContent>
    </Dialog>
  );
}

export default RegistrationCodesDialog;

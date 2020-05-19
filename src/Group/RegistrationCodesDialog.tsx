import React, { Fragment, useRef } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Print as PrintIcon } from '@material-ui/icons';
import { useReactToPrint } from 'react-to-print';
import RegistrationCodesTable from './RegistrationCodesTable';
import PrintRegistrationCodes from './PrintRegistrationCodes';
import { UnregisteredUser } from '../User';

interface Props {
  open: boolean;

  close(): void;

  users(): UnregisteredUser[];
}

const useStyles = makeStyles(({ spacing, palette: { grey } }: Theme) =>
  createStyles({
    title: {
      margin: 0,
      padding: spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: spacing(1),
      top: spacing(1),
      color: grey[500],
    },
  }),
);

function RegistrationCodesDialog({ open, close, users }: Props): JSX.Element {
  const printComponent = useRef<PrintRegistrationCodes>(null);

  const print = useReactToPrint({
    content: () => printComponent.current,
  });

  if (print === null) throw new Error('print function is null');

  const classes = useStyles();

  return (
    <Fragment>
      <Dialog open={open} onClose={close}>
        <DialogTitle className={classes.title} disableTypography>
          <Typography variant="h6">Registration codes</Typography>
          <IconButton className={classes.closeButton} onClick={print}>
            <PrintIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <RegistrationCodesTable
            printComponent={printComponent}
            users={users}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default RegistrationCodesDialog;

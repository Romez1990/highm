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
  Tooltip,
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

const useStyles = makeStyles(({ spacing, palette: { type, grey } }: Theme) =>
  createStyles({
    title: {
      display: 'flex',
    },
    titleText: {
      flexGrow: 1,
    },
    titleButton: {
      margin: -spacing(1),
      marginLeft: 0,
      color: type === 'dark' ? grey[400] : grey[600],
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
          <Typography className={classes.titleText} component="h3" variant="h6">
            Registration codes
          </Typography>
          <Tooltip title="Print registration codes">
            <IconButton className={classes.titleButton} onClick={print}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
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

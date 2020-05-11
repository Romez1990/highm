import React, { Fragment, RefObject } from 'react';
import {
  makeStyles,
  createStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PrintRegistrationCodes from './PrintRegistrationCodes';
import { UnregisteredUser } from '../User';

interface Props {
  printComponent: RefObject<PrintRegistrationCodes>;

  users(): UnregisteredUser[];
}

const useStyles = makeStyles(() =>
  createStyles({
    displayNone: {
      display: 'none',
    },
  }),
);

function RegistrationCodesTable({
  printComponent,
  users: getUsers,
}: Props): JSX.Element {
  const users = getUsers();

  const classes = useStyles();

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Регистрационный код</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.registrationCode}>
                <TableCell>{index + 1}.</TableCell>
                <TableCell>
                  {user.lastName} {user.firstName}
                </TableCell>
                <TableCell>{user.registrationCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.displayNone}>
        <PrintRegistrationCodes ref={printComponent} users={users} />
      </div>
    </Fragment>
  );
}

export default RegistrationCodesTable;

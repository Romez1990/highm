import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { UnregisteredUser } from '../User';

interface Props {
  users(): UnregisteredUser[];
}

function RegistrationCodesTable({ users: getUsers }: Props): JSX.Element {
  const users = getUsers();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Registration code</TableCell>
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
  );
}

export default RegistrationCodesTable;

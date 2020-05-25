import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
} from '@material-ui/icons';
import Table, { useEditable } from '../Table';
import {
  TTeacher,
  Teacher,
  UnregisteredTeacher,
  UnregisteredTeacherNew,
} from './Teacher';
import { RegistrationCodesDialog } from '../RegistrationCodes';
import { userCompare } from '../User';

interface Props {
  teachers: Teacher[];
}

function TeachersTable({ teachers }: Props): JSX.Element {
  const [rows, { addRow, updateRow, deleteRow, deleteRows }] = useEditable<
    Teacher,
    UnregisteredTeacherNew
  >({
    initData: teachers,
    type: TTeacher,
    url: '/teacher/',
    getLookupField: (teacher): string =>
      teacher.registered ? teacher.id.toString() : teacher.registrationCode,
  });

  const [registrationCodesOpen, setRegistrationCodesOpen] = useState(false);

  function openRegistrationCodes(): void {
    setRegistrationCodesOpen(true);
  }

  function closeRegistrationCodes(): void {
    setRegistrationCodesOpen(false);
  }

  const unregisteredTeachers = (): UnregisteredTeacher[] =>
    rows
      .filter(teacher => !teacher.registered)
      .sort(userCompare) as UnregisteredTeacher[];

  return (
    <Container maxWidth="md">
      <Table<Teacher>
        title="Teacher"
        columns={[
          { title: 'Last name', field: 'lastName', defaultSort: 'asc' },
          { title: 'First name', field: 'firstName' },
          {
            title: 'Registered',
            field: 'registered',
            type: 'boolean',
            editable: 'never',
          },
        ]}
        data={rows}
        editable={{
          onRowAdd: addRow,
          onRowUpdate: updateRow,
          onRowDelete: deleteRow,
        }}
        options={{
          selection: true,
          paging: false,
        }}
        actions={[
          {
            icon: (): JSX.Element => <DeleteIcon />,
            tooltip: 'Delete',
            position: 'toolbarOnSelect',
            onClick: deleteRows,
          },
          {
            icon: (): JSX.Element => <AssignmentIcon />,
            tooltip: 'Registration codes',
            position: 'toolbar',
            onClick: openRegistrationCodes,
          },
        ]}
      />
      <RegistrationCodesDialog
        open={registrationCodesOpen}
        close={closeRegistrationCodes}
        users={unregisteredTeachers}
      />
    </Container>
  );
}

export default TeachersTable;

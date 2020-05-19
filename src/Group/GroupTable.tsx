import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
} from '@material-ui/icons';
import Table, { useEditable } from '../Table';
import RegistrationCodesDialog from './RegistrationCodesDialog';
import { userCompare } from '../User';
import {
  TStudent,
  Student,
  UnregisteredStudentNew,
  UnregisteredStudentNewWithGroup,
  UnregisteredStudent,
} from '../Student';
import { Group } from './Group';

interface Props {
  group: Group;
}

function GroupTable({ group }: Props): JSX.Element {
  const [
    rows,
    { addRow: addRowInit, updateRow, deleteRow, deleteRows },
  ] = useEditable<Student, UnregisteredStudentNewWithGroup>({
    initData: group.students,
    type: TStudent,
    url: '/student/',
    getLookupField: (student): string =>
      student.registered ? student.id.toString() : student.registrationCode,
  });

  async function addRow(newData: UnregisteredStudentNew): Promise<void> {
    await addRowInit({
      ...newData,
      groupName: group.name,
    });
  }

  const [registrationCodesOpen, setRegistrationCodesOpen] = useState(false);

  function openRegistrationCodes(): void {
    setRegistrationCodesOpen(true);
  }

  function closeRegistrationCodes(): void {
    setRegistrationCodesOpen(false);
  }

  const unregisteredStudents = (): UnregisteredStudent[] =>
    rows
      .filter(student => !student.registered)
      .sort(userCompare) as UnregisteredStudent[];

  return (
    <Container maxWidth="md">
      <Table<Student>
        title={`Group ${group.name}`}
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
          onRowAdd: addRow as (
            newData: Student,
            oldData?: Student,
          ) => Promise<void>,
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
            tooltip: 'Delete students',
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
        users={unregisteredStudents}
      />
    </Container>
  );
}

export default GroupTable;

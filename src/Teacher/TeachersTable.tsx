import React from 'react';
import { Container } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Table, { useEditable } from '../Table';
import { TTeacher, Teacher, UnregisteredTeacherNew } from './Teacher';

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
      teacher.registered ? teacher.id.toString() : teacher.code,
  });

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
            tooltip: 'Delete teachers',
            position: 'toolbarOnSelect',
            onClick: deleteRows,
          },
        ]}
      />
    </Container>
  );
}

export default TeachersTable;

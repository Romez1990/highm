import React, { ChangeEvent, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Table, { useEditable } from '../../Table';
import { RegexTextField } from '../../Fields';
import {
  TGroupBasic,
  GroupBasic,
  groupNameRegexPartial,
  groupCompare,
} from '../Group';

interface Props {
  groups: GroupBasic[];
}

function GroupsTable({ groups }: Props): JSX.Element {
  const [rows, { updateRow, deleteRow, deleteRows }] = useEditable({
    initData: groups,
    type: TGroupBasic,
    url: '/group/',
    getLookupField: ({ name }): string => name,
  });

  function isDeletable(rowData: GroupBasic): boolean {
    return rowData.numberOfStudents === 0;
  }

  const router = useRouter();

  async function goToGroup(_?: MouseEvent, group?: GroupBasic): Promise<void> {
    if (typeof group !== 'undefined') await router.push(`/group/${group.name}`);
  }

  return (
    <Container maxWidth="sm">
      <Table
        title="Groups"
        columns={[
          {
            title: 'Name',
            field: 'name',
            defaultSort: 'asc',
            customSort: groupCompare,
            editComponent: ({
              // eslint-disable-next-line react/prop-types
              columnDef: { title },
              // eslint-disable-next-line react/prop-types
              value,
              // eslint-disable-next-line react/prop-types
              onChange,
            }): JSX.Element => (
              <RegexTextField
                placeholder={title}
                autoFocus
                regex={groupNameRegexPartial}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  onChange(e.target.value)
                }
              />
            ),
          },
          {
            title: 'Number of students',
            field: 'numberOfStudents',
            type: 'numeric',
            editable: 'never',
          },
        ]}
        data={rows}
        editable={{
          isDeletable,
          onRowUpdate: updateRow,
          onRowDelete: deleteRow,
        }}
        options={{
          paging: false,
          selection: true,
        }}
        onRowClick={goToGroup}
        actions={[
          {
            icon: DeleteIcon,
            tooltip: 'Delete',
            position: 'toolbarOnSelect',
            onClick: deleteRows,
          },
        ]}
      />
    </Container>
  );
}

export default GroupsTable;

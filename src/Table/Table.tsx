import React from 'react';
import MaterialTable, { MaterialTableProps } from 'material-table';
import TableIcons from './TableIcons';

export declare type TableProps<RowData extends object> = Omit<
  MaterialTableProps<RowData>,
  'icons'
>;

function Table<RowData extends object>(
  props: TableProps<RowData>,
): JSX.Element {
  return <MaterialTable icons={TableIcons} {...props} />;
}

export default Table;

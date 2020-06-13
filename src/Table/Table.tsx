import React from 'react';
import MaterialTable, { MaterialTableProps } from 'material-table';
import TableIcons from './TableIcons';

export declare type TableProps<RowData extends Record<string, unknown>> = Omit<
  MaterialTableProps<RowData>,
  'icons'
>;

function Table<RowData extends Record<string, unknown>>(
  props: TableProps<RowData>,
): JSX.Element {
  return <MaterialTable icons={TableIcons} {...props} />;
}

export default Table;

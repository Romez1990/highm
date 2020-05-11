import React from 'react';
import MaterialTable, { MaterialTableProps } from 'material-table';
import TableIcons from './TableIcons';

export declare type TableProps<RowData extends object> = Omit<
  MaterialTableProps<RowData>,
  'icons' | 'localization'
>;

function Table<RowData extends object>(
  props: TableProps<RowData>,
): JSX.Element {
  return (
    <MaterialTable
      icons={TableIcons}
      localization={{
        body: {
          emptyDataSourceMessage: 'Нет записей',
          addTooltip: 'Добавить',
          deleteTooltip: 'Удалить',
          editTooltip: 'Редактировать',
          editRow: {
            deleteText: 'Вы действительно хотите удалить эту строку',
            cancelTooltip: 'Отменить',
            saveTooltip: 'Сохранить',
          },
        },
        header: {
          actions: 'Действия',
        },
        toolbar: {
          nRowsSelected: '{0} строк выбрано',
          searchTooltip: 'Поиск',
          searchPlaceholder: 'Поиск',
        },
      }}
      {...props}
    />
  );
}

export default Table;

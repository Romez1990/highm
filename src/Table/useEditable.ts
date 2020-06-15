import { useState } from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import { of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { Type } from 'io-ts';
import HttpService from '../HttpService';
import { run } from '../Utils/fp-ts/task';
import ActionError from './ActionError';

interface Params<RowData extends object> {
  initData: RowData[] | (() => RowData[]);
  type: Type<RowData>;
  url: string;

  getLookupField(data: RowData): string;
}

interface Editable<RowData extends object, RowDataAdd = RowData> {
  addRow(newData: RowDataAdd): Promise<void>;

  updateRow(newData: RowData, oldData?: RowData): Promise<void>;

  deleteRow(oldData: RowData): Promise<void>;

  deleteRows(_: MouseEvent, oldData: RowData | RowData[]): Promise<void>;
}

function useEditable<
  RowData extends object,
  RowDataAdd extends object = RowData
>({
  initData,
  type,
  url,
  getLookupField,
}: Params<RowData>): [RowData[], Editable<RowData, RowDataAdd>] {
  const [rows, setRows] = useState(initData);

  async function addRow(newData: RowDataAdd): Promise<void> {
    try {
      await pipe(
        HttpService.post(url, type, newData),
        fold(
          err => {
            throw err;
          },
          newData_ =>
            of(
              setRows(oldRows => {
                const newRows = [...oldRows];
                newRows.push(newData_);
                return newRows;
              }),
            ),
        ),
        run,
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw e;
    }
  }

  async function updateRow(newData: RowData, oldData?: RowData): Promise<void> {
    if (typeof oldData === 'undefined') return;
    const pk = getLookupField(oldData);
    try {
      await pipe(
        HttpService.patch(`${url}${pk}/`, type, newData),
        fold(
          err => {
            throw err;
          },
          newData_ =>
            of(
              setRows(oldRows => {
                const newRows = [...oldRows];
                const index = newRows.indexOf(oldData);
                newRows[index] = newData_;
                return newRows;
              }),
            ),
        ),
        run,
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw e;
    }
  }

  async function deleteRow(oldData: RowData): Promise<void> {
    if (typeof oldData === 'undefined') return;
    const pk = getLookupField(oldData);
    try {
      await pipe(
        HttpService.delete(`${url}${pk}/`),
        fold(
          err => {
            throw err;
          },
          () =>
            of(
              setRows(oldRows => {
                const newRows = [...oldRows];
                const index = newRows.indexOf(oldData);
                newRows.splice(index, 1);
                return newRows;
              }),
            ),
        ),
        run,
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw e;
    }
  }

  async function deleteRows(
    _: MouseEvent,
    oldData: RowData | RowData[],
  ): Promise<void> {
    if (!Array.isArray(oldData)) throw new ActionError('Wrong action position');
    await Promise.all(oldData.map(data => deleteRow(data)));
  }

  return [
    rows,
    {
      addRow,
      updateRow,
      deleteRow,
      deleteRows,
    },
  ];
}

export default useEditable;

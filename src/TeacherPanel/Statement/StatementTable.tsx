import React, { useState, MouseEvent } from 'react';
import { Container } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { findFirst } from 'fp-ts/lib/Array';
import { isNone } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { Column, DetailPanel } from 'material-table';
import Table from '../../Table';
import StatementDetailPanel from './StatementDetailPanel';
import { Student } from '../../Student';
import { run } from '../../Utils/fp-ts/task';
import { LessonResult, TableLessonResult } from './LessonResult';
import ActionError from '../../Table/ActionError';
import HttpService from '../../HttpService';

interface Props {
  group: string;
  title: string;
  lesson: number;
  students: Student[];
  lessonResult: LessonResult[];
}

interface UnregisteredStudent {
  studentName: string;
  registered: false;
  passed: false;
}

interface StudentDidNotPass {
  studentId: number;
  studentName: string;
  registered: true;
  passed: false;
}

interface StudentPassed extends TableLessonResult {
  studentId: number;
  studentName: string;
  registered: true;
  passed: true;
  resultId: number;
}

type RowData = UnregisteredStudent | StudentDidNotPass | StudentPassed;

function StatementTable({
  group,
  title,
  lesson,
  students,
  lessonResult,
}: Props): JSX.Element {
  const [rows, setRows] = useState(() =>
    students.map(
      (student): RowData => {
        const studentName = `${student.lastName} ${student.firstName}`;
        if (!student.registered) {
          return {
            studentName,
            registered: false,
            passed: false,
          };
        }

        const findStudentResult = findFirst<LessonResult>(
          result => result.studentId === student.id,
        );
        const resultOption = findStudentResult(lessonResult);

        if (isNone(resultOption)) {
          return {
            studentId: student.id,
            studentName,
            registered: true,
            passed: false,
          };
        }

        const result = resultOption.value;

        return {
          studentId: student.id,
          studentName,
          registered: true,
          passed: true,
          resultId: result.id,
          n: result.n,
          grade: result.grade,
          points: `${result.points}/${result.maxPoints}`,
        };
      },
    ),
  );

  function deleteResult(oldData: RowData): Promise<void> {
    if (!oldData.passed) return Promise.resolve();
    return pipe(
      HttpService.delete(
        `/teacher-panel/group/${group}/lesson/${lesson}/result/${oldData.resultId}/`,
      ),
      fold(
        err => {
          throw err;
        },
        () =>
          of(
            setRows(oldRows => {
              const newRows = [...oldRows];
              const index = newRows.indexOf(oldData);
              newRows[index] = {
                studentId: oldData.studentId,
                studentName: oldData.studentName,
                registered: true,
                passed: false,
              } as StudentDidNotPass;
              return newRows;
            }),
          ),
      ),
      run,
    );
  }

  function deleteResults(_: MouseEvent, data: RowData | RowData[]): void {
    if (!Array.isArray(data)) throw new ActionError('...');
    data.forEach(deleteResult);
  }

  const columns: Column<RowData>[] = [
    {
      title: 'Name',
      field: 'studentName',
      defaultSort: 'asc',
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      width: '100%',
    },
    { title: 'Passed', field: 'passed', type: 'boolean' },
    { title: 'Grade', field: 'grade', type: 'numeric' },
  ];

  if (rows.some(row => !row.passed)) {
    columns.splice(1, 0, {
      title: 'Registered',
      field: 'registered',
      type: 'boolean',
    });
  }

  return (
    <Container maxWidth="md">
      <Table<RowData>
        title={title}
        columns={columns}
        data={rows}
        options={{
          selection: true,
          paging: false,
        }}
        actions={[
          {
            icon: (): JSX.Element => <DeleteIcon />,
            tooltip: 'Delete',
            onClick: deleteResults,
          },
        ]}
        onRowClick={(event, rowData, togglePanel): void => {
          if (typeof togglePanel === 'undefined') {
            throw new Error('Toggle panel is undefined');
          }
          if (typeof rowData === 'undefined' || !rowData.passed) return;
          togglePanel();
        }}
        detailPanel={[
          (rowData): DetailPanel<RowData> => ({
            disabled: !rowData.passed,
            render: (): JSX.Element | null => {
              if (!rowData.passed) return null;
              return <StatementDetailPanel lessonResult={rowData} />;
            },
          }),
        ]}
      />
    </Container>
  );
}

export default StatementTable;

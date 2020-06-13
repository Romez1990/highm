import React, { useState, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@material-ui/core';
import { Assignment as AssignmentIcon } from '@material-ui/icons';
import Table from '../../Table';
import { Lesson } from './Lesson';

interface Props {
  title: string;
  group: string;
  lessons: Lesson[];
}

interface TableLesson extends Record<string, unknown> {
  number: number;
  numberStr: string;
  title: string;
}

function LessonsTable({ title, group, lessons }: Props): JSX.Element {
  const [rows] = useState(() =>
    lessons.map(
      (lesson, index): TableLesson => ({
        number: index + 1,
        numberStr: `${index + 1}.`,
        title: lesson.title,
      }),
    ),
  );

  const router = useRouter();

  async function goToStatement(
    _: MouseEvent,
    lesson: TableLesson | TableLesson[],
  ): Promise<void> {
    if (Array.isArray(lesson)) throw new Error('...');
    await router.push(`/teacher-panel/group/${group}/lesson/${lesson.number}`);
  }

  return (
    <Container maxWidth="md">
      <Table<TableLesson>
        title={title}
        columns={[
          { title: '#', field: 'numberStr' },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          { title: 'Title', field: 'title', width: '100%' },
        ]}
        data={rows}
        options={{
          paging: false,
          search: false,
        }}
        actions={[
          {
            tooltip: 'Statement',
            icon: (): JSX.Element => <AssignmentIcon />,
            onClick: goToStatement,
            position: 'row',
          },
        ]}
      />
    </Container>
  );
}

export default LessonsTable;

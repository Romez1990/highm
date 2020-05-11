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

interface TableLesson {
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

  async function goToLessonStatement(
    _: MouseEvent,
    lesson: TableLesson | TableLesson[],
  ): Promise<void> {
    if (Array.isArray(lesson)) throw new Error('...');
    await router.push(`/teacher-panel/group/${group}/lesson/${lesson.number}`);
  }

  async function goToGroupStatement(): Promise<void> {
    await router.push(`/teacher-panel/group/${group}/statement`);
  }

  return (
    <Container maxWidth="md">
      <Table<TableLesson>
        title={title}
        columns={[
          { title: '№', field: 'numberStr' },
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          { title: 'Тема', field: 'title', width: '100%' },
        ]}
        data={rows}
        options={{
          paging: false,
          search: false,
        }}
        actions={[
          {
            tooltip: 'Ведомость',
            icon: AssignmentIcon,
            onClick: goToLessonStatement,
            position: 'row',
          },
          {
            tooltip: 'Ведомость',
            icon: AssignmentIcon,
            onClick: goToGroupStatement,
            position: 'toolbar',
          },
        ]}
      />
    </Container>
  );
}

export default LessonsTable;

import React from 'react';
import { Container } from '@material-ui/core';
import { LessonBase } from './Lesson';
import { LessonPageData } from './LessonPageData';
import LessonHeader from './LessonHeader';
import LessonForm from './LessonForm';

interface Props {
  number: number;
  lesson: LessonBase;
  lessonPageData: LessonPageData;
}

function LessonPage({ number, lesson, lessonPageData }: Props): JSX.Element {
  return (
    <Container maxWidth="md">
      <LessonHeader number={number} lesson={lesson} />
      <LessonForm
        number={number}
        lesson={lesson}
        lessonPageData={lessonPageData}
      />
    </Container>
  );
}

export default LessonPage;

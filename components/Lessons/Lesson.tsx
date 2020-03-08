import React from 'react';
import { Container } from '@material-ui/core';
import { LessonBase } from '../../src/Lesson';
import { LessonPageData } from '../../src/LessonPage/LessonPageData';
import LessonHeader from './LessonHeader';
import LessonForm from './LessonForm';

interface Props {
  number: number;
  lesson: LessonBase;
  lessonPageData: LessonPageData;
}

function Lesson({ number, lesson, lessonPageData }: Props): JSX.Element {
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

export default Lesson;

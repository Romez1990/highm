import React from 'react';
import { ErrorPage } from '../ErrorPage';

function LessonNotFoundPage(): JSX.Element {
  return <ErrorPage statusCode={404} title="Lesson not found" />;
}

export default LessonNotFoundPage;

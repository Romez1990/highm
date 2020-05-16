import React from 'react';
import { ErrorPage } from '../Error';

function LessonNotFoundPage(): JSX.Element {
  return <ErrorPage statusCode={404} title="Lesson not found" />;
}

export default LessonNotFoundPage;

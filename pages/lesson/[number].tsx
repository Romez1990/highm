import React from 'react';
import ErrorPage from '../_error';

function LessonPage(): JSX.Element {
  return <ErrorPage statusCode={404} title="Lesson not found" />;
}

export default LessonPage;

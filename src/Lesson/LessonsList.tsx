import React from 'react';
import { List, ListItem } from '@material-ui/core';
import Link from '../Link';
import { LessonBasic } from './Lesson';

interface Props {
  lessons: LessonBasic[];
}

function LessonsList({ lessons }: Props): JSX.Element {
  return (
    <List component="nav">
      {lessons.map((lesson, index) => {
        const lessonNumber = index + 1;
        return (
          <ListItem
            key={lesson.title}
            button
            color="inherit"
            component={Link}
            href={`/lesson/${lessonNumber}`}
            underline="none"
          >
            {lessonNumber}. {lesson.title}
          </ListItem>
        );
      })}
    </List>
  );
}

export default LessonsList;

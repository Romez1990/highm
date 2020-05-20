import React from 'react';
import {
  Container,
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Link from '../Link';
import { LessonBasic } from './Lesson';

interface Props {
  lessons: LessonBasic[];
}

function LessonsList({ lessons }: Props): JSX.Element {
  return (
    <Container maxWidth="sm">
      <List
        component={Paper}
        subheader={<ListSubheader>Lessons</ListSubheader>}
      >
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
              <ListItemText
                primary={`Lesson ${lessonNumber}`}
                secondary={lesson.title}
              />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export default LessonsList;

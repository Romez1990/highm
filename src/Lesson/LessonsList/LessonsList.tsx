import React from 'react';
import {
  Container,
  Paper,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Link from '../../Link';
import { LessonBasic } from '../Lesson';

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
          const link = !lesson.passed
            ? `/lesson/${lessonNumber}`
            : `/lesson/${lessonNumber}/results`;
          const passedText = lesson.passed ? ' [passed]' : '';
          return (
            <ListItem
              key={lesson.title}
              button
              color="inherit"
              component={Link}
              href={link}
              underline="none"
            >
              <ListItemText
                primary={`Lesson ${lessonNumber}${passedText}`}
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

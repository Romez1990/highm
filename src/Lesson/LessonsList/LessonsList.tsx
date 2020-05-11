import React from 'react';
import {
  Container,
  Card,
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
        component={Card}
        subheader={<ListSubheader>Практические работы</ListSubheader>}
      >
        {lessons.map((lesson, index) => {
          const lessonNumber = index + 1;
          const link = !lesson.passed
            ? `/lesson/${lessonNumber}`
            : `/lesson/${lessonNumber}/result`;
          const passedText = lesson.passed ? ' [сдано]' : '';
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
                primary={`Практическая работа №${lessonNumber}${passedText}`}
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

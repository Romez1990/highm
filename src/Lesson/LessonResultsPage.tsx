import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Card,
  Typography,
} from '@material-ui/core';
import { LessonResults } from './Lesson';

interface Props {
  number: number;
  lessonResults: LessonResults;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    title: {
      marginBottom: spacing(2),
    },
    card: {
      padding: spacing(2),
    },
  }),
);

function LessonResultsPage({ number, lessonResults }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Card className={classes.card}>
        <Typography
          className={classes.title}
          component="h2"
          variant="h6"
          align="center"
        >
          Result of lesson {number}
        </Typography>
        <Typography>Grade: {lessonResults.grade}</Typography>
        {lessonResults.taskResults.map(taskResult => {
          const correct = taskResult.correct ? 'Correct' : 'Wrong';
          return (
            <Typography key={taskResult.taskNumber}>
              Task {taskResult.taskNumber}: {correct}
            </Typography>
          );
        })}
      </Card>
    </Container>
  );
}

export default LessonResultsPage;

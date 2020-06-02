import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Card,
  Button,
  Typography,
} from '@material-ui/core';
import { LessonResult } from '../Lesson';
import Link from '../../Link';

interface Props {
  number: number;
  lessonResult: LessonResult;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    title: {
      marginBottom: spacing(2),
    },
    card: {
      padding: spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    tryAgainButton: {
      alignSelf: 'center',
      marginTop: spacing(1),
    },
  }),
);

function LessonResultPage({ number, lessonResult }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <Typography
          className={classes.title}
          component="h2"
          variant="h6"
          align="center"
        >
          Result of lesson {number}
        </Typography>
        <Typography>Grade: {lessonResult.grade}</Typography>
        <Typography>
          {lessonResult.points}/{lessonResult.maxPoints} points
        </Typography>
        {lessonResult.taskResults.map((taskResult, index) => {
          const taskNumber = index + 1;
          const points = `${taskResult.points}/${taskResult.maxPoints}`;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Typography key={index}>
              Task {taskNumber}: {points} points
            </Typography>
          );
        })}
        {lessonResult.grade === 2 && (
          <Button
            className={classes.tryAgainButton}
            variant="contained"
            color="primary"
            component={Link}
            href={`/lesson/${number}`}
            underline="none"
          >
            Try again
          </Button>
        )}
      </Card>
    </Container>
  );
}

export default LessonResultPage;

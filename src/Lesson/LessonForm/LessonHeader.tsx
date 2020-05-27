import React, { Fragment } from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import { LessonBase } from '../Lesson';

interface Props {
  number: number;
  lesson: LessonBase;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    title: {
      marginBottom: spacing(2),
    },
    goalsTitle: {
      fontSize: '1.3rem',
    },
  }),
);

function LessonHeader({ lesson, number }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography
        className={classes.title}
        component="h2"
        variant="h4"
        align="center"
      >
        Lesson {number}
      </Typography>
      <Typography
        className={classes.title}
        component="h2"
        variant="h4"
        align="center"
      >
        {lesson.title}
      </Typography>
      <Typography component="h3" variant="h3" className={classes.goalsTitle}>
        Lesson goals:
      </Typography>
      <ul>
        {lesson.goals.map((goal, index) => {
          const ending = index !== lesson.goals.length - 1 ? ';' : '.';
          return (
            <li key={goal}>
              <Typography variant="body1">
                {goal}
                {ending}
              </Typography>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

export default LessonHeader;

import React, { Fragment } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Link,
} from '@material-ui/core';
import { LessonBase } from '../Lesson';

interface Props {
  number: number;
  lesson: LessonBase;
}

const useStyles = makeStyles(({ spacing, typography: { pxToRem } }: Theme) =>
  createStyles({
    title: {
      marginBottom: spacing(2),
    },
    goalsTitle: {
      fontSize: pxToRem(24),
    },
    theoryLink: {
      fontSize: pxToRem(16),
    },
  }),
);

function LessonHeader({ lesson, number }: Props): JSX.Element {
  const theoryLink = `/lesson-${number}.pdf`;

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
      <Link
        className={classes.theoryLink}
        href={theoryLink}
        target="_blank"
        underline="none"
      >
        View theoretical information
      </Link>
    </Fragment>
  );
}

export default LessonHeader;

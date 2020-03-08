import React from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import { of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { Formik, Form } from 'formik';
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import HttpService from '../../src/HttpService';
import TextPreprocessor from '../../src/TextPreprocessor';
import { LessonPageData, Values } from '../../src/LessonPage/LessonPageData';
import { TLessonCheckResults, LessonBase } from '../../src/Lesson';

interface Props {
  number: number;
  lesson: LessonBase;
  lessonPageData: LessonPageData;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    tasksTitle: {
      marginBottom: spacing(2),
      fontSize: '1.3rem',
      textAlign: 'center',
    },
    taskTitle: {
      fontSize: '1.15rem',
    },
    task: {
      width: '100%',
    },
    submitButton: {
      display: 'block',
      margin: `${spacing(2)}px auto`,
    },
  }),
);

function LessonForm({
  number,
  lesson,
  lessonPageData: { tasks, answers, validationSchema, initialValues },
}: Props): JSX.Element {
  async function submit(values: Values): Promise<void> {
    const task = pipe(
      HttpService.post(`/lesson/${number}/check/`, TLessonCheckResults, values),
      fold(
        err => {
          throw err;
        },
        result => {
          // eslint-disable-next-line no-console
          console.log(result);
          return of(undefined);
        },
      ),
    );
    await task();
  }

  const classes = useStyles();

  return (
    <Formik<Values>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ isSubmitting }): JSX.Element => (
        <Form>
          <Typography
            component="h3"
            variant="h3"
            className={classes.tasksTitle}
          >
            Tasks:
          </Typography>
          {Object.values(lesson.tasks).map((task, taskIndex) => {
            const taskNumber = taskIndex + 1;
            const Task = tasks[taskIndex];
            const Answer = answers[taskIndex];

            return (
              <ExpansionPanel key={task.text} defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    component="h4"
                    variant="h6"
                    className={classes.taskTitle}
                  >
                    Task {taskNumber}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className={classes.task}>
                    <Typography>
                      <TextPreprocessor>{task.text}</TextPreprocessor>
                    </Typography>
                    <Task>{task}</Task>
                    <Answer name={`answers.answer${taskNumber}`} />
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
          <Button
            type="submit"
            className={classes.submitButton}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LessonForm;

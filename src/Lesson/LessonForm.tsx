import React from 'react';
import { useRouter } from 'next/router';
import { pipe } from 'fp-ts/lib/pipeable';
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
  FormHelperText,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import HttpService from '../HttpService';
import TextPreprocessor from '../TextPreprocessor';
import { run } from '../Utils/fp-ts/task';
import { LessonPageData, Values } from './LessonPageData';
import { TLessonCheckResults, LessonBase } from './Lesson';

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
  // lesson.tasks = Object.fromEntries(Object.entries(lesson.tasks).slice(0, 1));

  const router = useRouter();

  async function submit(values: Values): Promise<void> {
    return pipe(
      HttpService.post(`/lesson/${number}/check/`, TLessonCheckResults, values),
      fold(
        err => {
          throw err;
        },
        () => async (): Promise<void> => {
          await router.replace(`${router.pathname}/results`);
        },
      ),
      run,
    );
  }

  const classes = useStyles();

  return (
    <Formik<Values>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ errors, isSubmitting }): JSX.Element => (
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
          {Object.entries(errors).length !== 0 && (
            <FormHelperText error>All answers must be filled</FormHelperText>
          )}
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

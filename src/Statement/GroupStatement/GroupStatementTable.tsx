import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { pipe } from 'fp-ts/lib/pipeable';
import { findFirst, range, mapWithIndex } from 'fp-ts/lib/Array';
import { isNone } from 'fp-ts/lib/Option';
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { Print as PrintIcon, Remove as RemoveIcon } from '@material-ui/icons';
import Link from '../../Link';
import PrintGroupStatementTable from './PrintGroupStatementTable';
import { userCompare } from '../../User';
import { GroupStatement, GroupStatementRegisteredStudent } from '../Statement';

interface Props {
  title: string;
  statement: GroupStatement;
  group: string;
}

const useStyles = makeStyles(({ spacing, palette: { type, grey } }: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      padding: spacing(2, 3),
    },
    titleText: {
      flexGrow: 1,
    },
    titleButton: {
      margin: -spacing(1),
      marginLeft: 0,
      color: type === 'dark' ? grey[400] : grey[600],
    },
    displayNone: {
      display: 'none',
    },
  }),
);

function GroupStatementTable({
  title,
  statement: statementInit,
  group,
}: Props): JSX.Element {
  const statement = pipe(
    statementInit,
    students => students.sort(userCompare),
    mapWithIndex((studentIndex, student) => ({
      ...student,
      number: studentIndex + 1,
    })),
  );

  const numberOfLessons = getNumberOfLessons(statement);

  function getNumberOfLessons(statement_: GroupStatement): number {
    const firstRegisteredStudentOption = pipe(
      statement_,
      findFirst(student => student.registered),
    );
    if (isNone(firstRegisteredStudentOption)) return 0;
    const firstRegisteredStudent = firstRegisteredStudentOption.value as GroupStatementRegisteredStudent;
    return firstRegisteredStudent.grades.length;
  }

  const printComponent = useRef<PrintGroupStatementTable>(null);

  const print = useReactToPrint({
    content: () => printComponent.current,
  });

  if (print === null) throw new Error('print function is null');

  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Card>
        <div className={classes.toolbar}>
          <Typography className={classes.titleText} component="h2" variant="h6">
            {title}
          </Typography>
          <Tooltip title="Распечатать ведомость">
            <IconButton className={classes.titleButton} onClick={print}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 1 }}>№</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell colSpan={numberOfLessons} align="center">
                Практические работы
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
              {range(1, numberOfLessons).map(number => (
                <TableCell key={number} align="center">
                  <Link href={`/teacher-panel/group/${group}/lesson/${number}`}>
                    пр. {number}
                  </Link>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {statement.map(student => {
              const key = student.registered
                ? student.id
                : student.registrationCode;

              return (
                <TableRow key={key}>
                  <TableCell>{student.number}.</TableCell>
                  <TableCell>
                    {student.lastName} {student.firstName}
                  </TableCell>
                  {student.registered
                    ? student.grades.map((grade, gradeIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <TableCell key={gradeIndex} align="center">
                          {grade === null ? <RemoveIcon /> : grade}
                        </TableCell>
                      ))
                    : range(1, numberOfLessons).map(number => (
                        <TableCell key={number} align="center">
                          <RemoveIcon />
                        </TableCell>
                      ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
      <div className={classes.displayNone}>
        <PrintGroupStatementTable
          ref={printComponent}
          numberOfLessons={numberOfLessons}
          statement={statement}
        />
      </div>
    </Container>
  );
}

export default GroupStatementTable;

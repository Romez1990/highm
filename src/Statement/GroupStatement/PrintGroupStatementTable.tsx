import React, { PureComponent } from 'react';
import { range } from 'fp-ts/lib/Array';
import { GroupStatement } from '../Statement';

interface Props {
  numberOfLessons: number;
  statement: GroupStatement;
}

class PrintGroupStatementTable extends PureComponent<Props> {
  public render(): JSX.Element {
    const { numberOfLessons, statement } = this.props;

    return (
      <div>
        <table className="statement-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th colSpan={numberOfLessons} align="center">
                Lessons
              </th>
            </tr>
            <tr>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th />
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th />
              {range(1, numberOfLessons).map(number => (
                <th key={number} align="center">
                  {number}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {statement.map((student, studentIndex) => {
              const key = student.registered
                ? student.id
                : student.registrationCode;

              const studentNumber = studentIndex + 1;

              return (
                <tr key={key}>
                  <td>{studentNumber}.</td>
                  <td>
                    {student.firstName} {student.lastName}
                  </td>
                  {student.registered
                    ? student.grades.map((grade, gradeIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <td key={gradeIndex} align="center">
                          {grade === null ? '-' : grade}
                        </td>
                      ))
                    : range(1, numberOfLessons).map(number => (
                        <td key={number} align="center">
                          -
                        </td>
                      ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <style>{`
          .statement-table {
            width: 100%;
            border-collapse: collapse;
            font: 18px 'Roboto', 'Helvetica', 'Arial', sans-serif;
          }
          
          .statement-table th:nth-child(1) {
            width: 1px;
          }
          
          .statement-table th, .statement-table td {
            padding: 3px 6px;
            border: 1px solid black;
          }
          
          .statement-table th {
            font-size: 18px;
          }
        `}</style>
      </div>
    );
  }
}

export default PrintGroupStatementTable;

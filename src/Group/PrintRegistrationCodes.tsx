import React, { PureComponent } from 'react';
import { UnregisteredUser } from '../User';

interface Props {
  users: UnregisteredUser[];
}

class PrintRegistrationCodes extends PureComponent<Props> {
  public render(): JSX.Element {
    const { users } = this.props;

    return (
      <div>
        <table className="users-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Registration code</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.registrationCode}>
                <td>{index + 1}.</td>
                <td>
                  {user.lastName} {user.firstName}
                </td>
                <td>{user.registrationCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <style>{`
          .users-table {
            width: 100%;
            border-collapse: collapse;
            font: 18px 'Roboto', 'Helvetica', 'Arial', sans-serif;
          }
          
          .users-table th:nth-child(1) {
            width: 1px;
          }
          
          .users-table th:nth-child(2) {
            width: 60%;
          }
      
          .users-table th, .users-table td {
            padding: 4px 8px;
            border: 1px solid black;
          }
          
          .users-table th {
            text-align: left;
            font-size: 20px;
          }
        `}</style>
      </div>
    );
  }
}

export default PrintRegistrationCodes;

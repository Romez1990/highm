import React from 'react';
import { Permission } from '../../AuthenticationService';
import { MainLayout } from '../../Layout';
import AddGroupForm from './AddGroupForm';

AddGroup.permission = 'IsTeacher' as Permission;

function AddGroup(): JSX.Element {
  return (
    <MainLayout title="Add group">
      <AddGroupForm />
    </MainLayout>
  );
}

export default AddGroup;

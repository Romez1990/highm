import { NextPageContext } from 'next';
import store from '../store';
import { redirectTo } from '../src/Redirect';
import { Permission } from '../src/AuthenticationService';

LogoutPage.permission = 'IsAuthenticated' as Permission;

LogoutPage.getInitialProps = async ({
  req,
  res,
}: NextPageContext): Promise<void> => {
  await Promise.all([
    store.profileStore.logout(req, res)(),
    redirectTo('/', res),
  ]);
};

function LogoutPage(): null {
  return null;
}

export default LogoutPage;

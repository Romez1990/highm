import { NextPageContext } from 'next';
import store from '../../Store';
import { redirectTo } from '../../Redirect';
import { Permission } from '../../AuthenticationService';

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

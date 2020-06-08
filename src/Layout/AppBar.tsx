import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { isSome } from 'fp-ts/lib/Option';
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import ProfileMenu from './ProfileMenu';
import ThemeChanger from './ThemeChanger';
import VersionForVisuallyImpaired from './VersionForVisuallyImpaired';
import Link from '../Link';
import { useProfileStore } from '../Store';
import { resolveLoginPath } from '../Redirect';

interface Props {
  drawerOpen: boolean;

  toggleDrawerOpen(): void;
}

const useStyles = makeStyles(
  ({ spacing, typography: { pxToRem }, zIndex }: Theme) =>
    createStyles({
      appBar: {
        zIndex: zIndex.drawer + 1,
      },
      title: {
        marginLeft: spacing(2),
        flexGrow: 1,
        fontSize: pxToRem(24),
      },
    }),
);

function AppBar({ drawerOpen, toggleDrawerOpen }: Props): JSX.Element {
  const { profile } = useProfileStore();

  const router = useRouter();

  const loginPath = resolveLoginPath(router.asPath);

  const theme = useTheme();

  const lightTheme = theme.palette.type === 'light';

  const classes = useStyles();

  return (
    <MuiAppBar
      position="fixed"
      className={classes.appBar}
      color={lightTheme ? 'primary' : 'inherit'}
    >
      <Toolbar>
        <Tooltip title={drawerOpen ? 'Скрыть меню' : 'Показать меню'}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawerOpen}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Typography component="h1" variant="h6" className={classes.title}>
          HighM
        </Typography>
        {isSome(profile) ? (
          <ProfileMenu profile={profile.value} />
        ) : (
          <Fragment>
            <Button
              href="/register"
              component={Link}
              color="inherit"
              underline="none"
            >
              Зарегистрироваться
            </Button>
            <Button
              href={loginPath}
              component={Link}
              color="inherit"
              underline="none"
            >
              Войти
            </Button>
          </Fragment>
        )}
        <ThemeChanger />
        <VersionForVisuallyImpaired />
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;

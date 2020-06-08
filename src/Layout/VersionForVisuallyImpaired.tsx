import React, { Fragment } from 'react';
import Head from 'next/head';
import { Tooltip, IconButton } from '@material-ui/core';
import { VisibilityRounded as VisibilityRoundedIcon } from '@material-ui/icons';

function VersionForVisuallyImpaired(): JSX.Element {
  return (
    <Fragment>
      <Head>
        <script src="https://lidrekon.ru/slep/js/jquery.js" />
        <script src="https://lidrekon.ru/slep/js/uhpv-full.min.js" />
      </Head>
      <Tooltip title="Версия для слабовидящих">
        <IconButton id="specialButton" color="inherit">
          <VisibilityRoundedIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
}

export default VersionForVisuallyImpaired;

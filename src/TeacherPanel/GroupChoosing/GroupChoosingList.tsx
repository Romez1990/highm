import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Card,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { GroupBasic } from '../../Group';
import Link from '../../Link';

interface Props {
  groups: GroupBasic[];
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    title: {
      marginBottom: spacing(2),
    },
    card: {
      padding: spacing(2),
    },
  }),
);

function GroupChoosingList({ groups }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <Typography
          className={classes.title}
          component="h2"
          variant="h6"
          align="center"
        >
          Choose a group you want to work with
        </Typography>
        <List>
          {groups.map(group => {
            const link = `group/${group.name}/lessons`;
            return (
              <ListItem
                key={group.name}
                component={Link}
                href={link}
                color="inherit"
                underline="none"
                button
              >
                <ListItemText>
                  {group.name} ({group.numberOfStudents} members)
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </Container>
  );
}

export default GroupChoosingList;

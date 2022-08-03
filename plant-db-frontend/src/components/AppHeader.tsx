import React from 'react';
import { createStyles, Header, Group, Burger, Text, Box, Drawer, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlant } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    borderBottom: 0,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        0.1
      ),
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}))

export function AppHeader() {
  const plantApiInfo = React.useContext(AppContext)?.plantApiInfo
  const [opened, { toggle }] = useDisclosure(false)
  const { classes } = useStyles();

  return (
    <Header sx={{ maxWidth: "100vw" }} height={56} className={classes.header} mb={1}>
      <Box sx={{ marginLeft: 10, marginRight: 10 }} className={classes.inner}>
        <Box sx={{ display: "flex" }}>
          <IconPlant color="white" size={30} />
          <Text weight="bolder" ml={2} color="white" sx={{ alignSelf: "center" }}>DB</Text>
        </Box>

        <Group spacing={5} className={classes.links}>
          <Link style={{textDecoration: "none"}} to="/">
            <NavLink
              className={classes.link}
              sx={{color: "white"}}
              label={"home"}
            />
          </Link>

          {
            plantApiInfo?.map(pi => <Link key={pi.path} style={{textDecoration: "none"}} to={"/" + pi.path}>
              <NavLink
                className={classes.link}
                sx={{color: "white"}}
                label={pi.pluralDisplayName.toLowerCase()}
              />
            </Link>)
          }
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          color="#fff"
        />

    <Drawer
        opened={opened}
        onClose={toggle}
        title="Plant DB"
        padding="xl"
        size="sm"
      >
        <Link onClick={toggle} style={{textDecoration: "none"}} to="/">
          <NavLink
            label={"home"}
          />
        </Link>

        {
          plantApiInfo?.map(pi => <Link key={pi.path} onClick={toggle} style={{textDecoration: "none"}} to={"/" + pi.path}>
            <NavLink
              label={pi.pluralDisplayName.toLowerCase()}
            />
          </Link>)
        }
      </Drawer>
      </Box>
    </Header>
  );
}
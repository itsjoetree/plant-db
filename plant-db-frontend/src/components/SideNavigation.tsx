import { useState } from 'react'
import { Navbar, Tooltip, UnstyledButton, createStyles, Stack } from '@mantine/core'
import {
  TablerIcon,
  IconTrash,
  IconEdit,
  IconFileInfo,
  IconArrowBack,
} from '@tabler/icons'
import { useParams } from 'react-router'
import { DbItemParams } from './DbItem'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mantine/hooks'

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        0.15
      ),
    },
  },
}));

interface NavbarLinkProps {
  href: string,
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ href, icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Link to={href}>
      <Tooltip label={label} position="right" transitionDuration={0}>
        <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
          <Icon stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    </Link>
  );
}

export function SideNavigation() {
  const isSmallerScreen = useMediaQuery('(max-width: 600px)');
  const params = useParams<DbItemParams>()

  const [active, setActive] = useState<string | null>(params?.action ?? null);

  const navLinks = [
    { icon: IconFileInfo, label: 'Info', href: `/${params.controller}/${params.id}` },
    { icon: IconEdit, label: 'Edit', href: `/${params.controller}/${params.id}/edit` },
    { icon: IconTrash, label: 'Delete', href: `/${params.controller}/${params.id}/delete` },
    { icon: IconArrowBack, label: 'Back', href: `/${params.controller}` },
  ];

  const links = navLinks.map((link) => (
    <NavbarLink
      {...link}
      href={link.href}
      key={link.label}
      active={active == null ? link.label === "Info" : link.label === params.action}
      onClick={() => {
        setActive(link.label)
      }}
    />
  ));

  return (
    <Navbar
      height="100vh"
      width={{ base: isSmallerScreen ? 50 : 80 }}
      p={!isSmallerScreen ? "md" : "10"}
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
      })}
    >
      <Navbar.Section grow mt={10}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
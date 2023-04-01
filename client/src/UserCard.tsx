import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  rem,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  },

  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}));

interface CommentHtmlProps {
  postedAt: string | null;
  body: string | null;
  author: {
    name: string | null;
    image: string | null;
  } | null;
  startLocation: string | null;
  endLocation: string | null;
  startTime: string | null;
}

export function UserCard({
  postedAt,
  body,
  author,
  startLocation,
  endLocation,
}: CommentHtmlProps) {
  const { classes } = useStyles();
  console.log({ postedAt, body, author });
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar
          src={author?.image}
          alt={author?.name || 'Annonymous User'}
          radius="xl"
        />
        <div>
          <Text fz="sm">{author?.name}</Text>
          <Text fz="xs" c="dimmed">
            {startLocation} to {endLocation}
          </Text>
          <Text fz="xs" c="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content}>
          <Text>{body}</Text>
        </div>
      </TypographyStylesProvider>
    </Paper>
  );
}

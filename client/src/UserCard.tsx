import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  rem,
  Rating,
} from '@mantine/core';
import { faker } from '@faker-js/faker';
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

const fakeNames = [
  'John Doe',
  'Jane Doe',
  'Bob Smith',
  'Alice Johnson',
  'Emily Davis',
  'David Wilson',
  'Karen Lee',
  'Michael Brown',
  'Samantha Taylor',
  'Robert Baker',
];

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
          <Rating
            value={Math.floor(Math.random() * 6)}
            fractions={2}
            readOnly
          />
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content}>
          <Text>{faker.lorem.sentences(2)}</Text>
        </div>
      </TypographyStylesProvider>
    </Paper>
  );
}

import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  rem,
  Container,
} from '@mantine/core';
import { useState } from 'react';

interface IJourneyFormProps {
  onSubmit: (journey: IJourney) => void;
}

interface IJourney {
  id: number;
  created_at: string;
  start_time: string;
  start_location: string;
  end_location: string;
  poster_id: string;
  end_time: string;
  message: string;
}

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.breakpoints.sm;

  return {
    wrapper: {
      display: 'flex',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: rem(4),
      border: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: rem(-12),
    },

    fieldInput: {
      flex: 1,

      '& + &': {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: 'flex',

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },

    contacts: {
      boxSizing: 'border-box',
      position: 'relative',
      borderRadius: theme.radius.lg,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `${rem(1)} solid transparent`,
      padding: theme.spacing.xl,
      flex: `0 0 ${rem(280)}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

export function AddJourney({ onSubmit }: IJourneyFormProps) {
  //   const { classes } = useStyles();
  const [journey, setJourney] = useState<IJourney>({
    id: 0,
    created_at: '',
    start_time: '',
    start_location: '',
    end_location: '',
    poster_id: '',
    end_time: '',
    message: '',
  });

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;

    setJourney((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <Container size="sm">
      <form onSubmit={() => {}}>
        <label htmlFor="created_at">Created At:</label>
        <input
          type="text"
          name="created_at"
          onChange={handleInputChange}
          value={journey.created_at}
        />

        <label htmlFor="start_time">Start Time:</label>
        <input
          type="text"
          name="start_time"
          onChange={handleInputChange}
          value={journey.start_time}
        />

        <label htmlFor="start_location">Start Location:</label>
        <input
          type="text"
          name="start_location"
          onChange={handleInputChange}
          value={journey.start_location}
        />

        <label htmlFor="end_location">End Location:</label>
        <input
          type="text"
          name="end_location"
          onChange={handleInputChange}
          value={journey.end_location}
        />

        <label htmlFor="poster_id">Poster ID:</label>
        <input
          type="text"
          name="poster_id"
          onChange={handleInputChange}
          value={journey.poster_id}
        />

        <label htmlFor="end_time">End Time:</label>
        <input
          type="text"
          name="end_time"
          onChange={handleInputChange}
          value={journey.end_time}
        />

        <label htmlFor="message">Message:</label>
        <textarea
          name="message"
          onChange={handleInputChange}
          value={journey.message}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default AddJourney;

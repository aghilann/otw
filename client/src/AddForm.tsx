import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
} from '@mantine/core';
import { UserContext } from './App';
import { useContext } from 'react';

type FormValues = {
  posterName: string;
  startTime: Date;
  startLocation: string;
  endLocation: string;
  message: string;
};

export function AddForm(props: PaperProps) {
  const { user, supabase } = useContext(UserContext);
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm<FormValues>({
    initialValues: {
      posterName: '',
      startTime: new Date(),
      startLocation: '',
      endLocation: '',
      message: '',
    },

    validate: {
      posterName: (val) => (val ? null : 'Name is required'),
      startTime: (val) =>
        val instanceof Date ? null : 'Start time is required',
      startLocation: (val) => (val ? null : 'Start location is required'),
      endLocation: (val) => (val ? null : 'End location is required'),
      message: (val) => (val ? null : 'Message is required'),
    },
  });

  const onSubmit = async () => {
    const { posterName, startTime, startLocation, endLocation, message } =
      form.values;

    const { data, error } = await supabase.from('Journeys').insert([
      {
        poster_name: posterName,
        start_time: startTime,
        start_location: startLocation,
        end_location: endLocation,
        message: message,
        poster_id: user?.id,
      },
    ]);

    if (error) {
      console.log('error', error);
    } else {
      console.log('data', data);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Add your ride details
      </Text>

      <Divider label="Enter ride details" labelPosition="center" my="lg" />

      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            required
            label="Name"
            placeholder="Your name"
            value={form.values.posterName}
            onChange={(event) =>
              form.setFieldValue('posterName', event.currentTarget.value)
            }
            error={form.errors.posterName && 'Name is required'}
            radius="md"
          />

          <TextInput
            type="datetime-local"
            required
            label="Start Time"
            value={form.values.startTime.toISOString().slice(0, -8)}
            onChange={(event) =>
              form.setFieldValue(
                'startTime',
                new Date(event.currentTarget.value)
              )
            }
            error={form.errors.startTime && 'Start time is required'}
            radius="md"
          />

          <TextInput
            required
            label="Start Location"
            placeholder="Starting address"
            value={form.values.startLocation}
            onChange={(event) =>
              form.setFieldValue('startLocation', event.currentTarget.value)
            }
            error={form.errors.startLocation && 'Start location is required'}
            radius="md"
          />

          <TextInput
            required
            label="End Location"
            placeholder="Ending address"
            value={form.values.endLocation}
            onChange={(event) =>
              form.setFieldValue('endLocation', event.currentTarget.value)
            }
            error={form.errors.endLocation && 'End location is required'}
            radius="md"
          />

          <TextInput
            label="Message"
            placeholder="Additional details"
            value={form.values.message}
            onChange={(event) =>
              form.setFieldValue('message', event.currentTarget.value)
            }
            error={form.errors.message && 'Message is required'}
            radius="md"
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Button type="submit" radius="xl">
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

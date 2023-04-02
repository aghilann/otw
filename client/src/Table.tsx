import { useContext, useEffect, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Container,
  Button,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons-react';
import { UserCard } from './UserCard';
import { UserContext } from './App';

const rowData = {
  postedAt: '10 minutes ago',
  body: '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
  author: {
    name: 'Jacob Warnhalter',
    image:
      'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
  },
};

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

interface RowData {
  name: string;
  email: string;
  company: string;
}

interface IJourneyRow {
  id: Number;
  created_at: String;
  start_time: String | null;
  start_location: String | null;
  end_location: String | null;
  poster_id: String | null;
  message: String | null;
}

interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function TableSort({ data }: TableSortProps) {
  const { user, supabase } = useContext(UserContext);
  const [apiData, setApiData] = useState<any>([]);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const { data } = await supabase.from('Journeys').select('*');
        setApiData(data as any);
      } catch (error) {
        throw error;
      }
    };
    fetchJourneys();
  }, []);

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = apiData.map((row: any) => {
    return (
      <UserCard
        startTime={row.start_time?.substring(0, row.start_time?.indexOf('T'))}
        startLocation={row.start_location}
        endLocation={row.end_location}
        postedAt={row.posted_at ?? row.created_at}
        body={row.message}
        author={{
          name: row.poster_name,
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxjGUN0-LllHGLY0p478HO7l2ffCLWdKyvseK2IvWF&s',
        }}
        key={Math.random()}
      />
    );
  });

  return (
    <Container fluid>
      <ScrollArea>
        {/* <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        /> */}
        <Group position="left">
          <Button
            radius="md"
            variant="outline"
            onClick={() => {
              const newData = [...apiData].sort((a: any, b: any) => {
                return a.start_time.localeCompare(b.start_time);
              });
              setApiData(newData);
            }}
          >
            My Posts
          </Button>
          <Button
            radius="md"
            variant="outline"
            onClick={() => {
              setApiData((data: any) =>
                data.filter((item: any) => item.poster_id === (user as any).id)
              );
            }}
          >
            My Journeys
          </Button>
        </Group>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          sx={{ tableLayout: 'fixed' }}
        >
          <thead>
            <tr>
              {/* <Th
              sorted={sortBy === 'email'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('email')}
            >
              Email
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              Company
            </Th> */}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}

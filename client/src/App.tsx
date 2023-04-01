import { useState, useEffect, createContext } from 'react';
import { supabase } from './client';
import { HeroImageRight } from './SignIn';
import { Table } from '@mantine/core';
import { TableSort } from './Table';

function App() {
  const [user, setUser] = useState<any>({ user: null, supabase });
  useEffect(() => {
    /* when the app loads, check to see if the user is signed in */
    checkUser();
    /* check user on OAuth redirect */
    window.addEventListener('hashchange', function () {
      checkUser();
    });
  }, []);

  async function checkUser() {
    /* if a user is signed in, update local state */
    const user = (await supabase.auth.getSession()).data?.session?.user;
    if (user) {
      setUser(user);
    }
  }

  async function signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  }
  async function signOut() {
    /* sign the user out */
    await supabase.auth.signOut();
    setUser(null);
  }

  const data = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      company: 'Acme Inc',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      company: 'Globex Corp',
    },
    {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      company: 'Initech LLC',
    },
  ];

  if (user) {
    const UserContext = createContext({ user, supabase });
    return (
      <div className="App">
        <UserContext.Provider value={{ user, supabase }}>
          <h1>Hello, {user.email}</h1>
          <button onClick={signOut}>Sign out</button>
          <TableSort data={data} />
        </UserContext.Provider>
      </div>
    );
  }
  return (
    <div className="App">
      <HeroImageRight
        style={{ margin: 0 }}
        signInWithGitHub={signInWithGitHub}
      />
    </div>
  );
}

export default App;

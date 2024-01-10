import type { FormEventHandler } from 'react';
import { useState } from 'react';
import useAccessContext from '../hooks/useAccessContext';
import AuthService from '../services/AuthService';

export default function () {
  const { setAccessToken, setUser, setIsAuthenticated } = useAccessContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>Sign in</h2>

      <form
        onSubmit={
          (async (event) => {
            event.preventDefault();

            const authResult = await AuthService.signIn(username, password);

            if (authResult === null) {
              setUsername('');
              setPassword('');
            } else {
              const { accessToken, user } = authResult;
              setUser(user);
              setAccessToken(accessToken);
              setIsAuthenticated(true);
            }
          }) as FormEventHandler<HTMLFormElement>
        }
      >
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label id="password" htmlFor="username">
            Username
          </label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>

        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label id="password" htmlFor="password">
            Password
          </label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

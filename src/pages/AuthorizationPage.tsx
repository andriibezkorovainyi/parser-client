import type { FormEventHandler } from 'react';
import { useState } from 'react';
import useAccessContext from '../hooks/useAccessContext';
import AuthService from '../services/AuthService';

export default function () {
  const { setAccessToken, setUser, setIsAuthenticated } = useAccessContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="auth-container">
      <h2 className="title is-2">Authorization</h2>

      <form
        style={{
          alignItems: 'start',
          alignSelf: 'end',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          margin: 'auto',
          padding: '20px',
        }}
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
          <label
            id="username"
            htmlFor="username"
            className="title is-5"
            style={{
              marginRight: 5,
            }}
          >
            Username
          </label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>

        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            id="password"
            htmlFor="password"
            className="title is-5"
            style={{
              marginRight: 10,
            }}
          >
            Password
          </label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>

        <button style={{ alignSelf: 'center' }} type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

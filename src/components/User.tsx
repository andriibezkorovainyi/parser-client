import useAccessContext from '../hooks/useAccessContext';

export default function User() {
  const { user } = useAccessContext();

  return (
    <div className="user is-flex" style={{ gap: '2px' }}>
      <h5 style={{ height: '100%' }} className="title is-5 is-inline">
        Hello,{' '}
      </h5>
      <h4 className="title is-4 is-inline">{user?.username}</h4>
    </div>
  );
}

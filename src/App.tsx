import './App.scss';
import MainLayout from './layouts/MainLayout';
import AuthorizationLayout from './layouts/AuthorizationLayout';
import useAccessContext from './hooks/useAccessContext';

function App() {
  const { isAuthenticated } = useAccessContext();

  return <div>{isAuthenticated ? <MainLayout /> : <AuthorizationLayout />}</div>;
}

export default App;

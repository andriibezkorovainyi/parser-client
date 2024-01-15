import './App.scss';
import HomePage from './pages/HomePage';
import AuthorizationPage from './pages/AuthorizationPage';
import useAccessContext from './hooks/useAccessContext';

function App() {
  const { isAuthenticated } = useAccessContext();

  return <div>{isAuthenticated ? <HomePage /> : <AuthorizationPage />}</div>;
}

export default App;

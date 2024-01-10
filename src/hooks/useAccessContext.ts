import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.tsx';

const useAccessContext = () => {
  const accessContext = useContext(AuthContext);

  if (accessContext === undefined) {
    throw new Error('useAccessContext must be used within a AccessProvider');
  }

  return accessContext;
};

export default useAccessContext;

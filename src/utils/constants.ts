export const ENVIRONMENT: 'dev' | 'prod' = 'prod';

// @ts-ignore
export const HOST = ENVIRONMENT === 'dev' ? 'http://localhost' : 'http://91.186.197.108';
export const PORT = 3000;

export const ModalStyle = {
  backgroundColor: '#242424',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  height: '70%',
  left: '50%',
  overflow: 'scroll',
  padding: '20px',
  position: 'fixed',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
};

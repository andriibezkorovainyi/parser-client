import { NetworkType } from './enums.ts';

export const ENVIRONMENT = import.meta.env.VITE_ENV || 'dev';

export const CONTRACTS_PER_PAGE = 25;

// @ts-ignore
export const HOST = ENVIRONMENT === 'dev' ? 'http://localhost' : import.meta.env.VITE_API_HOST;
export const PORT = import.meta.env.VITE_API_PORT;

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
  zIndex: 1000,
};

export const chainsToNativeSymbols = {
  [NetworkType.ETH]: 'ETH',
  [NetworkType.ARBITRUM]: 'ETH',
  [NetworkType.OPTIMISM]: 'ETH',
  [NetworkType.BSC]: 'BNB',
  [NetworkType.POLYGON]: 'MATIC',
  [NetworkType.BASE]: 'ETH',
  [NetworkType.AVALANCHE]: 'AVAX',
};

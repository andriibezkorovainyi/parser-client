import type { FC } from 'react';
import { Notes } from '@components/Notes.tsx';
import { Tokens } from '@components/Tokens.tsx';
import { CopyToClipboard } from '@components/CopyToClipboard.tsx';
import type { Contract } from '../utils/classes';
import { parseNativeBalance, parseTokenBalanceUSD, truncateAddress } from '../utils/helpers';

interface Props {
  contract: Contract;
}

export const ContractInfo: FC<Props> = ({ contract: { id, name, address, balance, tokenBalanceUSD, isVerified, notes, network } }) => {
  return (
    <tr>
      <td>
        <span>{isVerified ? '✅' : '❌'}</span>
      </td>

      <td>{network.name}</td>

      <td>{name || 'Unknown'}</td>

      <td>
        <CopyToClipboard value={address} displayValue={truncateAddress(address)} />
      </td>

      <td>{parseNativeBalance(balance)}</td>
      <td>{parseTokenBalanceUSD(tokenBalanceUSD)}</td>

      <td>
        <Tokens contractId={id} />
      </td>

      <td>
        <Notes contractId={id} notes={notes} />
      </td>
    </tr>
  );
};

import type { FC } from 'react';
import { useState } from 'react';
import { ButtonClose } from '@components/ButtonClose.tsx';
import { CopyToClipboard } from '@components/CopyToClipboard.tsx';
import GatewayService from '../services/GatewayService';
import type { IToken } from '../utils/interfaces';
import { parseNativeBalance, parseTokenBalanceUSD, truncateAddress } from '../utils/helpers';
import { ModalStyle } from '../utils/constants.ts';

interface Props {
  contractId: number;
}

export const Tokens: FC<Props> = ({ contractId }) => {
  const [tokens, setTokens] = useState<IToken[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getTokens() {
    if (tokens === null) {
      GatewayService.getTokens(contractId)
        .then((res) => {
          console.log(res);
          setTokens(res || []);
        })
        .catch(console.error);
    }

    setIsModalOpen(true);
  }

  return (
    <div>
      {isModalOpen ? (
        <div style={ModalStyle as {}}>
          <ButtonClose callback={() => setIsModalOpen(false)} />

          <ul>
            {tokens && tokens.length > 0
              ? tokens?.map((token) => (
                  <li key={token.id}>
                    <div className="is-flex is-flex-direction-row">
                      <h5 className="column">{token.name || 'Unknown'}</h5>

                      <div className="column">
                        <CopyToClipboard value={token.address} displayValue={truncateAddress(token.address)} />
                      </div>

                      <p className="column">
                        ({parseNativeBalance(token.balance)} ~ {parseTokenBalanceUSD(token.balanceUSD)})
                      </p>
                    </div>
                  </li>
                ))
              : 'No tokens found'}
          </ul>
        </div>
      ) : (
        <a onClick={getTokens}>Tokens</a>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';
import type { IContract } from '../types/interfaces';
import { NetworkType, OperandType } from '../types/enums';

export default function () {
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [network, setNetwork] = useState<NetworkType>(NetworkType.ETH);
  const [page, setPage] = useState<number>(1);
  const [balance, setBalance] = useState<number>(0);
  const [tokenBalanceUSD, setTokenBalanceUSD] = useState<number>(0);
  const [balanceOperand, setBalanceOperand] = useState<OperandType>(OperandType.MORE);
  const [tokenBalanceOperand, setTokenBalanceOperand] = useState<OperandType>(OperandType.MORE);
  const [isVerifiedOnly, setIsVerifiedOnly] = useState<boolean>(false);
  const [orderByBalance, setOrderByBalance] = useState<boolean>(false);

  useEffect(() => {
    // TODO применить фильтры из query параметров
  }, []);

  return (
    <div>
      <h2>Home</h2>

      <div className="filters-container">
        <h3>Filters</h3>

        <div>
          <h4>Network</h4>
          <select value={network} onChange={(e) => setNetwork(e.target.value as NetworkType)}>
            <option value={NetworkType.ETH}>ETH</option>
            <option value={NetworkType.MATIC}>MATIC</option>
          </select>
        </div>

        <div>
          <h4>Native Balance</h4>
          <select value={balanceOperand} onChange={(e) => setBalanceOperand(e.target.value as OperandType)}>
            <option value={OperandType.MORE}>More than</option>
            <option value={OperandType.LESS}>Less then</option>
          </select>
          <input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
        </div>

        <div>
          <h4>Token Balance in USD</h4>
          <select value={tokenBalanceOperand} onChange={(e) => setTokenBalanceOperand(e.target.value as OperandType)}>
            <option value={OperandType.MORE}>More than</option>
            <option value={OperandType.LESS}>Less then</option>
          </select>
          <input type="number" value={tokenBalanceUSD} onChange={(e) => setTokenBalanceUSD(Number(e.target.value))} />
        </div>

        <div>
          <input type="checkbox" checked={isVerifiedOnly} onChange={(e) => setIsVerifiedOnly(e.target.checked)} />
          <label>Verified Only</label>
        </div>

        <div>
          <input type="checkbox" checked={orderByBalance} onChange={(e) => setOrderByBalance(e.target.checked)} />
          <label>Order by Balance</label>
        </div>
      </div>

      <div className="filters-action">
        <button
          type="button"
          onClick={() => {
            // TODO считать все фильтры и сделать запрос
          }}
        >
          Filter
        </button>

        <button
          type="button"
          onClick={() => {
            // TODO сбросить все фильтры и сделать запрос
          }}
        >
          Reset
        </button>
      </div>

      <div>TODO пагинация</div>

      <div>TODO таблица компонентов контрактов</div>

      <div>TODO пагинация</div>

      <div>TODO кнопка скачать архив</div>
    </div>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { ContractTable } from '@components/ContractsTable.tsx';
import { Pagination } from '@components/Pagination.tsx';
import { DownloadArchive } from '@components/DownloadArchive.tsx';
import User from '@components/User.tsx';
import SearchBar from '@components/SearchBar.tsx';
import PointerHeight from '@components/PointerHeight.tsx';
import type { IGetContractsQuery, ISearchContractsQuery } from '../utils/interfaces';
import { NetworkType, OperandType, OrderByType } from '../utils/enums';
import GatewayService from '../services/ContractService.ts';
import type { ContractType } from '../utils/classes.ts';
import ContractService from '../services/ContractService.ts';
import { chainsToNativeSymbols } from '../utils/constants.ts';

function checkNumberFromInput(value: string) {
  const parsed = parseFloat(value);

  return isNaN(parsed) ? '' : parsed;
}

export default function () {
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const [network, setNetwork] = useState<NetworkType>(NetworkType.ETH);
  const [orderBy, setOrderBy] = useState<OrderByType>(OrderByType.NONE);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [balance, setBalance] = useState<number | ''>('');
  const [tokenBalanceUSD, setTokenBalanceUSD] = useState<number | ''>('');
  const [balanceOperand, setBalanceOperand] = useState<OperandType>(OperandType.MORE);
  const [tokenBalanceUSDOperand, setTokenBalanceUSDOperand] = useState<OperandType>(OperandType.MORE);
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [tokenUSDAmount, setTokenUSDAmount] = useState<number | ''>('');
  const [tokenUSDAmountOperand, setTokenUSDAmountOperand] = useState<OperandType>(OperandType.MORE);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [searchedContracts, setSearchedContracts] = useState<ContractType[]>([]);
  // const [search, setSearch] = useState<string>('');

  const contractsToShow = searchedContracts.length > 0 ? searchedContracts : contracts;

  const onSearch = useCallback(
    (query: ISearchContractsQuery) => {
      if (query.address === '') {
        setSearchedContracts([]);
        return;
      }

      setIsLoading(true);

      ContractService.searchContracts({ ...query, network })
        .then((c) => {
          if (c.length === 0) {
            c[0] = 'No contracts found';
          }
          setSearchedContracts(c);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    },
    [searchedContracts, network]
  );

  function parseQuery(): IGetContractsQuery {
    return {
      balance: Number(balance),
      balanceOperand,
      network,
      orderBy,
      page,
      tokenAddress,
      tokenBalanceUSD: Number(tokenBalanceUSD),
      tokenBalanceUSDOperand,
      tokenUSDAmount: Number(tokenUSDAmount),
      tokenUSDAmountOperand,
      verifiedOnly,
    };
  }

  function getContractsByFilters() {
    const query = parseQuery();

    setIsLoading(true);

    GatewayService.getContracts(query)
      .then(({ contracts: _c, totalPages: _tP }) => {
        setContracts(_c);
        setTotalPages(_tP);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  async function clearFilters() {
    return new Promise((resolve) => {
      setNetwork(NetworkType.ETH);
      setOrderBy(OrderByType.NONE);
      setPage(1);
      setBalance(0);
      setTokenBalanceUSD(0);
      setBalanceOperand(OperandType.MORE);
      setTokenBalanceUSDOperand(OperandType.MORE);
      setTokenAddress('');
      setTokenUSDAmount(0);
      setTokenUSDAmountOperand(OperandType.MORE);
      setVerifiedOnly(false);

      resolve('OK');
    });
  }

  function changePage(_page: number) {
    setPage(_page);
  }

  useEffect(() => {
    getContractsByFilters();
    // }
  }, [page]);

  return (
    <div className="container">
      <div style={{ alignItems: 'baseline' }} className="block is-flex is-justify-content-space-between">
        <h2 style={{ marginBottom: 0 }} className="title is-2">
          Home
        </h2>
        <User />
      </div>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row">
          <div className="column">
            <div className="box table-container">
              <h4>Network</h4>
              <select value={network} onChange={(e) => setNetwork(e.target.value as NetworkType)}>
                {Object.values(NetworkType).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="column">
            <div className="box table-container is-flex is-flex-direction-column">
              <h4>Native Balance</h4>
              <select value={balanceOperand} onChange={(e) => setBalanceOperand(e.target.value as OperandType)}>
                <option value={OperandType.MORE}>More then</option>
                <option value={OperandType.LESS}>Less then</option>
              </select>
              <input
                // style={{ outline: 'none' }}
                placeholder={chainsToNativeSymbols[network]}
                type="number"
                value={balance}
                onChange={(e) => setBalance(checkNumberFromInput(e.target.value))}
              />
            </div>
          </div>

          <div className="column">
            <div className="box table-container is-flex is-flex-direction-column">
              <h4>Token Balance in USD</h4>
              <select value={tokenBalanceUSDOperand} onChange={(e) => setTokenBalanceUSDOperand(e.target.value as OperandType)}>
                <option value={OperandType.MORE}>More then</option>
                <option value={OperandType.LESS}>Less then</option>
              </select>
              <input
                placeholder="$"
                type="number"
                value={tokenBalanceUSD}
                onChange={(e) => setTokenBalanceUSD(checkNumberFromInput(e.target.value))}
              />
            </div>
          </div>

          <div className="column">
            <div style={{ gap: '2px' }} className="box table-container is-flex is-flex-direction-column">
              <h4>Balance By Token in USD</h4>
              <input placeholder="Address" type="text" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
              <select value={tokenUSDAmountOperand} onChange={(e) => setTokenUSDAmountOperand(e.target.value as OperandType)}>
                <option value={OperandType.MORE}>More then</option>
                <option value={OperandType.LESS}>Less then</option>
              </select>
              <input
                placeholder="$"
                type="number"
                value={tokenUSDAmount}
                onChange={(e) => setTokenUSDAmount(checkNumberFromInput(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div>
          <span>Order By</span>
          <select value={orderBy} onChange={(e) => setOrderBy(e.target.value as OrderByType)}>
            <option value={OrderByType.NONE}>None</option>
            <option value={OrderByType.BALANCE}>Balance</option>
            <option value={OrderByType.TOKEN_BALANCE_USD}>Token Balance USD</option>
          </select>
        </div>

        <div className="mt-3">
          <input
            style={{
              marginRight: 3,
            }}
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
          />
          <label>Verified Only</label>
        </div>
      </div>

      <div className="filters-actions">
        <button type="button" onClick={getContractsByFilters}>
          Filter
        </button>

        <button
          type="button"
          onClick={async () => {
            await clearFilters();
            getContractsByFilters();
          }}
        >
          Reset
        </button>
      </div>

      <SearchBar onSearch={onSearch} />

      <div>
        <ContractTable isLoading={isLoading} contracts={contractsToShow} />
      </div>

      <div>
        <Pagination page={page} totalPages={totalPages} changePage={changePage} />
      </div>

      <div>
        <DownloadArchive query={parseQuery()} />
      </div>

      <PointerHeight />
    </div>
  );
}

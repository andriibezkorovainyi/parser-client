import { useState } from 'react';
import { ContractTable } from '@components/ContractsTable.tsx';
import { Pagination } from '@components/Pagination.tsx';
import User from '@components/User.tsx';
import SearchBar from '@components/SearchBar.tsx';
import PointerHeight from '@components/PointerHeight.tsx';
import type { IGetContractsQuery } from '../utils/interfaces';
import { NetworkType, OperandType, OrderByType } from '../utils/enums';
import GatewayService from '../services/ContractService';
import { chainsToNativeSymbols, CONTRACTS_PER_PAGE, HOST, PORT } from '../utils/constants';
import type { Contract } from '../utils/classes';

export function checkNumberFromInput(value: string) {
  const parsed = parseFloat(value);

  return isNaN(parsed) ? '' : parsed;
}

export default function () {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [contractsTotalCount, setContractsTotalCount] = useState<number>(0);
  const [network, setNetwork] = useState<NetworkType>(NetworkType.ETH);
  const [orderBy, setOrderBy] = useState<OrderByType>(OrderByType.NONE);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // const [searchedContractsPage, setSearchedContractsPage] = useState<number>(1);
  // const [searchedContractsTotalPages, setSearchedContractsTotalPages] = useState<number>(1);
  const [balance, setBalance] = useState<number | ''>('');
  const [tokenBalanceUSD, setTokenBalanceUSD] = useState<number | ''>('');
  const [balanceOperand, setBalanceOperand] = useState<OperandType>(OperandType.MORE);
  const [tokenBalanceUSDOperand, setTokenBalanceUSDOperand] = useState<OperandType>(OperandType.MORE);
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [tokenUSDAmount, setTokenUSDAmount] = useState<number | ''>('');
  const [tokenUSDAmountOperand, setTokenUSDAmountOperand] = useState<OperandType>(OperandType.MORE);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prevQueryStr, setPrevQueryStr] = useState<string>('');
  const [fromBlock, setFromBlock] = useState<number | ''>('');
  const [toBlock, setToBlock] = useState<number | ''>('');

  // const [searchedContracts, setSearchedContracts] = useState<Contract[] | 'No contracts found'>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  // const contractsToShow = searchedContracts.length > 0 ? searchedContracts : contracts;

  // const onSearch
  // const onSearch = useCallback(
  //   (query: ISearchContractsQuery) => {
  //     if (query.address === '') {
  //       setSearchedContracts([]);
  //       setSearchValue('');
  //       return;
  //     }
  //
  //     setIsLoading(true);
  //
  //     ContractService.searchContracts(query)
  //       .then((data) => {
  //         setSearchedContracts(data.contracts.length > 0 ? data.contracts : 'No contracts found');
  //         setSearchValue(query.address);
  //         setSearchedContractsTotalPages(data.totalPages);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setSearchValue('');
  //       })
  //       .finally(() => setIsLoading(false));
  //   },
  //   [searchedContracts]
  // );

  function parseQuery(): IGetContractsQuery {
    return {
      balance: Number(balance),
      balanceOperand,
      fromBlock: Number(fromBlock) || undefined,
      network,
      orderBy,
      page,
      search: searchValue,
      toBlock: Number(toBlock) || undefined,
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
    const queryStr = JSON.stringify({ ...query, page: null });

    if (queryStr !== prevQueryStr) {
      query.page = 1;
      setPage(1);
      setPrevQueryStr(queryStr);
    }

    setIsLoading(true);

    GatewayService.getContracts(query)
      .then(({ contracts: _c, totalCount }) => {
        setContracts(_c);
        setContractsTotalCount(totalCount);
        setTotalPages(Math.ceil(totalCount / CONTRACTS_PER_PAGE));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function clearFilters() {
    // return new Promise((resolve) => {
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
    setSearchValue('');

    // resolve('OK');
    // });
  }

  function changePage(_page: number) {
    setPage(_page);
    getContractsByFilters();
  }

  // function changeSearchPage(_page: number) {
  //   setSearchedContractsPage(_page);
  // }

  // useEffect(() => {
  //   onSearch({ address: searchValue, page: searchedContractsPage });
  // }, [searchedContractsPage]);

  // useEffect(() => {
  //   getContractsByFilters();
  //   // }
  // }, [page]);

  const downloadArchive = async () => {
    const baseUrl = `${HOST}:${PORT}/api/contract/downloadArchive`;
    const query = parseQuery();

    const queryString = Object.entries(query)
      .reduce((acc, [key, value]) => {
        if (value === '' || value === undefined) {
          return acc;
        }

        return [...acc, `${key}=${value}`];
      }, [] as string[])
      .join('&');

    const url = `${baseUrl}?${queryString}`;

    window.open(url, '_blank');
  };

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

        <SearchBar onSearch={setSearchValue} searchValue={searchValue} />

        <div className="main-actions-container">
          <div className="child-actions-container">
            <div style={{ maxWidth: 'max-content' }}>
              <input
                // style={{
                //   marginRight: 3,
                // }}
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
              />
              <label style={{ marginLeft: '5px' }}>Verified Only</label>
            </div>

            <div style={{ maxWidth: 'max-content' }}>
              <span>Order By</span>
              <select value={orderBy} onChange={(e) => setOrderBy(e.target.value as OrderByType)}>
                <option value={OrderByType.NONE}>None</option>
                <option value={OrderByType.BALANCE}>Balance</option>
                <option value={OrderByType.TOKEN_BALANCE_USD}>Token Balance USD</option>
              </select>
            </div>
          </div>

          <div className="child-actions-container">
            <div style={{ maxWidth: 'max-content' }}>
              From
              <input
                style={{ marginLeft: '10px' }}
                placeholder="block number"
                type="number"
                value={fromBlock}
                onChange={(e) => setFromBlock(checkNumberFromInput(e.target.value))}
              />
            </div>

            <div style={{ maxWidth: 'max-content' }}>
              To
              <input
                style={{ marginLeft: '30px' }}
                placeholder="block number"
                type="number"
                value={toBlock}
                onChange={(e) => setToBlock(checkNumberFromInput(e.target.value))}
              />
            </div>
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

          <button
            type="button"
            onClick={async () => {
              downloadArchive();
            }}
          >
            Download by Filters
          </button>
        </div>
      </div>

      <div>
        <h2 style={{ fontWeight: 'bold', marginBottom: '5px', marginLeft: '5px', textAlign: 'start' }}>
          {' '}
          Total count: {contractsTotalCount}{' '}
        </h2>

        <ContractTable isLoading={isLoading} contracts={contracts} />
      </div>

      {/* {searchValue !== '' ? ( */}
      {/*  <Pagination page={searchedContractsPage} totalPages={searchedContractsTotalPages} changePage={changeSearchPage} /> */}
      {/* ) : ( */}
      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
      {/* )} */}
      {/* <div> */}
      {/*  <DownloadArchive query={parseQuery()} /> */}
      {/* </div> */}

      <PointerHeight />
    </div>
  );
}

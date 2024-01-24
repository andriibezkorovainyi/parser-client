import type { FC } from 'react';
import { ContractInfo } from '@components/ContractInfo.tsx';
import { Loader } from '@components/Loader';
import { Contract } from '../utils/classes';

const columns = new Contract().getColumns();

interface Props {
  contracts: Contract[] | null | 'No contracts found';
  isLoading: boolean;
}

export const ContractTable: FC<Props> = ({ isLoading, contracts }) => {
  return (
    <div className="contract-table">
      <table className="table is-striped is-hoverable is-narrow is-fullwidth">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>
                <span className="is-flex is-flex-wrap-nowrap">{col}</span>
              </th>
            ))}
          </tr>
        </thead>
        {!isLoading ? (
          contracts === 'No contracts found' ? (
            <tbody>
              <tr>
                <td colSpan={columns.length}>
                  <p
                    className="has-text-centered"
                    style={{
                      marginTop: '1rem',
                    }}
                  >
                    {contracts[0]}
                  </p>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {contracts?.map((contract) => (
                <ContractInfo key={contract.address} contract={contract} />
              ))}
            </tbody>
          )
        ) : null}
      </table>
      {isLoading ? <Loader /> : null}
    </div>
  );
};

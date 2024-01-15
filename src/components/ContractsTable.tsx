import type { FC } from 'react';
import { ContractInfo } from '@components/ContractInfo.tsx';
import { Contract } from '../utils/classes';

const columns = new Contract().getColumns();

interface Props {
  contracts: Contract[];
}

export const ContractTable: FC<Props> = ({ contracts }) => {
  return (
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

      <tbody>
        {contracts?.map((contract) => {
          return <ContractInfo contract={contract} key={contract.id} />;
        })}
      </tbody>
    </table>
  );
};

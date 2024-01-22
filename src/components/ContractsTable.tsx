import type { FC } from 'react';
import { ContractInfo } from '@components/ContractInfo.tsx';
import { Loader } from '@components/Loader';
import { Contract } from '../utils/classes';

const columns = new Contract().getColumns();

interface Props {
  contracts: Contract[] | null;
  isLoading: boolean;
}

export const ContractTable: FC<Props> = ({ isLoading, contracts }) => {
  return (
    <div className="contract-table">
      {isLoading ? (
        <Loader />
      ) : (
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
          {/* <tbody> */}
          {/*  {contracts === null ? ( */}
          {/*    <Loader /> */}
          {/*  ) : ( */}
          {/*    contracts.map((contract) => { */}
          {/*      return <ContractInfo contract={contract} key={contract.id} />; */}
          {/*    }) */}
          {/*  )} */}
          {/* </tbody> */}
        </table>
      )}
    </div>
  );
};

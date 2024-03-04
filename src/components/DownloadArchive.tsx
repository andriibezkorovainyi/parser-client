import type { FC } from 'react';
import { useState } from 'react';
import type { IGetContractsQuery } from '../utils/interfaces';
import { HOST, PORT } from '../utils/constants.ts';
import { checkNumberFromInput } from '../pages/HomePage.tsx';

interface Props {
  query: IGetContractsQuery;
}

export const DownloadArchive: FC<Props> = ({ query }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromBlock, setFromBlock] = useState<number | ''>('');
  const [toBlock, setToBlock] = useState<number | ''>('');

  async function downloadArchive() {
    const baseUrl = `${HOST}:${PORT}/api/contract/downloadArchive`;
    const _query = { ...query, fromBlock, toBlock };

    const queryString = Object.entries(_query)
      .map(([key, value]) => {
        if (value === '') {
          return '';
        }

        return `${key}=${value}`;
      })
      .join('&');

    const url = `${baseUrl}?${queryString}`;

    // Открываем новую вкладку с URL, который инициирует загрузку
    window.open(url, '_blank');

    // setIsModalOpen(true);

    // GatewayService.downloadArchive(query)
    //   .then(() => {
    //     setIsModalOpen(false);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setIsModalOpen(false);
    //   });
  }

  return (
    <div
      style={{
        alignItems: 'end',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* {isModalOpen && ( */}
      {/*  <div */}
      {/*    style={{ */}
      {/*      backgroundColor: '#242424', */}
      {/*      borderRadius: '10px', */}
      {/*      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', */}
      {/*      color: 'rgb(255 255 255 / 87%)', */}
      {/*      left: '50%', */}
      {/*      padding: '20px', */}
      {/*      position: 'fixed', */}
      {/*      top: '10%', */}
      {/*      transform: 'translate(-50%, -50%)', */}
      {/*    }} */}
      {/*  > */}
      {/*    <p>Downloading archive...</p> */}
      {/*  </div> */}
      {/* )} */}

      <div className="block-ranges-input-container">
        <div style={{ position: 'relative', top: 0 }}>
          From
          <input
            // style={{ outline: 'none' }}
            placeholder="block number"
            type="number"
            value={fromBlock}
            onChange={(e) => setFromBlock(checkNumberFromInput(e.target.value))}
          />
        </div>

        <div>
          To
          <input
            // style={{ outline: 'none' }}
            placeholder="block number"
            type="number"
            value={toBlock}
            onChange={(e) => setToBlock(checkNumberFromInput(e.target.value))}
          />
        </div>

        <button style={{ margin: 'auto', marginBottom: 'auto' }} onClick={downloadArchive}>
          Download Archive
        </button>
      </div>
    </div>
  );
};

import type { FC } from 'react';
import { useState } from 'react';
import type { IGetContractsQuery } from '../utils/interfaces';
import GatewayService from '../services/GatewayService';

interface Props {
  query: IGetContractsQuery;
}

export const DownloadArchive: FC<Props> = ({ query }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function downloadArchive() {
    setIsModalOpen(true);

    GatewayService.downloadArchive(query)
      .then(() => {
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
        setIsModalOpen(false);
      });
  }

  return (
    <div
      style={{
        alignItems: 'end',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isModalOpen && (
        <div
          style={{
            backgroundColor: '#242424',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            color: 'rgb(255 255 255 / 87%)',
            left: '50%',
            padding: '20px',
            position: 'fixed',
            top: '10%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <p>Downloading archive...</p>
        </div>
      )}

      <button style={{ marginTop: 40 }} disabled={isModalOpen} onClick={downloadArchive}>
        Download Archive
      </button>
    </div>
  );
};

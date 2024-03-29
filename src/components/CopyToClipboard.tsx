import type { FC } from 'react';
import { useCallback, useState } from 'react';
import copy from 'copy-to-clipboard';

interface Props {
  value: string;
  displayValue: string;
}

export const CopyToClipboard: FC<Props> = ({ value, displayValue }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    copy(text);
    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 1500);
  }, []);

  return (
    <div>
      <a onClick={() => copyToClipboard(value)}>{displayValue}</a>

      {isModalOpen && (
        <div
          style={{
            backgroundColor: '#242424',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(255 255 255 / 87%)',
            color: 'rgb(255 255 255 / 87%)',
            left: '50%',
            padding: '20px',
            position: 'fixed',
            top: '10%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <p>Copied to clipboard</p>
        </div>
      )}
    </div>
  );
};

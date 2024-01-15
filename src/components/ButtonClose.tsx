import type { FC } from 'react';

interface Props {
  callback: () => void;
}

export const ButtonClose: FC<Props> = ({ callback }) => {
  return (
    <button className="button-close" style={{ alignSelf: 'flex-end' }} type="button" onClick={callback}>
      Close
    </button>
  );
};

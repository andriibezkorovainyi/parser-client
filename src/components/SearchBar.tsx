import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { ISearchContractsQuery } from '../utils/interfaces';

interface Props {
  onSearch: (query: ISearchContractsQuery) => void;
  // isDownloadPromptOpen: boolean;
}

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1000); // задержка 500 мс

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    onSearch({ address: debouncedValue });
  }, [debouncedValue]);

  return (
    <div style={{ marginBottom: 20 }}>
      <div className="field search-bar-container">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input search-bar"
            type="text"
            placeholder="Address or name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search" style={{ zIndex: 0 }} />
          </span>
        </p>
      </div>
    </div>
  );
};

export default SearchBar;

import { useEffect, useState } from 'react';
import type { ISearchContractsQuery } from '../utils/interfaces';

function SearchBar({ onSearch }: { onSearch: (query: ISearchContractsQuery) => void }) {
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
    <div className="field search-bar">
      <p className="control has-icons-left has-icons-right">
        <input
          className="input"
          type="text"
          placeholder="Address or name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <span className="icon is-small is-left is-absulute">
          <i className="fas fa-search" style={{ zIndex: 0 }} />
        </span>
      </p>
    </div>
  );
}

export default SearchBar;

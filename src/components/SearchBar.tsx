import type { FC } from 'react';

interface Props {
  onSearch: (value: string) => void;
  searchValue: string;
  // isDownloadPromptOpen: boolean;
}

const SearchBar: FC<Props> = ({ onSearch, searchValue }) => {
  // const [inputValue, setInputValue] = useState('');
  // const [debouncedValue, setDebouncedValue] = useState(inputValue);

  // useEffect(() => {
  // const handler = setTimeout(() => {
  //   setDebouncedValue(inputValue);
  // }, 1000); // задержка 500 мс
  //
  // return () => {
  //   clearTimeout(handler);
  // };
  // }, [inputValue]);

  // useEffect(() => {
  //   onSearch({ address: debouncedValue });
  // }, [debouncedValue]);

  return (
    <div style={{ marginBottom: 20, width: '100%' }}>
      <div className="field search-bar-container">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input search-bar"
            type="text"
            placeholder="Address or name"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default SearchBar;

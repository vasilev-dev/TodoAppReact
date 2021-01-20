import React, {useState} from 'react';

import './search-panel.css';

const SearchPanel = ({onChange}) => {
    const [filter, setFilter] = useState('');

    const onFilterChange = (e) => {
        setFilter(e.target.value)
        onChange(e.target.value);
    };

    return (
        <input type="text"
               className="form-control search-input"
               placeholder="type to search"
               value={filter}
               onChange={onFilterChange}
        />
    );
};

export default SearchPanel;

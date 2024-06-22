import React, { useState } from 'react';

const SearchableDropdown = ({ optionss }) => {
  const options = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
    'Fig', 'Grape', 'Honeydew', 'Indian Fig', 'Jackfruit',
    'Kiwi', 'Lemon', 'Mango', 'Nectarine', 'Orange',
    'Papaya', 'Quince', 'Raspberry', 'Strawberry', 'Tangerine',
    'Ugli fruit', 'Vanilla bean', 'Watermelon', 'Xigua', 'Yuzu', 'Zucchini'
];
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearchChange = (event) => {
        const search = event.target.value;
        setSearchTerm(search);
        const filtered = options.filter(option =>
            option.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredOptions(filtered);
    };

    const handleOptionClick = (option) => {
        setSearchTerm(option);
        setShowDropdown(false);
    };

    return (
        <div className="position-relative">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowDropdown(true)}
                className="form-control"
                placeholder="Search..."
            />
            {showDropdown && (
                <ul className="list-group position-absolute w-100" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="list-group-item cursor-pointer"
                            >
                                {option}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item">No results found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchableDropdown;

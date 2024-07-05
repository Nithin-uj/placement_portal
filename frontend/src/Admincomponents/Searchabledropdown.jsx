import React, { useState } from 'react';

const SearchableDropdown = ({ options,searchTerm,setSearchTerm,selectedOption,setSelectedOption }) => {
    // const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearchChange = (event) => {
        const search = event.target.value;
        setSearchTerm(search);
        const filtered = options.filter(option =>
            option.jid.toString().includes(search.toLowerCase()) ||
            option.cname.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredOptions(filtered);
        setShowDropdown(true); // Always show dropdown on search
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.jid);
        setSearchTerm(option.jid +" "+ option.cname);
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
                <ul className="list-group position-absolute" style={{ width:"95%", maxHeight: '150px', overflowY: 'auto' ,zIndex:'100', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="list-group-item cursor-pointer"
                            >
                                {option.jid +" "+ option.cname}
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

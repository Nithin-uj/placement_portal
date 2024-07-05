import React, { useEffect, useState } from 'react';

const Studentdropdown = ({options,searchTerm,setSearchTerm,selectedOption,setSelectedOption }) => {
    // const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(()=>{
        setFilteredOptions(options);
    },[options])

    const handleSearchChange = (event) => {
        const search = event.target.value;
        setSearchTerm(search);
        const filtered = options.filter(option =>
            option.usn.toString().includes(search.toUpperCase()) ||
            option.fullname.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredOptions(filtered);
        setShowDropdown(true); // Always show dropdown on search
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.usn);
        setSearchTerm(option.usn +" "+ option.fullname);
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
                                {option.usn +" "+ option.fullname}
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

export default Studentdropdown;


import React from 'react';

const Dropdown = ({ options, value, setValue, label }) => {
    return (
        <div className='dropdowns info'> 
            <label>{label}</label>
            <select value={value} onChange={e => setValue(e.target.value)}>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
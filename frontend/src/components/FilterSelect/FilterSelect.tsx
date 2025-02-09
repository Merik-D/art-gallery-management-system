import './FilterSelect.css';

import React from 'react';

interface FilterSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ options, value, onChange }) => {
    return (
        <select
            className="select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value=""></option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default FilterSelect;

import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

interface CountrySelectorProps {
    country: string;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ country, setCountry }) => {
    const [value, setValue] = useState('');

    const options = useMemo(() => countryList().getData(), []);

    const changeHandler = (value: any) => {
        setValue(value);
        setCountry(value.label);
    };

    return (
        <Select options={options} value={value} onChange={changeHandler} />
    );
};

export default CountrySelector;

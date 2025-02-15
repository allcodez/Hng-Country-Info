import React, { createContext, useState, useContext } from 'react';

// Create the context
const FilterContext = createContext();

// Custom hook to use the filter context
export const useFilter = () => useContext(FilterContext);

// Provider component
export const FilterProvider = ({ children }) => {
    const [selectedContinents, setSelectedContinents] = useState([]);
    const [selectedTimezones, setSelectedTimezones] = useState([]);

    const handleShowResults = () => {
        console.log("Filtering Countries based on:", selectedContinents, selectedTimezones);
    };

    return (
        <FilterContext.Provider value={{
            selectedContinents,
            setSelectedContinents,
            selectedTimezones,
            setSelectedTimezones,
            handleShowResults
        }}>
            {children}
        </FilterContext.Provider>
    );
};

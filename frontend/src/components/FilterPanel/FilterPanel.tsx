import './FilterPanel.css';

import React, { useEffect, useState } from 'react';
import { getArtists, getTypes } from 'src/services/artworkService';

import FilterSelect from '../../components/FilterSelect/FilterSelect';

interface FilterPanelProps {
    setSelectedArtist: (artist: string) => void;
    setSelectedType: (type: string) => void;
    selectedArtist: string;
    selectedType: string;
    setSortOrder: (order: string) => void;

}

const FilterPanel: React.FC<FilterPanelProps> = ({
    setSelectedArtist,
    setSelectedType,
    selectedArtist,
    selectedType,
    setSortOrder,
}) => {
    const [artistOptions, setArtistOptions] = useState<string[]>([]);
    const [typeOptions, setTypeOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artists = await getArtists();
                const types = await getTypes();

                setArtistOptions(artists);
                setTypeOptions(types);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSortOrder(value);
    };

    return (
        <div className="panel">
            <label>Artists</label>
            <FilterSelect
                options={artistOptions}
                value={selectedArtist}
                onChange={setSelectedArtist}
            />
            <label>Type</label>
            <FilterSelect
                options={typeOptions}
                value={selectedType}
                onChange={setSelectedType}
            />
            <label>Sort by Price</label>
            <select className='select'
                onChange={handleSortChange}
            >
                <option value=""></option>
                <option value="asc">Lowest to Highest</option>
                <option value="desc">Highest to Lowest</option>
            </select>
        </div>
    );
};

export default FilterPanel;

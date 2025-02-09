import './CatalogPage.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterPanel from 'src/components/FilterPanel/FilterPanel';

import Catalog from '../components/Catalog';

const CatalogPage = () => {
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setSortOrder] = useState('');


  return (
    <div className='container'>
      <div className='catalog-header'>
        <h2>Explore Our Collection</h2>
        <Link className='button' to={`/create`}>Create Artwork</Link>
      </div>

      <FilterPanel
        setSelectedArtist={setSelectedArtist}
        setSelectedType={setSelectedType}
        selectedArtist={selectedArtist}
        selectedType={selectedType}
        setSortOrder={setSortOrder}
      />
      <Catalog
        selectedArtist={selectedArtist}
        selectedType={selectedType}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default CatalogPage;

import './Catalog.css';

import React, { useEffect, useState } from 'react';
import { Artwork } from 'src/types/artwork';

import { getArtworks } from '../services/artworkService';
import ArtworkCard from './ArtworkCard/ArtworkCard';

type CatalogProps = {
  selectedArtist: string;
  selectedType: string;
  sortOrder: string
};

const Catalog = ({ selectedArtist, selectedType, sortOrder }: CatalogProps) => {
  const [items, setItems] = useState<Artwork[]>([]);
  const [displayedArtwork, setDisplayedArtwork] = useState(4);

  console.log(selectedArtist);
  console.log(sortOrder);
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await getArtworks({
          artist: selectedArtist,
          type: selectedType,
          price: sortOrder
        });
        setItems(data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, [selectedArtist, selectedType, sortOrder]);

  const handleViewMore = () => {
    setDisplayedArtwork(items.length);
  };

  const handleArtworkDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className="artworks">
        {items.length > 0 ? (
          items.slice(0, displayedArtwork).map((item) => (
            <ArtworkCard
              key={item.id}
              artwork={item}
              onDelete={handleArtworkDelete}
            />
          ))
        ) : (
          <p>No artworks found based on the given parameters.</p>
        )}
      </div>
      {displayedArtwork < items.length && (
        <div className='view_more'>
          <button className='button' onClick={handleViewMore}>
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;

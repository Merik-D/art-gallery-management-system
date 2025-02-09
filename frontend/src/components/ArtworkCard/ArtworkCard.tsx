import './ArtworkCard.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { deleteArtwork } from 'src/services/artworkService';

import { Artwork } from '../../types/artwork';

type ArtworkProps = {
  artwork: Artwork;
  onDelete: (id: string) => void;
}

const ArtworkCard = ({ artwork, onDelete }: ArtworkProps) => {
  // console.log(artwork.id);

  const handleDelete = async () => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${artwork.title} artwork?`);
    if (!isConfirmed) return;
    if (artwork.id) {
      await deleteArtwork(artwork.id);
      alert(`Artwork ${artwork.title} deleted successfully`);
      onDelete(artwork.id);
    }
  };


  return (
    <div className="artwork_item" key={artwork.id}>
      <h3>{artwork.title}</h3>
      <p>Type: {artwork.type}</p>
      <p>Artist: {artwork.artist}</p>
      <p>Price: {artwork.price}</p>
      <p>Availability: {artwork.availability?.toString()}</p>
      <div className="links">
        <Link className='button' to={`/${artwork.id}/edit`} role="button">Edit</Link>
        <button onClick={handleDelete} className='button'>Delete</button>
      </div>
    </div >
  );
};

export default ArtworkCard;

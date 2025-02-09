import React from 'react';
import { Link } from 'react-router-dom';
import ArtworkForm from 'src/components/ArtworkForm/ArtworkForm';

const EditPage = () => {
    return (
        <div className='container'>
            <h2>Edit Artwork</h2>
            <Link className='button' to={`/`}>Back to Catalog</Link>
            <ArtworkForm />
        </div>
    );
};

export default EditPage;

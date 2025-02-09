import React from 'react';
import { Link } from 'react-router-dom';
import ArtworkForm from 'src/components/ArtworkForm/ArtworkForm';

const CreatePage = () => {
    return (
        <div className='container'>
            <h2>Create Artwork</h2>
            <Link className='button' to={`/`}>Back to Catalog</Link>
            <ArtworkForm />
        </div>
    );
};

export default CreatePage;

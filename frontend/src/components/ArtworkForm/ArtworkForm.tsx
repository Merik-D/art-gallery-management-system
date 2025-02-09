import './ArtworkForm.css';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
	createArtwork,
	getArtworkById,
	updateArtwork,
} from '../../services/artworkService';
import { Artwork } from '../../types/artwork';

const ArtworkForm = () => {
    const { artworkId } = useParams();
    const navigate = useNavigate();
    console.log(artworkId);
    const [entity, setEntity] = useState<Partial<Artwork>>({});

    useEffect(() => {
        if (artworkId) {
            const fetchArtwork = async () => {
                try {
                    const data = await getArtworkById(artworkId);
                    setEntity(data);
                } catch (error) {
                    console.error("Error fetching artwork:", error);
                }
            };
            fetchArtwork();
        }
    }, [artworkId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const artworkData: Artwork = {
            title: String(formData.get('title') || ""),
            artist: String(formData.get('artist') || ""),
            type: String(formData.get('type') || ""),
            price: Number(formData.get('price') || 0),
            availability: formData.get('availability') === "on"
        };

        setEntity(artworkData);
        console.log('Submitting:', artworkData);

        if (artworkId) {
            const data = await updateArtwork(artworkId, artworkData);
            alert("Artwork updated successfully!")
            console.log('Updated:', data);
        } else {
            const data = await createArtwork(artworkData);
            alert("Artwork created successfully!")
            console.log('Created:', data);
        }
        navigate("/");
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={entity.title}
                onChange={(e) => setEntity({ ...entity, title: e.target.value })}
                required
            />

            <label>Artist</label>
            <input
                type="text"
                name="artist"
                value={entity.artist}
                onChange={(e) => setEntity({ ...entity, artist: e.target.value })}
                required
            />

            <label>Type</label>
            <select
                name="type"
                value={entity.type || ""}
                onChange={(e) => setEntity({ ...entity, type: e.target.value })}
                required
            >
                <option value="">-- Please choose an option --</option>
                <option value="painting">painting</option>
                <option value="sculpture">sculpture</option>
                <option value="photograph">photograph</option>
                <option value="drawing">drawing</option>
                <option value="digital">digital</option>
                <option value="other">Other</option>
            </select>

            <label>Price</label>
            <input
                type="number"
                name="price"
                step="0.01"
                min="0"
                value={entity.price}
                onChange={(e) => setEntity({ ...entity, price: Number(e.target.value) })}
                required
            />

            <label>Availability</label>
            <input
                type="checkbox"
                name="availability"
                checked={entity.availability}
                onChange={(e) => setEntity({ ...entity, availability: e.target.checked })}
            />

            <button className='button' type="submit">{artworkId ? "Update" : "Create"}</button>
        </form>
    );
};

export default ArtworkForm;

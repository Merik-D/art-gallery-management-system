import { Artwork } from '../types/artwork';
import { api } from './api';

export const getArtworks = async (params: { price?: string, artist?: string, type?: string }) => {
    console.log(params);
    const response = await api.get("/artworks", { params: params });
    return response.data;
};

export const getArtworkById = async (id: string) => {
    const response = await api.get(`/artworks/${id}`);
    return response.data;
};

export const createArtwork = async (artworkData: Artwork) => {
    const response = await api.post("/artworks", artworkData);
    return response.data;
}

export const updateArtwork = async (id: string, artworkData: Artwork) => {
    const response = await api.put(`/artworks/${id}`, artworkData);
    return response.data;
}

export const deleteArtwork = async (id: string) => {
    const response = await api.delete(`/artworks/${id}`);
    return response.data;
}

export const getArtists = async () => {
    const response = await api.get("/artworks/artists");
    return response.data;
}

export const getTypes = async () => {
    const response = await api.get("artworks/types");
    return response.data;
}

import axios from "axios";

const API_URL = "http://localhost:3000/api/catalogs";
const API_IMAGE_URL = "http://localhost:3000/api/upload";

export const fetchCatalogs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.sort((a, b) => a.id - b.id);
    } catch (err) {
        throw new Error("Error Fetching Data:" + err.message);
    }
};

export const addCatalog = async (newItemData) => {
    try {
        const response = await axios.post(API_URL, newItemData);
        return response.data;
    } catch (err) {
        throw new Error("Error Adding Data: " + err.message);
    }
};

export const updateCatalog = async (id, updatedItemData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedItemData);
        return response.data;
    } catch (err) {
        throw new Error("Error Updating Data: " + err.message);
    }
};

export const deleteCatalog = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const uploadImage = async (file, setImage) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(API_IMAGE_URL, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            setImage(data.imageUrl); // Simpan URL gambar
        } else {
            console.error('Upload Failed:', data.message);
        }
    } catch (error) {
        console.error('Error Uploading Image:', error);
    }
};


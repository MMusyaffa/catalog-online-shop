import * as itemService from "../services/ItemService.js"

export const getCatalogs = async (req, res) => {
    try {
        const catalogs = await itemService.getCatalogs();
        res.status(200).json(catalogs);
    } catch (err) {
        console.error('Error fetching catalogs:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createItem = async (req, res) => {
    try {
        const catalogData = req.body;
        const newItem = await itemService.createItem(catalogData);
        res.status(200).json(newItem);
    } 
    catch (err) {
        console.error('Error Adding New Data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const catalogData = req.body;
        const updateItem = await itemService.updateItem(itemId, catalogData);

        if (!updateItem){
            return res.status(404).json({ message: 'Catalog Not Found' });
        }

        res.status(200).json(updateItem);
    } 
    catch (err) {
        console.error('Error Updating Data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const deleteItem = await itemService.deleteItem(itemId);

        if (!deleteItem){
            return res.status(404).json({ message   : 'Catalog Not Found' });
        }

        res.status(200).send();   
    } 
    catch (err) {
        console.error('Error Deleting Data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const searchItem = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const items = await itemService.searchItem(searchTerm);
            
        res.status(200).send(items);   
    } 
    catch (err) {
        console.error('Error Searching Data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
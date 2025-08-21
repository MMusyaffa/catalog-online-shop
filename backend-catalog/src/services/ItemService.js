import { query } from "../db.js";

export const getCatalogs = async() => {
    const {rows} = await query('SELECT * FROM catalogs_tb');
    return rows;
}

export const createItem = async(catalogData) => {
    const { name, type, size, brand, price, isActive, image_url } = catalogData;
    const { rows } = await query (
        `INSERT INTO catalogs_tb (name, type, size, brand, price, isActive, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [name, type, size, brand, price, isActive, image_url]
    );

    return rows[0];
}

export const updateItem = async(itemId, catalogData) => {
    const { name, type, size, brand, price, isActive, image_url } = catalogData;

    const { rows } = await query (
        `UPDATE catalogs_tb SET name = $1, type = $2, size =  $3, brand = $4, price = $5, isActive = $6, image_url = $7
        WHERE id = $8 RETURNING *`,
        [name, type, size, brand, price, isActive, image_url, itemId]
    );

    return rows[0];
}

export const deleteItem = async(itemId) => {
    const { rowCount } = await query (
        `DELETE FROM catalogs_tb WHERE id = $1`, [itemId]
    );

    return rowCount > 0;
}

export const searchItem = async(searchTerm) => {
    const { rows } = await query (
        `SELECT * FROM catalogs_tb WHERE name ILIKE $1 OR type ILIKE $1 OR size ILIKE $1 OR brand ILIKE $1`,
        [`%${searchTerm}%`]
    );

    return rows;
}
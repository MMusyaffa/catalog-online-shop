import express from 'express';

import * as itemController from '../controllers/ItemController.js';

const router = express.Router();

router.get('/catalogs', itemController.getCatalogs);
router.post('/catalogs', itemController.createItem);
router.put('/catalogs/:id', itemController.updateItem);
router.delete('/catalogs/:id', itemController.deleteItem);
router.get('/catalogs/search', itemController.searchItem);

export default router;
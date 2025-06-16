const ItemRoute = require('express').Router()
const ItemController = require('../controllers/ItemControllers')

ItemRoute.get('/', ItemController.getItems);
ItemRoute.post('/', ItemController.add);
ItemRoute.delete('/:id', ItemController.delete);
ItemRoute.put('/:id', ItemController.update);

module.exports = ItemRoute

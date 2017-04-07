var express = require('express');
var router = express.Router();
var recipeController = require('../controllers/RecipeController');

router.route('/')
    .get(recipeController.index);

router.route('/:foodId')
    .get(recipeController.show);

module.exports = router;

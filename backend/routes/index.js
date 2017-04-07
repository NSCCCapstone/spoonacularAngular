var express = require('express');
var router = express.Router();
var recipeController = require('../controllers/RecipeController');

router.route('/')
    .get(recipeController.index);

module.exports = router;

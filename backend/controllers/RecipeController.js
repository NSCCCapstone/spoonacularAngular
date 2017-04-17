/**
 * Created by NSCC Student on 4/3/2017.
 */


var unirest = require('unirest');
var express = require('express');

module.exports.index = function(req,res,next){


        var likes = req.query.likes.split(", ");
        console.log("Likes: " + likes);
        var dislikes = req.query.dislikes.split(", ");
        console.log("Dislikes: " + dislikes);
        var cuisine = req.query.cuisine;
        console.log("Cuisine: " + cuisine);
        var diet = req.query.diet;
        console.log("Diet: " + diet);
        var intolerances = req.query.intolerances;
        console.log("Intolerances: " + intolerances);
        var type = req.query.type;
        console.log("Type: " + type);

        include_str = likes.join("%2C+");
        exclude_str = dislikes.join("%2C+");

        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&cuisine="
            + cuisine + "&excludeIngredients="
            + exclude_str + "&fillIngredients=false&includeIngredients="
            + include_str + "&instructionsRequired=false&diet="
            + diet + "&limitLicense=false&intolerances="
            + intolerances + "&number=3&offset=0&ranking=1&type="
            + type + "")

            .header("X-Mashape-Key", "Tvrn3k9JkhmshuZ8RNyT4i3v4G1Hp10U0YkjsnOd1d34u7DOaJ")
            .header("Accept", "application/json")
            .end(function (result) {
                console.log(result.status, result.headers, result.body);
                res.json(result)
            });
};



module.exports.show = function(req,res,next){
    var recipeID = req.params.foodId;

    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+recipeID+"/information?includeNutrition=false")
        .header("X-Mashape-Key", "Tvrn3k9JkhmshuZ8RNyT4i3v4G1Hp10U0YkjsnOd1d34u7DOaJ")
        .header("Accept", "application/json")
        .end(function (result) {
            console.log(result.status, result.headers, result.body);
            console.log(result.body);
            res.json(result.body);
        });
};


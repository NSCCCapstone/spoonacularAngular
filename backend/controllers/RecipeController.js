/**
 * Created by NSCC Student on 4/3/2017.
 */


var unirest = require('unirest');

module.exports.index = function(req,res,next){
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&cuisine=american&excludeIngredients=coconut%2C+mango&fillIngredients=false&includeIngredients=onions%2C+lettuce%2C+tomato&instructionsRequired=false&intolerances=peanut%2C+shellfish&limitLicense=false&maxCalories=1500&maxCarbs=100&maxFat=100&maxProtein=100&minCalories=150&minCarbs=5&minFat=5&minProtein=5&number=10&offset=0&query=burger&ranking=1&type=main+course")
            .header("X-Mashape-Key", "Tvrn3k9JkhmshuZ8RNyT4i3v4G1Hp10U0YkjsnOd1d34u7DOaJ")
            .header("Accept", "application/json")
            .end(function (result) {
                console.log(result.status, result.headers, result.body);
                res.json(result)
            });
};

module.exports.show = function(req,res,next){

    req.getConnection(function(err, connection){
        if (err) return next(err);

    });

};
/**
 * Created by NSCC Student on 4/3/2017.
 */


var unirest = require('unirest');

module.exports.index = function(req,res,next){

        // var likes = ["pork"];
        // var dislikes = ["oranges", "olives"];

        //added parsing for query params

        console.log(req.query.likes);
        console.log(req.query.dislikes);

        var likes = req.query.likes.split(", ");
        var dislikes = req.query.dislikes.split(", ");

        include_str = likes.join("%2C+");
        exclude_str = dislikes.join("%2C+");

        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&excludeIngredients="+exclude_str+"&fillIngredients=false&includeIngredients="+include_str+"&instructionsRequired=false&limitLicense=false&number=3&offset=0&ranking=1&type=main+course")
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
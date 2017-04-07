/**
 * Created by NSCC Student on 4/3/2017.
 */


var unirest = require('unirest');

module.exports.index = function(req,res,next){
    req.getConnection(function(err,connection){
        if(err) return next(err);
        unirest.post("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/classify")
            .header("X-Mashape-Key", "Tvrn3k9JkhmshuZ8RNyT4i3v4G1Hp10U0YkjsnOd1d34u7DOaJ")
            .header("Content-Type", "application/json")
            .header("Accept", "application/json")
            .send({"title":"Kroger Vitamin A & D Reduced Fat 2% Milk","upc":"","plu_code":""})
            .end(function (result) {
                console.log(result.status, result.headers, result.body);
                res.json(results);
            });

    });
};

module.exports.show = function(req,res,next){
    var eventID = req.params.eventID;

    req.getConnection(function(err, connection){
        if (err) return next(err);

        var query = connection.query('SELECT * FROM Event WHERE eventId = ?', [eventID], function(err, results){

            if(err) return next(err);

            res.json(results[0]);

        });

        console.log(query.sql);

    });

};
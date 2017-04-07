/**
 * Created by inet2005 on 4/3/17.
 */

/*Helpers*/
//
/*CRUD functions*/



function getRecipes()
{
    //ajax call to read all events
        $.get("http://localhost:3000/?dislikes=oranges%2C+olives&likes=pork", function(data, status){
            console.log(data);
            //run through the data to get each individual recipe
            for(var i = 0; i<data.body.results.length; i++){
                var recipeNum = i + 1;
                var recipes = $('#recipe' + recipeNum);
                recipes.text(data.body.results[i].title)
            }

        });
}


$(document).ready(function(){
    getRecipes();

    $("search").click(function(){
        var likes = $("likes").val();
        var dislikes = $("dislikes").val();

    });
});
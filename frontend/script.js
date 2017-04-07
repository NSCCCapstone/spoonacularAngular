/**
 * Created by inet2005 on 4/3/17.
 */

/*Helpers*/
//
/*CRUD functions*/



function getRecipes()
{
    //ajax call to read all events
    //get request with hard-coded query params, replace these with data from the inputs
        $.get("http://localhost:3000/?dislikes=oranges%2C+olives&likes=pork", function(data, status){
            console.log(data);
            //run through the data to get each individual recipe
            for(var i = 0; i<data.body.results.length; i++){
                var recipeNum = i + 1;
                var recipe = $('#recipe' + recipeNum);
                recipe.attr('onclick','selectRecipe(' + data.body.results[i].id + ')');
                recipe.append("<img class='img-responsive' src='" + data.body.results[i].image + "'/>");
                recipe.append(data.body.results[i].title);
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
/**
 * Created by inet2005 on 4/3/17.
 */

/*Helpers*/
//
/*CRUD functions*/



function getRecipes()
{
    //ajax call to read all events
        $.get("http://localhost:3000/", function(data, status){
            console.log(data);
            //run through the data to get each individual recipe
            for(var i = 0; i<data.body.results.length; i++){
                var recipeNum = i + 1;
                var recipe = $('#recipe' + recipeNum);
                recipe.attr('onclick','selectRecipe(' + data.body.results[i].id + ')');
                recipe.text(data.body.results[i].title)
            }

        });
}


$(document).ready(function(){
    getRecipes();
});
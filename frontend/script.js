/**
 * Created by inet2005 on 4/3/17.
 */

/*Helpers*/
//
/*CRUD functions*/

function getRecipes()
{

    document.getElementById("loader").style.display = "block";

    var likes = $("#likes").tagsinput('items');
    var dislikes = $("#dislikes").tagsinput('items');

    likes = likes.join();
    likes.replace(",","%2C+");

    dislikes = dislikes.join();
    dislikes.replace(",","%2C+");

    var seperator = '%2C+';
    //ajax call to read all events
    //get request with hard-coded query params, replace these with data from the inputs
        $.get("http://localhost:3000/?dislikes=" + dislikes + "&likes=" + likes, function(data, status){
            document.getElementById("loader").style.display = "none";
            //run through the data to get each individual recipe
            for(var i = 0; i<data.body.results.length; i++){
                var recipeNum = i + 1;
                var recipe = $('#recipe' + recipeNum);
                recipe.attr('onclick','selectRecipe(' + data.body.results[i].id + ')');
                recipe.append('<h1 class="text-center" id="recipeTitle">' + data.body.results[i].title + '</h1>');
                recipe.append("<img class='recipeImg' src='" + data.body.results[i].image + "'/>");
            }

        });
}

function selectRecipe(foodId){
    $.get("http://localhost:3000/"+foodId, function(data, status) {
        document.getElementById("loader").style.display = "none";
        // hide recipe results in order to show selected recipe information,
        // this will need to be undone if you want to go back to the ingredient list without a page-refresh
        document.getElementById("recipes").style.display = 'none';
        document.getElementById("ingredients").style.display = 'block';

        // set ingredients div html to display the title, this will also empty the div of any previous content
        $('#ingredients').html("<h3>" + data.title + "</h3>");

        // loop through ingredient list and append each ingredient to the #ingredients div
        for (var i = 0; i < data.extendedIngredients.length; i++) {
            console.log(data.extendedIngredients[i].name);

            $('#ingredients').append("<p>" + data.extendedIngredients[i].originalString + "</p>");
        }

        if(data.instructions != null){
            $('#ingredients').append("<p>" + data.instructions + "</p>");
        }

        $('#ingredients').append("<button id='hide-ingredients' class='btn btn-primary'>Back</button>");
        document.getElementById("hide-ingredients").onclick = function () {
            document.getElementById("ingredients").style.display = 'none';
            document.getElementById("recipes").style.display = 'block';
            $('#ingredients').text('');
        };
    });
}

$(document).ready(function(){

    var imagesHeight = $(window).height() - $('.inputs').height();
    $('#recipes').css({height: imagesHeight});
    $('#ingredients').css({height: imagesHeight});

    $('#submit').click(function(){
        $('#recipe1').text('');
        $('#recipe2').text('');
        $('#recipe3').text('');
        getRecipes();
    })

    $("search").click(function(){
        var likes = $("likes").val();
        var dislikes = $("dislikes").val();

    });
});
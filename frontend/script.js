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
        $.get("http://localhost:3000/?dislikes=" + dislikes + "&likes=" + likes, function(data, status){
            document.getElementById("loader").style.display = "none";
            //run through the data to get each individual recipe
            var num = 1;
            for(var i = 0; i<data.body.results.length; i++){
                var recipeNum = i + 1;
                var recipe = $('#recipe' + recipeNum);
                recipe.attr('onclick','selectRecipe(' + data.body.results[i].id + ')');
                recipe.append("<div class='col-md-12 text-center'><h1 class='text-center' id='recipeTitle'>" + data.body.results[i].title + "</h1></div>");
                recipe.append("<div class='col-md-12 text-center'><img class='recipeImg' id='recipeImg" + num + "' src='" + data.body.results[i].image + "'/></div>");
                recipe.append("<div class='col-md-12 text-center'><button class='btn btn-primary moreInfo'>More Info</button></div>");
                num += 1;
            }
            setImageHeight();
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
        $('#ingredients').html("<h3 class='text-center'>" + data.title + "</h3><ul id='ingredientsList' class='text-center'>");

        // loop through ingredient list and append each ingredient to the #ingredients div
        for (var i = 0; i < data.extendedIngredients.length; i++) {
            console.log(data.extendedIngredients[i].name);

            $('#ingredients').append("<li>" + data.extendedIngredients[i].originalString + "</li>");
        }

        if(data.instructions != null){
            $('#ingredients').append("<p>" + data.instructions + "</p>");
        }

        $('#ingredients').append("</ul><button id='hide-ingredients' class='btn btn-primary'>Back</button>");
        document.getElementById("hide-ingredients").onclick = function () {
            document.getElementById("ingredients").style.display = 'none';
            document.getElementById("recipes").style.display = 'block';
            $('#ingredients').text('');
        };
    });
}

function setImageHeight(){
    var num = 1;
    for (var i = 0; i < 3; i++) {
        otherwidth = $('#recipe' + num).width();
        width = $('#recipeImg' + num).width();
        height = $('#recipeImg' + num).height();
        if(height > width){ //portrait style photo
            $('#recipeImg' + num).css('max-height',width);
            $('#recipeImg' + num).css('width',otherwidth);
        }
        else { //landscape photo
        }
        num += 1;
    }
}

$(document).ready(function(){


    var imagesHeight = $(window).height() - $('#outerContainer').height();
    $('#recipes').css({'min-height': imagesHeight});
    $('#recipes').css({'max-height': imagesHeight});

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
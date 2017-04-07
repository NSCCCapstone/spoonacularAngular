/**
 * Created by inet2005 on 4/3/17.
 */

/*Helpers*/
//
/*CRUD functions*/

function getRecipes()
{

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
            //run through the data to get each individual recipe
            for(var i = 0; i<data.body.results.length; i++){
                var recipeNum = i + 1;
                var recipe = $('#recipe' + recipeNum);
                recipe.attr('onclick','selectRecipe(' + data.body.results[i].id + ')');
                recipe.append('<h1 class="text-center" id="recipeTitle">' + data.body.results[i].title + '</h1>');
                recipe.append("<img class='recipeImg img-responsive' src='" + data.body.results[i].image + "'/>");
            }

        });
}
function selectRecipe(foodId){
    $.get("http://localhost:3000/"+foodId, function(select, status) {
    });
}
//spinner code
var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}
//end of spinner code

$(document).ready(function(){

    var imagesHeight = $(window).height() - $('.inputs').height();
    $('.recipeImg').css({height: imagesHeight});

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
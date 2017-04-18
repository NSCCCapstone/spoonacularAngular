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

    var intolerances = $('.selectpicker').val().toString();
    intolerances.replace(',','%2C+');

    likes = likes.join();
    likes.replace(",","%2C+");

    dislikes = dislikes.join();
    dislikes.replace(",","%2C+");
    if($('.cuisine').text() != 'Cuisine '){
        cuisine = $('.cuisine').text();
    }
    else{
        cuisine = '';
    }

    if($('.diet').text() != 'Diet '){
        diet = $('.diet').text();
    }
    else{
        diet = '';
    }

    if($('.mealType').text() != 'Meal Type '){
        type = $('.mealType').text();
    }
    else if($('.mealType').text() == 'Main Course'){
        type = 'main+course';
    }
    else{
        type = '';
    }
        $.get("http://localhost:3000/?dislikes=" + dislikes + "&likes=" + likes + "&cuisine=" + cuisine + "&intolerances=" + intolerances + "&diet=" + diet + "&type=" + type,
            function(data, status){
            console.log(data.body.results);
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
            setRecipeBlockHeight();
            $('.cuisine').text('Cuisine ');
            $('.diet').text('Diet ');
            $('.mealType').text('Meal Type ');
            document.getElementById("mySidenav").style.width = "0";
            $('.selectpicker').selectpicker('deselectAll');
            $('.selectpicker').title('Intolerances');


        });

    setTimeout(function() { setImageHeight(); }, 1000);
}

function selectRecipe(foodId){
    $.get("http://localhost:3000/"+foodId, function(data, status) {
        document.getElementById("loader").style.display = "none";
        // hide recipe results in order to show selected recipe information,
        // this will need to be undone if you want to go back to the ingredient list without a page-refresh
        document.getElementById("recipes").style.display = 'none';
        document.getElementById("ingredients").style.display = 'block';

        // set ingredients div html to display the title, this will also empty the div of any previous content
        $('#ingredients').html("<div class='col-md-12'><h3 class='text-center'>" + data.title + "</h3></div><div class='col-md-12'><ul id='ingredientsList' class='text-center'>");

        // loop through ingredient list and append each ingredient to the #ingredients div
        for (var i = 0; i < data.extendedIngredients.length; i++) {
            console.log(data.extendedIngredients[i].name);

            $('#ingredients').append("<div class='col-md-12 text-center recipeItem'><li>" + data.extendedIngredients[i].originalString + "</li></div>");
        }

        if(data.instructions != null){
            $('#ingredients').append("<div class='col-md-12'><p>" + data.instructions + "</p></div>");
        }

        $('#ingredients').append("</ul></div><div class='col-md-12 text-center'><button id='hide-ingredients' class='btn btn-primary'>Back</button></div>");
        document.getElementById("hide-ingredients").onclick = function () {
            document.getElementById("recipes").style.display = 'block';
            $('#ingredients').text('');
        };
    });
}

function setImageHeight(){
    var num = 1;
    for (var i = 0; i < 3; i++) {
        if (document.documentElement.clientWidth > 768) {
            otherwidth = $('#recipe' + num).width();
            $('#recipeImg' + num).css('min-width',otherwidth);
            $('#recipeImg' + num).css('max-width',otherwidth);
        }
        else{

        }
        width = $('#recipeImg' + num).width();
        height = $('#recipeImg' + num).height();
        if(height > width){ //portrait style photo
            $('#recipeImg' + num).css('max-height',width);
        }
        else { //landscape photo
        }
        num += 1;
    }
}

function setRecipeBlockHeight(){
    var recipeBlockHeight = $(window).height() - $('#outerContainer').height();
    if (document.documentElement.clientWidth > 768) {
        $('#recipes').css({'min-height': recipeBlockHeight});
        $('#recipes').css({'max-height': recipeBlockHeight});
    }
}

$(document).ready(function(){

    $(".dropdown-menu li a").click(function(){
        var selText = $(this).text();
        $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
    });

    $('#settings').click(function(){
        document.getElementById("mySidenav").style.width = "300px";
    });

    $('.closebtn').click(function(){
        document.getElementById("mySidenav").style.width = "0";
    });

    setRecipeBlockHeight();

    $('#submit').click(function(){
        $('#recipe1').text('');
        $('#recipe2').text('');
        $('#recipe3').text('');
        getRecipes();

    });

    $("search").click(function(){
        var likes = $("likes").val();
        var dislikes = $("dislikes").val();

    });
});
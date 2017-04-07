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
    });
}


$(document).ready(function(){
    getRecipes();
});
/**
 * Created by inet2005 on 4/3/17.
 */

/*Helpers*/

/*CRUD functions*/


function getRecipes()
{
    //ajax call to read all events
    $.ajax({
        url: "http://localhost:3000/",
        method: "GET",
        success: function (data) {

            if (data != null && data.length > 0) {
                console.log(data);

            }
        }
    });
}


$(document).ready(function(){
    getRecipes();
});
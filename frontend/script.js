/**
 * Created by inet2005 on 4/3/17.
 */

/*Helpers*/

/*CRUD functions*/


function readEvents()
{
    //ajax call to read all events
    $.ajax({
        url: "http://localhost:3000/users/" + $('#userId').val() + "/events/",
        method: "GET",
        success: function (data) {

            if (data != null && data.length > 0) {

            }
        }
    });
}


$(document).ready(function(){

});

function checkConnectivity()
{
    $("#connection_check").html("checking...");

    $.get('http://edisdead.com/connection_check', function(responseText) {
        if (responseText == "all is good")
            $("#connection_check").html("great success");
        else
            $("#connection_check").html("failure");
            
    }).fail(function(f)
    {
        $("#connection_check").html("error: returned status " + f.status);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (getId() != undefined)
        $("#user_id").css({"display": "block-inline", "background-color": "lightGreen"}).html(getId());
    else
        $("#user_id").css({"display": "block-inline", "background-color": "red"}).html("not logged in with google");

    $("#connection_check").html("check connectivity with server").button().click(checkConnectivity);
});

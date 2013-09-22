function renderView()
{
    var toggle_button = $("#toggle_ext");

    if (isEnabled()) {
        toggle_button.html("enable");
    }
    else {
        toggle_button.html("disable");
    }

    setIcon();
    renderMissions();
}

function renderMissions()
{
    $("#missions").empty();

    $.each(getMissions(), function(index, mission)
    {
        var m = $("<div></div>");

        m.append($("<span>"+mission+"</span>"));

        if (mission == getCurrentMission())
            m.addClass("selected");

        var remove_mission = $("<span></span>").addClass("ui-icon ui-icon-plus").css({"float": "right", "display": "inline-block"})

        remove_mission.click(function()
        {
            removeMission($($(this).parent().children()[0]).html());
        });

        m.append(remove_mission);

        m.addClass("ui-widget-content").appendTo($("#missions"));
    }
    )

    $("#missions .ui-widget-content").click(function() {
      $(this).addClass("selected").siblings().removeClass("selected");
      setMission($($(this).children()[0]).html());
    });
}

function toggleExtentsion()
{
    localStorage["enabled"] = isEnabled() ? 0 : 1;
    renderView();
}

function getCurrentMission()
{
    return localStorage["mission"];
}

function getMissions()
{
    return JSON.parse(localStorage["missions"] || "[]");
}

function isNewMission(mission)
{
    return mission != "" && $.inArray(mission, getMissions()) == -1;
}

function addMission(mission)
{
    var missions = getMissions()

    missions.push(mission)

    localStorage["missions"] = JSON.stringify(missions);
}

function setMission(mission)
{
    localStorage["mission"] = mission;
}

function removeMission(mission)
{
    var missions = getMissions();

    missions = $.grep(missions, function(value, index)
    {
        return value != mission;
    })

    setMissions(missions);

    renderView();
}

function setMissions(missions)
{
    localStorage["missions"] = JSON.stringify(missions);
}

function newMission(e)
{
    var mission = $("#new_mission").val();
    $("#new_mission").val("");

    if (isNewMission(mission)) {
        addMission(mission);
    }
    renderView();
}

document.addEventListener("DOMContentLoaded", function () {
    $("#toggle_ext").button().click(toggleExtentsion);

    $("#new_mission").bind("enterKey", newMission);
    $("#new_mission").keyup(function(e){
        if(e.keyCode == 13)
        {
            $(this).trigger("enterKey");
        }
    });


    renderView();
});


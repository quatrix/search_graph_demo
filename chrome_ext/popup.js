function renderView()
{
    var toggle_button = $("#toggle_ext");

    if (isEnabled()) {
        toggle_button.html("disable");
    }
    else {
        toggle_button.html("enable");
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

        var remove_mission = $("<span></span>").addClass("ui-icon ui-icon-circle-close").css({"float": "right", "display": "inline-block"})

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
      setCurrentMission($($(this).children()[0]).html());
    });
}

function toggleExtension()
{
    if (isEnabled())
        localStorage["disabled"] = 1;
    else
        delete localStorage["disabled"];

    renderView();
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

function setCurrentMission(mission)
{
    localStorage["mission"] = mission;
}

function resetCurrentMission()
{
    delete localStorage["mission"];
}

function removeMission(mission)
{
    var missions = getMissions();

    missions = $.grep(missions, function(value, index)
    {
        return value != mission;
    })

    setMissions(missions);

    if (mission == getCurrentMission())
        resetCurrentMission();

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
        setCurrentMission(mission);
    }
    renderView();
}

document.addEventListener("DOMContentLoaded", function () {
    $("#toggle_ext").button().click(toggleExtension);

    $("#new_mission").bind("enterKey", newMission);
    $("#new_mission").keyup(function(e){
        if(e.keyCode == 13)
        {
            $(this).trigger("enterKey");
        }
    });


    renderView();
});


var navigationLevel=0;
var navigationPath="";
var lessonUrl="lesson.php";


var main =function(){

    loadMainLevelNavigation();

    $("#nav_scratch").click(function () { 
      loadScratchLessons();
      navigationLevel=1;
    });

    $("#nav_mindstorm").click(function () { 
      loadMindstormLessons();
      navigationLevel=1;
    });

    $("#nav_arduino").click(function () { 
      loadArduinoLessons();
      navigationLevel=1;
    });

    $("#btn-back").click(function () { 
      loadMainLevelNavigation()
      navigationLevel=0;
    });

    $(".btn-lesson").click(function () { 
        var id=$(this).attr('id');
        navigationPath+=("_"+id.charAt(id.length-1)); 
        window.location.href = lessonUrl+"#"+navigationPath;
    });
}

function loadMainLevelNavigation(){
  $('#navigationContainer').show();
  $('#navigationContainer-lesson-lv').hide();
  $('#navigationContainerBack').hide();
}

function loadScratchLessons(){
  $('#navigationContainer').hide();
  $('#navigationContainer-lesson-lv').show();
  $('#navigationContainerBack').show();
  navigationPath="scratch";
}

function loadMindstormLessons(){
  $('#navigationContainer').hide();
  $('#navigationContainer-lesson-lv').show();
  $('#navigationContainerBack').show();
  navigationPath="mindstorm";
}

function loadArduinoLessons(){
  $('#navigationContainer').hide();
  $('#navigationContainer-lesson-lv').show();
  $('#navigationContainerBack').show();
  navigationPath="arduino";
}



function prependButtonToNavigation(id, spanText){
   $('#navigationContainer').prepend('<a id="%id" class="btn btn-info btn-lg btn-navigation" >\
    <span class="glyphicon glyphicon-folder-open"></span>   %s</a>'.replace(/%s/g, spanText).replace(/%id/g, id));

}


$(document).ready(main);



/// <reference path="typings/jquery/jquery.d.ts"/>
var index=-1;
var lessonId;
var startLessonImgUrl="https://s3-us-west-2.amazonaws.com/treeo/ImgStartLesson.jpg";
var endLessonImgUrl="https://s3-us-west-2.amazonaws.com/treeo/ImgLessonCompleted.jpg";
var navigationUrl="navigation.html";
var jsonLesson;
var json;
var $mediaContainer = $("#mediaContainer");
var $imageDisplay = '#imageDisplay';

var main =function(){
    $("#btnNext").hide();
    $("#btnPrev").hide();
    
    $("#switchGifMode").bootstrapSwitch();
    $($imageDisplay).attr("src", startLessonImgUrl);
    
    var hashLessonIdentifier = window.location.hash.substr(1);
    var res = hashLessonIdentifier.split("_"); 
    
    json=jsonMain[res[0]][parseInt(res[1])-1]["lesson_"+res[1]];

    $("#btnStartEnd").click(function () { 
        $("#btnStartEnd").hide();
        $("#btnNext").show();
        $("#btnPrev").show();
        index++;
        loadResource();
    });

  	$("#btnNext").click(function () { 
        if(index>=json.length-1){
          $("#btnNext").hide();
          $("#btnPrev").hide();
      
          $($imageDisplay).attr("src", endLessonImgUrl);
          return;
        }    
      
        if( index<json.length){
          index++;
          loadResource();
          $("#btnPrev").removeClass("disabled");
        }
    });

    $("#btnPrev").click(function () {
        if(index<json.length){
          $("#btnNext").removeClass("disabled");
        }
      
        if( index>0){ 
          index--;
          loadResource();
        }
      
        if(index<=0){
          $("#btnPrev").addClass("disabled");
        }
    });

    $('#btn-nav-home').click(function () { 
      window.location.href = navigationUrl;
    });
};

function hoverLoadGif(previewUrl, gifUrl){
  $($imageDisplay).attr('src', previewUrl);
  $($imageDisplay).hover(function(){
    // on mouse enter
    $(this).attr('src',gifUrl); 
  }, function(){
    // on mouse leave
    $(this).attr('src', previewUrl);
  });
};

function loadResource(){
   if($("#switchGifMode").bootstrapSwitch("state")==true){
      $($imageDisplay).unbind('mouseenter mouseleave');
      $($imageDisplay).attr("src", json[index].location);
    }else{
      hoverLoadGif(json[index].preview, json[index].location);
    }
    
    document.getElementById("navbar-title").innerHTML = json[index].title;
    document.getElementById("instructionBox").innerHTML = json[index].instruction;
}


$(document).ready(main);



/// <reference path="../typings/jquery/jquery.d.ts"/>
var NAVIGATION_URL="navigation.html";
var LESSON_START_IMG_URL="https://s3-us-west-2.amazonaws.com/treeo/ImgStartLesson.jpg";
var LESSON_END_IMG_URL="https://s3-us-west-2.amazonaws.com/treeo/ImgLessonCompleted.jpg";


var json=loadLessonIntoJsonObj();

var MediaTypeIdNVP = {
    image: '#imageDisplay',
    video: '#videoDisplay',
    youtube: '#youtubeDisplay',
    text: '#textDisplay'
};

var index=-1;
var dropdownList=[];

var videoPlayer;
var videoSrc;

var main =function(){
    $("#btnNext").hide(); $("#btnPrev").hide();

    hideAllMediaElements();
    
    $("#switchVideoMode").bootstrapSwitch();
    $("#imageDisplay").attr("src", LESSON_START_IMG_URL).show();

    initializeInstructionBoxHeight("#imageDisplay");
    
    videoPlayer=document.getElementById('videoPlayer');
    videoSrc=document.getElementById('videoSrc');


    $("#btnStartEnd").click(function () {
        $("#btnStartEnd").hide();
        $("#btnNext").show(); $("#btnPrev").show();
        index++;
        loadResource();
    });

  	$("#btnNext").click(function () {
        if(index>=json.length-1){
            $("#btnNext").hide(); $("#btnPrev").hide();
            hideAllMediaElements();
            $(".navbar-nav .dropdown").hide();
            $("#imageDisplay").attr("src", LESSON_END_IMG_URL).show();
            return;
        };

        if( index<json.length){
          index++;
          loadResource();
          $("#btnPrev").removeClass("disabled");
        };
    });

    $("#btnPrev").click(function () {
        if(index<json.length){
          $("#btnNext").removeClass("disabled");
        };

        if( index>0){
          index--;
          loadResource();
        };

        if(index<=0){
          $("#btnPrev").addClass("disabled");
        };
    });

    $('#btn-nav-home').click(function () {
      window.location.href = NAVIGATION_URL;
    });

    $("#lessonStepDropdown").on("click", "li", function() {
        index=$(this).index();
        loadResource();
    });

    $('#mediaContainer').click(function () {
        console.log("test passed");
        $('#myModal').modal('toggle');
    });

    $(".modal-wide").on("show.bs.modal", function() {
        var height = $(window).height() - 200;
        $(this).find(".modal-body").css("max-height", height);
    });


};


function loadResource(){

  appendListItem("#lessonStepDropdown", json[index].title);
  hideAllMediaElements();
  $("#navbarTitle").html(json[index].title+"<span class='caret'></span>");
  $("#instructionContainer .instruction-body").html(json[index].instruction);

  switch (json[index].type) {
    case "image":
        $("#imageDisplay").attr("src", json[index].location).show();
        $("#imageDisplayModal").attr("src", json[index].location).show();
        break;
    case "video":
      //TODO: check if jquery selector works
        videoSrc.setAttribute('src', json[index].location);
        videoPlayer.load();
        $("#videoDisplay").show();
        initiateSlider();

        $("#videoSrcModal").attr('src', json[index].location);
        $("#videoPlayerModal").load();
        $("#videoDisplayModal").show();
        break;
    case "youtube":
        $("#youtubeDisplay").attr("src", json[index].location).show();
        $("#youtubeDisplayModal").attr("src", json[index].location).show();
        break;
    case "text":
        $("#textDisplay").setValue(downloadFromAjax(json[index].location)).show();
        break;
  }
    initializeInstructionBoxHeight(MediaTypeIdNVP[json[index].type]);

}

function initializeInstructionBoxHeight(divId){
    //TODO: modify this function to be more dynamic
    console.log(divId+"height is "+getHeight(divId));
    console.log("#instructionContainer .instruction-header height is "+getHeight("#instructionContainer .instruction-header"));
    console.log("height different is "+ (getHeight(divId)-getHeight("#instructionContainer .instruction-header")).toString());

    $(".instruction-body").height(getHeight(divId)-112);
}

function initiateSlider(){
  
  document.getElementById('videoPlayer').addEventListener('loadedmetadata', function() {
    this.pause();
    var duration=this.duration;
    new Dragdealer('videoSlider', {
      animationCallback: function(x, y) {
        document.getElementById('videoPlayer').currentTime=x*duration;
          $('#videoSliderValue').text(Math.round(x * 100)+"%");
      }
    });
  });
}

function loadLessonIntoJsonObj(){
    var lessonLoadInfo=window.location.hash.substr(1).split("_")
    var lessonType = lessonLoadInfo[0];
    var lessonNumberIndex=parseInt(lessonLoadInfo[1])-1;
    var lessonString="lesson_"+lessonLoadInfo[1];
    return jsonMain[lessonType][lessonNumberIndex][lessonString];

}

function hideAllMediaElements(){
    $("#textDisplay").hide();
    $("#youtubeDisplay").hide();
    $("#imageDisplay").hide();
    $("#videoDisplay").hide();

    $("#youtubeDisplayModal").hide();
    $("#imageDisplayModal").hide();
    $("#videoDisplayModal").hide();
}


$(document).ready(main);

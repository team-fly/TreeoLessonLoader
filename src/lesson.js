/// <reference path="../typings/jquery/jquery.d.ts"/>
var NAVIGATION_URL="navigation.html";
var MediaTypeIdNVP = {
    image: '#imageDisplay',
    video: '#videoDisplay',
    youtube: '#youtubeDisplay',
    text: '#textDisplay'
};


var index=0;
var dropdownList=[];
var json=loadLessonIntoJsonObj();

var main =function(){

    $("#loadingDisplay").hide();

    hideAllMediaElements();
    loadResource();

    $("#btnPrev").addClass("disabled");

  	$("#btnNext").click(function () {
        if( index<json.length){
          index++;
          loadResource();
          $("#btnPrev").removeClass("disabled");
        };
    });

    $("#btnPrev").click(function () {
        if(index>0){
            index--;
            loadResource();
            $("#btnNext").removeClass("disabled");
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
        $('#myModal').modal('toggle');
    });

    $(".modal-wide").on("show.bs.modal", function() {
        var height = $(window).height() - 200;
        $(this).find(".modal-body").css("max-height", height);
    });

};


function loadResource(){
    $("#loadingDisplay").fadeIn("fast");
  appendListItem("#lessonStepDropdown", json[index].title);
  hideAllMediaElements();

    $("#instructionContainer .instruction-body").html(json[index].instruction);

  switch (json[index].type) {
    case "image":
        $("#imageDisplay").attr("src", json[index].location).add("#lessonNavigationContainer").fadeIn("fast");
        $("#imageDisplayModal").attr("src", json[index].location).show();
        initializeInstructionBoxHeight(MediaTypeIdNVP[json[index].type]);
        break;
    case "video":
        $("#videoSrc").attr('src', json[index].location);
        $("#videoPlayer").get(0).load();

        $("#videoPlayer").get(0).addEventListener('loadedmetadata', function() {
            $( "#videoDisplay").fadeIn( "fast", function() {
                initializeInstructionBoxHeight("#videoPlayer");
            });
        });

        $("#videoPlayer").get(0).play();

        var dragDealerInitiated=false;
        $('#videoPlayer').on('ended',function(){

            if(!dragDealerInitiated){
                initiateDragDealer();
                dragDealerInitiated=true;
            }
        });

        $("#videoSrcModal").attr('src', json[index].location);
        $("#videoPlayerModal").load();
        $("#videoDisplayModal").show();
        break;
    case "youtube":
        $("#youtubeDisplay").attr("src", json[index].location).add("#lessonNavigationContainer").fadeIn("fast");
        $("#youtubeDisplayModal").attr("src", json[index].location).show();
        initializeInstructionBoxHeight(MediaTypeIdNVP[json[index].type]);
        break;
    case "text":
        editor.setValue("TEST"/*downloadFromAjax(json[index].location)*/);
        $("#textDisplay").add("#lessonNavigationContainer").fadeIn("fast");
        initializeInstructionBoxHeight(MediaTypeIdNVP[json[index].type]);
        break;
  }

    $("#navbarTitle").html(json[index].title+"<span class='caret'></span>");

}

function initializeInstructionBoxHeight(divId){
    $(".instruction-body").height(getHeight(divId)-112);
    $("#instructionContainer").add("#lessonNavigationContainer").fadeIn("fast");
    $("#loadingDisplay").hide();
}

function initiateDragDealer(){
    $("#videoSlider").show();

    document.getElementById('videoPlayer').pause();
    var duration=document.getElementById('videoPlayer').duration;
    new Dragdealer('videoSlider', {
        animationCallback: function(x, y) {
            document.getElementById('videoPlayer').currentTime=(x*duration).toFixed(6);
            $('#videoSliderValue').text((x*duration).toFixed(2));
        }
    });
}

function loadLessonIntoJsonObj(){
    var lessonLoadInfo=window.location.hash.substr(1).split("_");
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
    $("#videoSlider").hide();
    //$("#lessonNavigationContainer").hide();

    $("#youtubeDisplayModal").hide();
    $("#imageDisplayModal").hide();
    $("#videoDisplayModal").hide();

    $("#instructionContainer").hide();
}


$(document).ready(main);

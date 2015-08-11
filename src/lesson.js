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
var $mediaContainer;

var main =function(){
    $mediaContainer=document.getElementById("mediaContainer");
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
    $("#loadingDisplay").fadeIn("slow");
  appendListItem("#lessonStepDropdown", json[index].title);
  hideAllMediaElements();

    $("#instructionContainer .instruction-body").html(json[index].instruction);

  switch (json[index].type) {
      case "image":
        //$("#imageDisplay").attr("src", json[index].location);

          $("#imageDisplay").load(function() {
              $("#imageDisplay").fadeIn("slow");
              autoSetHeightWidth();

          }).attr("src", json[index].location);




         /*
        var loadImage = new Image();
        loadImage.src =  $("#imageDisplay").attr('src');
        loadImage.onLoad = function(){
            autoSetHeightWidth();
            $("#imageDisplay").fadeIn("fast");
        };
        */
        break;
    case "video":
        $("#videoSrc").attr('src', json[index].location);
        $("#videoPlayer").get(0).load();

        $("#videoPlayer").get(0).addEventListener('loadedmetadata', function() {
            autoSetHeightWidth();
            $( "#videoDisplay").fadeIn( "fast");
        });

        $("#videoPlayer").get(0).play();

        var dragDealerInitiated=false;
        $('#videoPlayer').on('ended',function(){

            if(!dragDealerInitiated){
                initiateDragDealer();
                dragDealerInitiated=true;
            }
        });

        break;
    case "youtube":
        $("#youtubeDisplay").attr("src", json[index].location);
        autoSetHeightWidth();
        $("#youtubeDisplay").fadeIn("fast");
        break;
    case "text":
        editor.setValue("TEST"/*downloadFromAjax(json[index].location)*/);
        $("#textDisplay").add("#lessonNavigationContainer").fadeIn("fast");
        break;
  }

    $("#instructionContainer").add("#lessonNavigationContainer").fadeIn("fast");
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


function autoSetHeightWidth(){
    var element;
    var mediaContainerHxWRatio=$mediaContainer.clientHeight/$mediaContainer.clientWidth;

    switch (json[index].type) {
        case "image":
            element=$("#imageDisplay").get(0);
            if((element.naturalHeight/element.naturalWidth) > mediaContainerHxWRatio){
                var offset=parseInt(($mediaContainer.clientWidth-element.naturalWidth*($mediaContainer.clientHeight/element.naturalHeight))/2, 10);
                $("#imageDisplay").css("left",String(offset)+"px").css("top", "0px").css("width", "").css("height", "100%");
                //$("#imageDisplay").css("width", "").css("height", "100%");
            }else{
                var offset=parseInt(($mediaContainer.clientHeight-element.naturalHeight*($mediaContainer.clientWidth/element.naturalWidth))/2, 10);
                $("#imageDisplay").css("top",String(offset)+"px").css("left","0px").css("height", "").css("width", "100%");
                //$("#imageDisplay").css("height", "").css("width", "100%");
            }
            break;
        case "video":
            element=$("#videoPlayer").get(0);
            if((element.videoHeight/element.videoWidth) > mediaContainerHxWRatio){
                var offset=parseInt(($mediaContainer.clientWidth-element.width)/2, 10);

                $("#videoDisplay").css("width", "").css("height", "100%").css("left",String(offset)+"px").css("top", "0px");
                $("#videoPlayer").css("width", "").css("height", "100%");
            }else{
                var offset=parseInt(($mediaContainer.clientHeight-element.videoHeight)/2, 10);

                $("#videoDisplay").css("height", "").css("width", "100%").css("left",String(offset)+"px").css("top", "0px");
                $("#videoPlayer").css("height", "").css("width", "100%");

                //$("#videoDisplay").css("top",String(offset)+"px").css("left","0px").css("height", "").css("width", "100%");
            }
            break;
    }
}



$(document).ready(main);

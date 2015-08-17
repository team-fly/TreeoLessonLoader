/// <reference path="../typings/jquery/jquery.d.ts"/>
var NAVIGATION_URL="navigation.html";
var MediaTypeIdNVP = {
    image: '#imageDisplay',
    video: '#videoDisplay',
    youtube: '#youtubeDisplay',
    text: '#textDisplay'
};

var dragDealerVisible=false;


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

    $('#videoPlayIcon').on('click', playVideo);

};


function loadResource(){
    //$("#loadingDisplay").fadeIn("slow");
    hideAllMediaElements();
    appendListItem("#lessonStepDropdown", json[index].title);


    $("#instructionContainer .instruction-body").html(json[index].instruction);

      switch (json[index].type) {
          case "image":
              $("#imageDisplay").load(function() {
                  $("#imageDisplay").fadeIn("fast");
                  autoSetHeightWidth();

              }).attr("src", json[index].location);
            break;
          case "video":
            $("#videoSrc").attr('src', json[index].location);
            $("#videoPlayer").get(0).load();

            $("#videoPlayer").get(0).addEventListener('loadedmetadata', function() {
                autoSetHeightWidth();
                $("#videoDisplay").fadeIn( "fast");
                $("#videoPlayIcon").show();

            });

              $('#videoPlayIcon').on('click', playVideo);

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

function playVideo(){
    $("#videoPlayIcon").fadeOut("fast");
    $("#videoPlayer").get(0).play();
}

function initiateDragDealer(){
    $("#videoSlider").show();
    dragDealerVisible=true;
    autoSetHeightWidth();
    document.getElementById('videoPlayer').pause();
    var duration=document.getElementById('videoPlayer').duration;
    new Dragdealer('videoSlider', {
        animationCallback: function(x, y) {
            document.getElementById('videoPlayer').currentTime=(x*duration).toFixed(6);
            $('#videoSliderValue').text((x*duration).toFixed(2)+"s");
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
    dragDealerVisible=false;

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
            }else{
                var offset=parseInt(($mediaContainer.clientHeight-element.naturalHeight*($mediaContainer.clientWidth/element.naturalWidth))/2, 10);
                $("#imageDisplay").css("top",String(offset)+"px").css("left","0px").css("height", "").css("width", "100%");
            }
            break;
        case "video":
            //TODO: no offset if height/width greater than container height and width
            element=$("#videoPlayer").get(0);

            var elementVideoHeight=element.videoHeight+(dragDealerVisible ? 1 : 0)*35;

            if((elementVideoHeight/element.videoWidth) > mediaContainerHxWRatio){
                var newVideoWidth=parseInt(($mediaContainer.clientHeight/elementVideoHeight)*element.videoWidth,10);
                $("#videoPlayer").css("width", String(newVideoWidth)).css("height",String($mediaContainer.clientHeight-(dragDealerVisible ? 1 : 0)*35));

                var offset=parseInt(($mediaContainer.clientWidth-newVideoWidth)/2, 10);

                $("#videoSlider").css("width", String(newVideoWidth-(dragDealerVisible ? 1 : 0)*24)).css("left", String((dragDealerVisible ? 1 : 0)*12)+"px");
                $("#videoDisplay").css("width", "").css("height", "100%");
                $("#videoDisplay").css("left",String(offset)+"px").css("top", "0px");

            }else{
                var offset;
                var newVideoHeight=parseInt(($mediaContainer.clientWidth/element.videoWidth)*elementVideoHeight,10);
                $("#videoPlayer").css("width", String($mediaContainer.clientWidth)).css("height",String(newVideoHeight));
                offset=parseInt(($mediaContainer.clientHeight-newVideoHeight-(dragDealerVisible ? 1 : 0)*35)/2, 10);
                $("#videoSlider").css("width", "100%").css("left", "0px");
                $("#videoDisplay").css("width", "100%").css("height", "");

                $("#videoDisplay").css("left","0px").css("top", String(offset)+"px");
            }
            CenterInsideDiv($("#videoPlayIcon").parent(), $("#videoPlayIcon"));
            break;
    }
}

function CenterInsideDiv(divContainer,elementToCenter) {
    var divContainerHeight = divContainer.height();
    var elementToCenterHeight = elementToCenter.outerHeight();

    var divContainerWidth = divContainer.width();
    var elementToCenterWidth = elementToCenter.outerWidth();

    var elementNewTop = divContainerHeight / 2 - elementToCenterHeight / 2;
    var elementNewLeft = divContainerWidth / 2 - elementToCenterWidth / 2;


    elementToCenter.css({ top: elementNewTop, left: elementNewLeft });
}

$(document).ready(main);

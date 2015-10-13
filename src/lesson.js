/// <reference path="../typings/jquery/jquery.d.ts"/>
var NAVIGATION_URL="navigation.php";
var MediaTypeIdNVP = {
    image: '#imageDisplay',
    video: '#videoDisplay',
    youtube: '#youtubeDisplay',
    text: '#textDisplay'
};

var dragDealerInitiated=false;

var videoPlayer;

var index=0;
var dropdownList=[];
var json=loadLessonIntoJsonObj();
var $mediaContainer;

var videoLoaded=false;
var duration;

var dragDealer;

var main =function(){
    videoPlayer=document.getElementById('videoPlayer');
    hideAllMediaElements();
    $mediaContainer=document.getElementById("mediaContainer");
    //$("#loadingDisplay").hide();
    loadResource();

    $("#btnPrev").hide();

  	$("#btnNext").click(function () {
        
        if( index>=json.length-1){
            $("#btnNext").hide();
        }else{
            index++;
            loadResource();
            $("#btnPrev").show();
        };
    });

    $("#btnPrev").click(function () {
        if(index>0){
            index--;
            loadResource();
            $("#btnNext").show();
        };

        if(index<=0){
            $("#btnPrev").hide();
        };
    });

    $('#btn-nav-home').click(function () {
      window.location.href = NAVIGATION_URL;
    });

    $("#lessonStepDropdown").on("click", "li", function() {
        index=$(this).index();
        loadResource();
    });
    
    setInterval(function(){
         if(videoLoaded && dragDealerInitiated){
            var currentTime=dragDealer.getValue()[0].toPrecision(6)*duration;
            document.getElementById('videoPlayer').currentTime=currentTime.toFixed(3);
            $('#videoSliderValue').text(currentTime.toFixed(2)+"s");
         }
    }, 50);

    dragDealer=new Dragdealer('videoSlider');

    $('#mediaContainer').click(function () {
        $('#myModal').modal('toggle');
    });

    $(".modal-wide").on("show.bs.modal", function() {
        var height = $(window).height() - 200;
        $(this).find(".modal-body").css("max-height", height);
    });

    $('#videoPlayIcon').on('click', playVideo);
    
    $('#repeat').click(function(){
        dragDealerInitiated=false;
        dragDealer.setValue(0, 0, false);
        $("#videoSlider").hide();
        autoSetHeightWidth();
        playVideo();
    });

    $('#videoPlayer').on('ended',function(){
        $("#repeat").show();
        if(!dragDealerInitiated){
            videoLoaded=true;
            initiateDragDealer();
        }
    });
    
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
            $("#repeat").hide();
            
            $("#videoSrc").attr('src', json[index].location);
            $("#videoPlayer").get(0).load();

            $("#videoPlayer").get(0).addEventListener('loadedmetadata', function() {
                $("#videoPlayIcon").show();
                autoSetHeightWidth();
                $("#videoDisplay").fadeIn( "fast");
                duration=document.getElementById('videoPlayer').duration;
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
    document.getElementById('videoPlayer').currentTime=0;
    $("#videoPlayer").get(0).play();
}

function initiateDragDealer(){
    $("#videoSlider").show();
    dragDealerInitiated=true;
    autoSetHeightWidth();
    document.getElementById('videoPlayer').pause();
    dragDealer.init();
    
}

function loadLessonIntoJsonObj(){
    var lessonLoadInfo=window.location.hash.substr(1).split("_");
    var lessonType = lessonLoadInfo[0];
    var lessonNumberIndex=parseInt(lessonLoadInfo[1])-1;
    var lessonString="lesson_"+lessonLoadInfo[1];

    return jsonMain[0][lessonType][lessonNumberIndex][lessonString];
}

function hideAllMediaElements(){
    $("#imageDisplay").hide();
    $("#videoDisplay").hide();
    $("#textDisplay").hide();
    $("#youtubeDisplay").hide();
    $("#videoSlider").hide();
    dragDealerInitiated=false;
    videoLoaded=false;
    
    $("#repeat").hide();
    
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

            var elementVideoHeight=element.videoHeight+(dragDealerInitiated ? 1 : 0)*35;

            if((elementVideoHeight/element.videoWidth) > mediaContainerHxWRatio){
                var newVideoWidth=parseInt(($mediaContainer.clientHeight/elementVideoHeight)*element.videoWidth,10);
                $("#videoPlayer").css("width", String(newVideoWidth)).css("height",String($mediaContainer.clientHeight-(dragDealerInitiated ? 1 : 0)*35));

                var offset=parseInt(($mediaContainer.clientWidth-newVideoWidth)/2, 10);
                $("#videoSlider").css("width", String(newVideoWidth));
                //$("#videoSlider").css("width", String(newVideoWidth-(dragDealerInitiated ? 1 : 0)*24)).css("left", String((dragDealerInitiated ? 1 : 0)*12)+"px");
                //$("#videoSlider").css("width", String(newVideoWidth).css("left", String((dragDealerInitiated ? 1 : 0)*12)+"px"));
                //$("#videoSlider").css("left", String((dragDealerInitiated ? 1 : 0)*12)+"px");
                //$("#videoDisplay").css("width", "").css("height", "100%");
                $("#videoDisplay").css("left",String(offset)+"px").css("top", "0px");

            }else{
                var offset;
                var newVideoHeight=parseInt(($mediaContainer.clientWidth/element.videoWidth)*elementVideoHeight,10);
                $("#videoPlayer").css("width", String($mediaContainer.clientWidth)).css("height",String(newVideoHeight));
                offset=parseInt(($mediaContainer.clientHeight-newVideoHeight-(dragDealerInitiated ? 1 : 0)*35)/2, 10);
                $("#videoSlider").css("width", "100%").css("left", "0px");
                $("#videoDisplay").css("width", "100%").css("height", "");

                $("#videoDisplay").css("left","0px").css("top", String(offset)+"px");
            }
            CenterInsideDiv($("#videoPlayIcon").parent(), $("#videoPlayIcon"));
            break;
    }
}

$(document).ready(main);

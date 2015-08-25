function getHeight(id){
    var heights = $(id).map(function() {
        return $(this).height();
    }).get(),

    height = Math.max.apply(null, heights);
    return height;
}

function downloadFromAjax(textFileUrl){
    
    $.ajax({
        url : textFileUrl,
        dataType: "text",
        success : function (data) {
             return data;
           }
    });
    
    return null;
}

function appendListItem(listId, listItemLabel){
    if(!dropdownList.hasOwnProperty(listItemLabel)){
        dropdownList[listItemLabel]=true;
        $(listId).append(sprintf('<li><a>%s</a></li>',listItemLabel));
    };
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



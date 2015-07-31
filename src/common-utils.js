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
function getLocalStorage(key) {
    var value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}

$(document).ready(function() {
    $("#selectDay").text(moment().format("dddd, MMMM Do"));

// add 9:00 to 5:00 rows to the container
    for (var i = 9; i < 18; i++) {
    
        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        var column1 = $('<div class="col-sm-2"> <p class="hour">' + timeFormat(i) + '</p>');

        var column2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add tasks here..."></textarea>`);        
       
        var column3 = $(`<div class="col-sm-2"><button class="saveButton" id=${i}><i class="fas fa-save"></i></button>`)
        
        row.append(column1);
        row.append(column2);
        row.append(column3);

        $(".container").append(row);

        getLocalStorage(i);
    }

// format hours to correspond to daily hours
    function timeFormat(hours) {
        var dayTime = hours >= 12 ? ':00 pm' : ':00 am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + dayTime;
    }
timeFormat();

function updateColors(){
        var currentTime = new Date().getHours();
        for (var i = 9; i < 18; i++) { 
         if ($(`#${i}`).data("time") == currentTime){
            $(`#text${i}`).addClass( "present");
        } else if (currentTime < $(`#${i}`).data("time")) {
            $(`#text${i}`).addClass( "future");
        }
    }
}

setInterval(function() {
    updateColors();
}, 1000);

var saveButton = $('.saveButton');
saveButton.on('click', function(){
    var eventId = $(this).attr('id');
    var eventText = $(this).parent().siblings().children('.description').val();
    localStorage.setItem(eventId, eventText);
});});
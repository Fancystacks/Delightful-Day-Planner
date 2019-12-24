function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}

$( document ).ready(function() {
    $("#selectDay").text(moment().format("dddd, MMMM Do"));

// add 9:00 to 5:00 rows to the container
    for (let i = 9; i < 18; i++) {
    
        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        var col1 = $('<div class="col-sm-2"> <p class="hour">' + timeFormat(i) + '</p>');

        var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add tasks here..."></textarea>`);        
       
        var col3 = $(`<div class="col-sm-2"><button class="saveButton" id=${i}><i class="fas fa-save"></i></button>`)
        
        row.append(col1);
        row.append(col2);
        row.append(col3);

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
    let eventId = $(this).attr('id');
    let eventText = $(this).parent().siblings().children('.description').val();
    localStorage.setItem(eventId, eventText);
});});
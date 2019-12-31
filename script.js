
$(document).ready(function () { // when the page loads, set the current time 
    $("#selectDay").text(moment().format("MMMM Do, YYYY h:mm a"));

    // add 9:00 to 5:00 rows to the container 
    for (var i = 9; i < 18; i++) {

        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        var column1 = $('<div class="col-sm-2"> <p class="hour">' + timeFormat(i) + '</p>');

        var column2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add scheduled tasks here . . ."></textarea>`);

        var column3 = $(`<div class="col-sm-2"><button class="saveButton" id=${i}><i class="fas fa-save"></i></button>`)

        row.append(column1);
        row.append(column2);
        row.append(column3);

        $(".container").append(row);

        // getLocalStorage(i);
        var value = localStorage.getItem(i);
        if (value) {
            $(`#text${i}`).text(value);
            $(`#text${i}`).css("color", "limegreen");
            $(`#text${i}`).css("font-weight", "bold");
        }
    }

        // format hours to correspond to daily hours
        function timeFormat(hours) {
            var dayTime = hours >= 12 ? ':00 pm' : ':00 am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            return hours + dayTime;
        }
        timeFormat();

        // when the buttons are clicked, save the text to localstorage and change the color
        var saveButton = $('.saveButton');
        saveButton.on('click', function () {
            var savedColor = 'red';
            var eventId = $(this).attr('id');
            var eventText = $(this).parent().siblings().children('.description').val().trim();
            localStorage.setItem(eventId, eventText);
            console.log(localStorage.getItem(eventId));
            localStorage.setItem("savedColor", savedColor);
        });

        // magical aesthetic hovering effect
        var description = $('.description');
        description.on('mouseenter', function () {
            $(this).css("background-color", "#967BB6");
        });
        description.on('mouseleave', function () {
            $(this).css("background-color", "white");
        });

    });
let mealId;
let mealsCount = []

$("#meal4").click(function () {
    mealId = 4;
    $("#basic-steps").steps("next");
    $(function () {
        loadDays()
    });
});

$("#meal6").click(function () {
    mealId = 6;
    $("#basic-steps").steps("next");
    $(function () {
        loadDays()
    });

});

$("#meal10").click(function () {
    mealId = 10;
    $("#basic-steps").steps("next");
    $(function () {
        loadDays()
    });
});

$("#meal12").click(function () {
    mealId = 12;
    $("#basic-steps").steps("next");
    $(function () {
        loadDays()
    });
});

loadDays = () => {
    console.log("I am called here ")
    let today = moment().isoWeekday();
    let nextMonday = countMonday(today)
    createList(nextMonday)
}


$(".add-button").bind("click", function () {
    title = $(this).closest(".card").data("title");
    titleImage = $(this).closest(".card").find("img").attr("src");
    appendCart(title, titleImage)
    clearItem()
});

appendCart = (title, image) => {
    let mealCount = mealId--
    console.log(mealCount)
    container = '<div class="col-md-2 d-flex justify-content-center p-0"> <img src="' + image + '" class=w-100></div> <div class="col-md-8 d-flex justify-content-center p-1"<h2 class="title">' + title + '</h2></div><div class= "col-md-2 d-flex justify-content-center p-0"><button class="btn btn-clear" id="clearItem">X</button></div>'
    $("#selectedRow").append(container)
    $("#mealAlert").text('Add' + ' ' + mealCount + ' ' + 'more meals');
    if (mealCount <= 0) {
        $("#mealAlert").text('no more meals');
        $("#submitCart").className = "enabled"
    }
}


clearItem = () => {

    $(".btn-clear").bind("click", function () {
        $(this).closest(".append-list").remove();
    });
}


createList = (monday) => {

    var template = $(".template_master");
    template.className = "list-group"
    item = template.prepend('<div class="list-item list-group"></div>');
    $(".list-item").attr("id", "item");
    $(".list-item").prepend('<li class="date-item border mx-2 list-group-item">' + monday + '</li>');
    let dayCount = 2

    for (let i = 0; i < 11; i++) {
        appendLIst = '<li class="date-item border mx-2 list-group-item">' + moment().add(1, 'weeks').isoWeekday(dayCount).format("dddd, MMMM Do") + '</li>';
        dayCount++
        $(".list-item").append(appendLIst);
    }

    listItemListners()
}

listItemListners = () => {
    $("#next-button").ready(function () {
        $(':input[type="submit"]').prop('disabled', true);
    });

    $("#item").on("click", function (e) {
        selectedDate = e.target.textContent
        e.target.className = "active"
        if (selectedDate) {
            $("#next-button").ready(function () {
                $(':input[type="submit"]').prop('disabled', false);
            });
        }
    });

    $("#next-button").bind("click", function () {
        $("#basic-steps").steps("next");
        $("#delivery-date").append(selectedDate)
    });
}



countMonday = (today) => {
    let dayINeed = 1;
    if (today <= dayINeed) {
        return moment().isoWeekday(dayINeed);
    } else {
        return moment().add(1, 'weeks').isoWeekday(dayINeed).format("dddd, MMMM Do");
    }
}
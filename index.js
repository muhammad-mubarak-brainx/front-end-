var mealId;
var price;
const deliveryCharges = 5.99;
var mealArray = {}


$("#meal4").click(function () {
    mealId = 4;
    price = $(this).closest("div").data("price")
    $("#basic-steps").steps("next");
    $(function () {
        loadDays()
    });
});

$("#meal6").click(function () {
    mealId = 6;
    price = $(this).closest("div").data("price")
    $("#basic-steps").steps("next");
    $(function () {
        loadDays()
    });

});

$("#meal10").click(function () {
    mealId = 10;
    price = $(this).closest("div").data("price")
    $("#basic-steps").steps("next");
    $(function () {
        loadDays()
    });
});

$("#meal12").click(function () {
    mealId = 12;
    price = $(this).closest("div").data("price")
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

mealCount = 0;
$(".add-button").bind("click", function () {
    title = $(this).closest(".card").data("title");
    titleImage = $(this).closest(".card").find("img").attr("src");
    mealsCounter(title, titleImage)
    appendCart(title, titleImage);
    mealCount++;
    console.log(mealCount);
    if (mealCount === mealId) {
        $("#mealAlert").text('All Set');
        $('#submitCart').prop('disabled', false);
    }
    else {
        if ((mealId - mealCount) > 0) {
            $("#mealAlert").text('Add' + ' ' + (mealId - mealCount) + ' ' + 'more meals');
        }
        else {
            $("#mealAlert").text('Remove' + ' ' + Math.abs(mealId - mealCount) + ' ' + 'meals');
        }
        $('#submitCart').prop('disabled', true);
    }
});

appendCart = (title, image) => {
    container = ' <div class="row d-flex append-list"><div class="col-md-2 d-flex justify-content-center p-0"> <img src="' + image + '" class="w-100" style="object-fit:cover"></div> <div class="col-md-8 d-flex justify-content-center p-1"<h2 class="title">' + title + '</h2></div><div class= "col-md-2 d-flex justify-content-center p-0"><button class="btn btn-clear">X</button></div></div>'
    $("#col-second").append(container);
}

// cartFooter = () => {
// footer = '<footer class="DrawerFooter-module__drawerFooter___3rxU2 w-100 px-2 px-md-3"><div class="row"><div class="DrawerFooter-module__instructionalCol___2kGEg d-none d-md-flex justify-content-between mb-2 py-2 col">        <button type="button" class="ClearAllBtn-module__clearAllBtn___2n7rl d-inline-block flex-shrink-0 py-0 px-2 px-md-0 text-uppercase text-decoration-none float-right btn btn-link"> clear all </button></div></div></footer>'
// $("#col-second").append(footer);
// }

mealsCounter = (title, titleImage) => {

    if (Object.keys(mealArray).includes(title)) {
        count = mealArray[title].count
        console.log(count)
        mealArray[title] = { count: count + 1, titleImage: titleImage }
    } else {
        mealArray[title] = { count: 1, titleImage: titleImage }
    }
}


$("body").on('click', ".btn-clear", function () {
    mealCount--;
    $(this).closest(".append-list").remove();
    if ((mealCount - mealId) == 0) {
        count = mealArray[title].count
        mealArray[title] = { count: count - 1, titleImage: titleImage }
        $("#mealAlert").text('All Set');
        $('#submitCart').prop('disabled', false);
    } else {
        if ((mealCount - mealId) < 0) {
            count = mealArray[title].count
            mealArray[title] = { count: count - 1, titleImage: titleImage }
            $("#mealAlert").text('Add' + ' ' + Math.abs(mealCount - mealId) + ' ' + 'meals');
            $('#submitCart').prop('disabled', true);

        } else {
            count = mealArray[title].count
            mealArray[title] = { count: count - 1, titleImage: titleImage }
            $("#mealAlert").text('Remove' + ' ' + Math.abs(mealCount - mealId) + ' ' + 'meals');
            $('#submitCart').prop('disabled', true);
            console.log(mealArray)
        }
    }
});


$("body").on('click', ".next-btn", function () {
    let today = moment().isoWeekday();
    let nextMonday = countMonday(today)
    let dayCount = 2
    $("#basic-steps").steps("next");
    $(".delivery-day").append($('<option>', {
        value: 0,
        text: nextMonday
    }));

    for (let i = 1; i <= 11; i++) {
        $(".delivery-day").append($('<option>', {
            value: i,
            text: moment().add(1, 'weeks').isoWeekday(dayCount).format("dddd, MMMM Do")
        }));
        dayCount++
    }
    appendPriceList()
    appendMyMeals()
});

appendPriceList = () => {
    totalPrice = mealId * price
    console.log(totalPrice)
    let mealList = '<div class="float-left text-secondary">' + mealId + ' ' + 'Meals Per Week' + '</div> <div class="float-right">' + '$' + totalPrice + '</div>'
    $("#mealPrice").append(mealList)
    let todayTotal = ' <div class="float-right font-weight-500">' + '$' + (totalPrice + deliveryCharges) + '</div>'
    $("#todayTotal").append(todayTotal)

}

appendMyMeals = () => {
    for (const key in mealArray) {
        let myMealsList = '<li class="px-0 flex-shrink-0 list-group-item"><figure class="my-meals-item d-flex align-items-center mb-0"><div class="font-weight-500 text-center ml-2">' + mealArray[title].count + '</div><div> <img src="' + mealArray[title].titleImage + '"class="img-wrapper" ></div><div class="info-wrapper pl-4 pr-4 col">' + key + '</div></figure></li>'
        console.log(myMealsList)
        $("#checkoutMyMeals").append(myMealsList)
    }

}

createList = (monday) => {

    var template = $(".template_master");
    template.className = "list-group"
    item = template.prepend('<div class="list-item list"></div>');
    $(".list").attr("id", "item");
    $(".list").prepend('<li class="list-group-item">' + monday + '</li>');
    let dayCount = 2

    for (let i = 0; i < 11; i++) {
        appendLIst = '<li class="list-group-item">' + moment().add(1, 'weeks').isoWeekday(dayCount).format("dddd, MMMM Do") + '</li>';
        dayCount++
        $(".list").append(appendLIst);
    }

    listItemListners()
}

listItemListners = () => {
    $("#next-button").ready(function () {
        $(':input[type="submit"]').prop('disabled', true);
    });

    $("#item").on("click", function (e) {
        selectedDate = e.target.textContent
        e.target.className = "list-group-item active-list"
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
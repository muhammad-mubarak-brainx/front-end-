var mealPlan;
var price;
mealCount = 0;
const deliveryCharges = 5.99;
var mealArray = {}


$(".btn-meal-plan").click(function () {
    mealPlan = $(this).closest(".plan-card").data("meal-plan")
    price = $(this).closest(".plan-card").data("price")
    $("#freshly-steps").steps("next");
    $(function () {
        loadDays()
    });
});

loadDays = () => {
    let today = moment().isoWeekday();
    let nextMonday = countMonday(today)
    createList(nextMonday)
}


$("body").on('click', ".add-button", function () {
    title = $($(this).closest(".card").find(".title")[0]).text();
    titleImage = $(this).closest(".card").find("img").attr("src");
    mealsCounter(title, titleImage)
    appendCart(title, titleImage);
    mealCount++;
    if (mealCount === mealPlan) {
        $("#mealAlert").text('All Set');
        $('#submitCart').prop('disabled', false);
    }
    else {
        if ((mealPlan - mealCount) > 0) {
            $("#mealAlert").text('Add' + ' ' + (mealPlan - mealCount) + ' ' + 'more meals');
        }
        else {
            $("#mealAlert").text('Remove' + ' ' + Math.abs(mealPlan - mealCount) + ' ' + 'meals');
        }
        $('#submitCart').prop('disabled', true);
    }
});

appendCart = (title, image) => {
    container = ' <div class="row d-flex append-list"><div class="col-md-2 d-flex justify-content-center p-0"> <img src="' + image + '" class="w-100" style="object-fit:cover"></div> <div class="col-md-8 d-flex justify-content-center p-1"<h2 class="title">' + title + '</h2></div><div class= "col-md-2 d-flex justify-content-center p-0"><button class="btn btn-clear">X</button></div></div>'
    $("#cart-second-col").append(container);
    $(".cart-footer-counter").text((mealCount + 1) + '/' + mealPlan)
}

mealsCounter = (title, titleImage) => {

    if (Object.keys(mealArray).includes(title)) {
        count = mealArray[title].count
        mealArray[title] = { count: count + 1, titleImage: titleImage }
    } else {
        mealArray[title] = { count: 1, titleImage: titleImage }
    }
}


$("body").on('click', ".btn-clear", function () {
    mealCount--;
    $(this).closest(".append-list").remove();
    $(".cart-footer-counter").text(mealCount + '/' + mealPlan)
    if ((mealCount - mealPlan) == 0) {
        count = mealArray[title].count
        mealArray[title] = { count: count - 1, titleImage: titleImage }
        $("#mealAlert").text('All Set');
        $('#submitCart').prop('disabled', false);
    } else {
        if ((mealCount - mealPlan) < 0) {
            count = mealArray[title].count
            mealArray[title] = { count: count - 1, titleImage: titleImage }
            $("#mealAlert").text('Add' + ' ' + Math.abs(mealCount - mealPlan) + ' ' + 'meals');
            $('#submitCart').prop('disabled', true);

        } else {
            count = mealArray[title].count
            mealArray[title] = { count: count - 1, titleImage: titleImage }
            $("#mealAlert").text('Remove' + ' ' + Math.abs(mealCount - mealPlan) + ' ' + 'meals');
            $('#submitCart').prop('disabled', true);
        }
    }
});


$("body").on('click', ".next-btn", function () {
    let today = moment().isoWeekday();
    let nextMonday = countMonday(today)
    let dayCount = 2
    $("#freshly-steps").steps("next");
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
    totalPrice = mealPlan * price
    let mealList = '<div class="float-left text-secondary cart-custom-font">' + mealPlan + ' ' + 'Meals Per Week' + '</div> <div class="float-right cart-custom-font">' + '$' + totalPrice + '</div>'
    $("#mealPrice").append(mealList)
    let todayTotal = ' <div class="float-right font-weight-500 total-price">' + '$' + (totalPrice + deliveryCharges) + '</div>'
    $("#todayTotal").append(todayTotal)

}

appendMyMeals = () => {
    for (const key in mealArray) {
        let myMealsList = '<li class="px-0 flex-shrink-0 list-group-item"><figure class="my-meals-item d-flex align-items-center mb-0"><div class="font-weight-500 text-center ml-2">' + mealArray[key].count + '</div><div> <img src="' + mealArray[key].titleImage + '"class="img-wrapper" ></div><div class="info-wrapper pl-4 pr-4 col custom-font-cart-list">' + key + '</div></figure></li>'
        $(".check-out-meals").append(myMealsList)
    }

}

$("body").on('click', ".btn-link", function () {
    $("#cart-second-col").empty()
    $("#mealAlert").text('Add' + ' ' + mealPlan + ' ' + 'meals');
    mealCount = 0
    mealArray = {}
    $(".cart-footer-counter").text(mealCount + '/' + mealPlan)
})

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
        $('.list-group-item').removeClass('active-list');
        e.target.className = "list-group-item active-list"
        if (selectedDate) {
            $("#next-button").ready(function () {
                $(':input[type="submit"]').prop('disabled', false);
            });
        }
    });

    $("#next-button").bind("click", function () {
        $("#freshly-steps").steps("next");
        $("#delivery-date").append(selectedDate)
        fetchMeals()
    });
}


fetchMeals = () => {
    let meals = mealCards();
    for (let i = 0; i < meals.length; i++) {
        cardTemplate(meals[i])
    }

    $(".cart-footer-counter").text(mealCount + '/' + mealPlan)
}


mealCards = () => {

    let arrayOfItems = [
        {
            title: "STEAK PEPPERCORN",
            sub: "with Sautéed Carrots & French Green Beans",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1602724105/production-meal-image-57e49562-348b-42f2-9ca6-9f40a95c8395.jpg",
        },
        {
            title: "CAULIFLOWER SHELL BEEF",
            sub: "with Nonna’s Soffritto & Italian Cheeses",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1607770959/production-meal-image-7a62bb89-9bcb-4f1f-9f0f-d8372698d48e.jpg",
        },
        {
            title: "PROTEIN-PACKED CHICKEN",
            sub: "with Mozzarella & Garlicky Broccoli",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1602723110/production-meal-image-0a78bae3-2e0c-4ab7-b420-154ed262d4d0.jpg",
        },
        {
            title: "HOMESTYLE CHICKEN",
            sub: "with Masterful Mac & Cheese",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1602721634/production-meal-image-8771fb54-2c23-4063-8007-f5024df074c2.jpg",
        },
        {
            title: "SAUSAGE & PEPPERS",
            sub: "with Carb Swap Cauliflower Rice",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1602723731/production-meal-image-2b1d9d32-e0de-44b4-a2c5-9c7fa22203d5.jpg",
        },
        {
            title: "ZINGY BUFFALO CHICKEN",
            sub: "with Loaded Cauliflower",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1602722020/production-meal-image-1a05b254-2fc5-4eec-9cec-5b1cde753c06.jpg",
        },
        {
            title: "SIERRA CHICKEN BOWL",
            sub: "with Cilantro-Lime Sauce",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1605813866/production-meal-image-1eab0dae-fb76-4485-9b1b-eaa125cae6c6.jpg",
        },
        {
            title: "OLÉ CHICKEN & SMOKY CHILE SAUCE",
            sub: "with Veggie Sauté & Sofrito Rice",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1602724174/production-meal-image-13231efa-1905-40d4-aca2-208524d1dab1.jpg",
        },
        {
            title: "SAUSAGE BAKED PENNE",
            sub: "with Sautéed Zucchini & Spinach",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1602723731/production-meal-image-2b1d9d32-e0de-44b4-a2c5-9c7fa22203d5.jpg",
        },
        {
            title: "CHICKEN LIVORNO",
            sub: "with Hearty White Beans & Kale",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1602723731/production-meal-image-2b1d9d32-e0de-44b4-a2c5-9c7fa22203d5.jpg",
        },
        {
            title: "WHITE BEAN TURKEY CHILI",
            sub: "with Cilantro-Lime Rice",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1602722020/production-meal-image-1a05b254-2fc5-4eec-9cec-5b1cde753c06.jpg",
        },
        {
            title: "DUE SOUTH BBQ BEEF",
            sub: "with Masterful Mac & Cheese",
            image:
                "https://res.cloudinary.com/freshly/image/upload/c_scale,w_640/c_crop,h_341,w_512/v1605813866/production-meal-image-1eab0dae-fb76-4485-9b1b-eaa125cae6c6.jpg",
        },
    ];

    return arrayOfItems

}

cardTemplate = (mealList) => {
    let body = document.getElementById('cardMeals');
    template = document.getElementById("cartMeal")
    template.content.getElementById("title").textContent = mealList.title;
    template.content.getElementById("subtitle").textContent = mealList.sub
    template.content.getElementById("imageCard").src = mealList.image
    clone = template.content.cloneNode(true)
    body.appendChild(clone)
}

countMonday = (today) => {
    let dayINeed = 1;
    if (today <= dayINeed) {
        return moment().isoWeekday(dayINeed);
    } else {
        return moment().add(1, 'weeks').isoWeekday(dayINeed).format("dddd, MMMM Do");
    }
}
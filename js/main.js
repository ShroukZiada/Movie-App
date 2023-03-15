/***************************Start_Sid_Nav****************************************/
(function sideNav() {
    let sideNavContainer = $("#sideNav"),
        sideNaveBtn = $("#sideNaveBtn"),
        sideNav = $(".side_nav"),
        sideNavWidth = sideNav.innerWidth();
    sideNavContainer.animate({ left: `-${sideNavWidth}` }, 0);
    sideNaveBtn.click(() => {
        let openIcon = $("#openIcon"),
            closeIcon = $("#closeIcon");
        if (sideNavContainer.css("left") == "0px") {
            sideNavContainer.animate({ left: `-${sideNavWidth}` }, 500);
            openIcon.css("display", "block");
            closeIcon.css("display", "none");
        } else {
            sideNavContainer.animate({ left: `0px` }, 500);
            openIcon.css("display", "none");
            closeIcon.css("display", "block");
        }
        ItemAnimation();
    });
})();

/***************************Start-ANimation-Item*********************************/
function ItemAnimation() {
    if ($("#sideNav li ,a").css("margin-top") == "30px") {
        $("#nowPlaying").animate({ marginTop: "200px", opacity: "0" }, 300);
        $("#popular").animate({ marginTop: "200px", opacity: "0" }, 400);
        $("#topRated").animate({ marginTop: "200px", opacity: "0" }, 500);
        $("#trending").animate({ marginTop: "200px", opacity: "0" }, 600);
        $("#upcoming").animate({ marginTop: "200px", opacity: "0" }, 700);
        $("#contactUs").animate({ marginTop: "200px", opacity: "0" }, 800);

    } else {
        $("#nowPlaying").animate({ marginTop: "30px", opacity: "1" }, 300);
        $("#popular").animate({ marginTop: "30px", opacity: "1" }, 450);
        $("#topRated").animate({ marginTop: "30px", opacity: "1" }, 600);
        $("#trending").animate({ marginTop: "30px", opacity: "1" }, 750);
        $("#upcoming").animate({ marginTop: "30px", opacity: "1" }, 850);
        $("#contactUs").animate({ marginTop: "30px", opacity: "1" }, 1050);

    }
}
/***************************End-ANimation-Item**********************************/

/***************************End_Sid_Nav****************************************/

/***************************Start_GetData****************************************/

let myData = [];
(async function() {
    let myFetch = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
    );
    myData = await myFetch.json();
    myData = myData.results;
    // console.log(myData)
    displayGetData();
})();

function displayGetData() {
    let myShowData = ``;
    for (let i = 0; i < myData.length; i++) {
        myShowData += `<div class="col-md-6  col-lg-4 p-3">
                        <div class="movie_img   position-relative overflow-hidden rounded">
                            <img src="https://image.tmdb.org/t/p/w500${myData[i].poster_path}" alt="" class="img-fluid">
                            <div class="movie_img_layer animate__rollIn position-absolute  px-2 d-flex text-center align-content-center justify-content-center flex-column">
                                <h2 class="py-2 p">${myData[i].original_title}</h2>
                                <p class="py-2 ">${myData[i].overview}</p>
                                <h6 class="py-2 ">${myData[i].release_date}</h6>
                            </div>
                            <div class="movie_rate position-absolute  movie_img_rate  bg-warning p-1  text-center">
                                <p class="mt-2 fadeIn">${myData[i].vote_average}</p>
                            </div>
                        </div>
                    </div>
                    
        `;
        // console.log(myShowData);
        $("#moviesContainer").html(myShowData);
    }
}
/***************************End_GetData*************************************************/

/***************************Start_GetSideBar_Data****************************************/

$(".side_nav li").click(GetSideData);
async function GetSideData() {
    let mtFetch = await fetch(
        `https://api.themoviedb.org/3/${this.getAttribute(
      "value"
    )}?api_key=b89715e1ca656af240e66753d625230f&language=en-US&page=1`
    );
    myData = await mtFetch.json();
    myData = myData.results;
    displayGetData();
}
/***************************End_GetSideBar_Data******************************************/

/***************************End_GetSideBar_Data******************************************/

/***************************Start_Search************************************************/

$("#searchInput").keyup(function() {
    let mySearchWord = $("#searchInput").val();
    if (mySearchWord !== "") {
        search(mySearchWord);
    } else {
        checkSearchValue();
    }
});

async function search(searchWord) {
    let myfetch = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=b89715e1ca656af240e66753d625230f&language=en-US&page=1&query=${searchWord}`
    );
    let SearchResults = await myfetch.json();
    SearchResults = SearchResults.results;
    let mySearchResults = ``;
    for (let i = 0; i < SearchResults.length; i++) {
        mySearchResults += `<div class="col-md-4 p-3">
                        <div class="movie_img   position-relative overflow-hidden rounded">
                            <img src="https://image.tmdb.org/t/p/w500${SearchResults[i].poster_path}" alt="" class="img-fluid">
                            <div class="movie_img_layer animate__rollIn position-absolute  px-2 d-flex text-center align-content-center justify-content-center flex-column">
                                <h2 class="py-2 p">${SearchResults[i].original_title}</h2>
                                <p class="py-2 ">${SearchResults[i].overview}</p>
                                <h6 class="py-2 ">${SearchResults[i].release_date}</h6>
                            </div>
                            <div class="movie_rate position-absolute  movie_img_rate  bg-warning p-1  text-center">
                                <p class="mt-2 fadeIn">${SearchResults[i].vote_average}</p>
                            </div>
                        </div>
                    </div>  
        `;
    }

    $("#moviesContainer").html(mySearchResults);
}

function checkSearchValue() {
    let searchInputValue = $("#searchInput").val();
    if (searchInputValue == "") {
        (async function() {
            let myFetch = await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
            );
            myData = await myFetch.json();
            myData = myData.results;
            displayGetData();
        })();
    }
}

$("#searchInput").blur(checkSearchValue);

/***************************End_Search************************************************************/

/***************************Start_Validation************************************************************/

$("#nameInput").blur(nameValidation);

function nameValidation() {
    let nameRegex =
        /^([a-z]+ ?[A-Z]+)$|^([A-Z]+ ?[a-z]+)$|^([a-z]+ ?[a-z]+)$|^([A-Z]+ ?[A-Z]+)$|^([A-Z]+[a-z]+ ?[A-Z]+[a-z]+)$|^([a-z]+[A-Z]+ ?[a-z]+[A-Z]+)$/;
    if (nameRegex.test($("#nameInput").val()) == true) {
        $("#nameInput").addClass("is-valid");
        $("#nameInput").removeClass("is-invalid");
        return true;
    } else {
        $("#nameInput").addClass("is-invalid");
        $("#nameInput").removeClass("is-valid");
        $("#nameAlert").fadeIn(700, function() {
            $("#nameAlert").delay(3000).fadeOut(700);
        });
        return false;
    }
}

$("#emailInput").blur(emailValidation);

function emailValidation() {
    let emailRegex = /^[a-z0-9_]+@[a-z0-9]+\.[a-z]{2,15}$/;
    if (emailRegex.test($("#emailInput").val()) == true) {
        $("#emailInput").addClass("is-valid");
        $("#emailInput").removeClass("is-invalid");
        return true;
    } else {
        $("#emailInput").addClass("is-invalid");
        $("#emailInput").removeClass("is-valid");
        $("#emailAlert").fadeIn(700, function() {
            $("#emailAlert").delay(3000).fadeOut(700);
        });
        return false;
    }
}

$("#phoneInput").blur(phoneValidation);

function phoneValidation() {
    let phoneRegex = /^(\+2|002)?01[0125][0-9]{8}$/;
    if (phoneRegex.test($("#phoneInput").val()) == true) {
        $("#phoneInput").addClass("is-valid");
        $("#phoneInput").removeClass("is-invalid");
        return true;
    } else {
        $("#phoneInput").addClass("is-invalid");
        $("#phoneInput").removeClass("is-valid");
        $("#phoneAlert").fadeIn(700, function() {
            $("#phoneAlert").delay(3000).fadeOut(700);
        });
        return false;
    }
}

$("#ageInput").blur(ageValidation);

function ageValidation() {
    let ageRegex = /^[1-9][0-9]$/;
    if (ageRegex.test($("#ageInput").val()) == true) {
        $("#ageInput").addClass("is-valid");
        $("#ageInput").removeClass("is-invalid");
        return true;
    } else {
        $("#ageInput").addClass("is-invalid");
        $("#ageInput").removeClass("is-valid");
        $("#ageAlert").fadeIn(700, function() {
            $("#ageAlert").delay(3000).fadeOut(700);
        });
        return false;
    }
}

$("#passwordInput").blur(passwordValidation);

function passwordValidation() {
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (passwordRegex.test($("#passwordInput").val()) == true) {
        $("#passwordInput").addClass("is-valid");
        $("#passwordInput").removeClass("is-invalid");
        return true;
    } else {
        $("#passwordInput").addClass("is-invalid");
        $("#passwordInput").removeClass("is-valid");
        $("#passwordAlert").fadeIn(700, function() {
            $("#passwordAlert").delay(3000).fadeOut(700);
        });
        return false;
    }
}

$("#repasswordInput").blur(rePasswordValidation);

function rePasswordValidation() {
    if ($("#repasswordInput").val() == $("#passwordInput").val()) {
        $("#repasswordInput").addClass("is-valid");
        $("#repasswordInput").removeClass("is-invalid");
        return true;
    } else {
        $("#repasswordInput").addClass("is-invalid");
        $("#repasswordInput").removeClass("is-valid");
        $("#rePasswordAlert").fadeIn(700, function() {
            $("#rePasswordAlert").delay(3000).fadeOut(700);
        });
        return false;
    }
}

(function() {
    $("#sendBtn").prop("disabled", true);
})(); // deactive button onload

$("#contact input").blur(checkFormIsReady);

function checkFormIsReady() {
    // active button
    if (
        nameValidation() == true &&
        emailValidation() == true &&
        phoneValidation() == true &&
        ageValidation() == true &&
        passwordValidation() == true &&
        rePasswordValidation() == true
    ) {
        $("#sendBtn").prop("disabled", false);
        $("#sendBtn").removeClass("btn-outline-danger");
        $("#sendBtn").addClass("btn-outline-success");
    } else {
        $("#sendBtn").prop("disabled", true);
    }
}

$("#sendBtn").click(() => {
    //send contact info

    $("#contact input").val("");
    $("#sendBtn").removeClass("btn-outline-success");
    $("#sendBtn").addClass("btn-outline-danger");
    $("#nameInput").removeClass("is-valid");
    $("#emailInput").removeClass("is-valid");
    $("#phoneInput").removeClass("is-valid");
    $("#ageInput").removeClass("is-valid");
    $("#passwordInput").removeClass("is-valid");
    $("#repasswordInput").removeClass("is-valid");
    $("#sendBtn").prop("disabled", true);
});

/*****************************End_t_Form_Validation************************************************************/

/*****************************start-accordionBox************************************************************/

$(".questionsBx").click(function() {
    if ($(this).next(".answerBx").hasClass("active")) {
        $(this).children("span").removeClass("fa-x").addClass("fa-plus");
        $(this).next(".accordionBox .answerBx").removeClass("active").slideUp();
    } else {
        $(".answerBx").removeClass("active").slideUp();
        $(".questionsBx span").removeClass("fa-x").addClass("fa-plus");

        $(this).next(".accordionBox .answerBx").addClass("active").slideDown();
        $(this).children("span").removeClass("fa-plus").addClass("fa-x");
    }
});

/*****************************start-accordionBox************************************************************/

/*****************************start-signup************************************************************/

let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let signinPassword = document.getElementById("signinPassword");
let signinEmail = document.getElementById("signinEmail");

let signupArray;

//lw el user da5l 3nd
if (localStorage.getItem('users') == null) {
    signupArray = [];
} else {
    signupArray = JSON.parse(localStorage.getItem('users'));
}

//lw el user 3ndo account
function hasAccount() {
    if (localStorage.getItem('users') == null) {
        return false;
    }
}

function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3"> All inputs are required </span>'
        return false
    }
    let signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };

    if (signupArray.length == 0) {
        signupArray.push(signUp);
        localStorage.setItem('users', JSON.stringify(signupArray))
        document.getElementById('exist').innerHTML = `<span class="text-success m-3">sucsess</span>`

        return true;
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = `<span class="text-danger m-3">Email already exist</span>`
    } else {
        signupArray.push(signUp);
        localStorage.setItem('users', JSON.stringify(signupArray))
        document.getElementById('exist').innerHTML = `<span class="text-success m-3">sucsess</span>`;
    }
}

function isEmpty() {
    if (signupEmail.value == "" || signupName.value == "" || signupPassword.value == "") {
        return false;
    } else {
        return true
    }
}

function isEmailExist() {
    for (let i = 0; i < signupArray.length; i++) {
        if (signupArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false;
        } else {
            return true;
        }
    }
}


function login() {
    if (hasAccount() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">you dont have account please signUp  </span>'
        return false
    }

    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">you dont have account please signUp  </span>'
        return false
    }
    let email = signinEmail.value
    let password = signinPassword.value


    for (let i = 0; i < signupArray.length; i++) {
        if (signupArray[i].email.toLowerCase() == email.toLowerCase() && signupArray[i].password.toLowerCase() == password.toLowerCase()) {
            location.href = "./Home.html";
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">email or password is correct </span>'

        }
    }
}

function isLoginEmpty() {
    if (signinPassword.value == "" || signinEmail.value == "") {
        return false;
    } else {
        return true;
    }
}
let logOutBtn = document.getElementById('logout');


function logOut() {
    //if want delete account ..
    // localStorage.removeItem('users');
    location.href = "index.html";
}
/*****************************end-signup************************************************************/
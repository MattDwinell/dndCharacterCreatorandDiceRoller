$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyCfx7JuJ4eEZIpbbgNmvNPTOkPUDuIVyyo",
        authDomain: "dndcharcreator-2c7a2.firebaseapp.com",
        databaseURL: "https://dndcharcreator-2c7a2.firebaseio.com",
        projectId: "dndcharcreator-2c7a2",
        storageBucket: "dndcharcreator-2c7a2.appspot.com",
        messagingSenderId: "427842856156",
        appId: "1:427842856156:web:71475bda7a01b447"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    database = firebase.database();
    console.log('this working');
    var messageCount = 1;





    //on click events
    $("#char-view").on("click", viewChar);
    function viewChar() {
        console.log('this working');
    }
    $("#char-create").on("click", makeChar);
    function makeChar() {
        console.log('this working');
    }
    $("#dice").on("click", genDice);
    function genDice() {
        console.log('this working');
        window.location.href = "./dice.html";
    }
    $(".return").on("click", mainPage);
    function mainPage() {
        window.location.href = "./index.html";
    }
    $("#d4").on("click", rollDie);
    $("#d6").on("click", rollDie);
    $("#d8").on("click", rollDie);
    $("#d10").on("click", rollDie);
    $("#d12").on("click", rollDie);
    $("#d20").on("click", rollDie);
    $("#d100").on("click", rollDie);




    function rollDie(element) {
        showDie();
        var numOfDice = parseInt($("#num-of-dice").val().trim());
        console.log(numOfDice);
        if ( !numOfDice){
            numOfDice = 1;
        }
        console.log(numOfDice);
        document.getElementById('num-of-dice').value = 1;
        console.log(numOfDice);
        var diceSize = element.target.id;
        var diceNum = parseFloat(diceSize.substr(1));
        console.log(diceNum);
        var dieRoll = Math.ceil(Math.random() * diceNum);
        console.log(dieRoll);
        rollDisplay(diceNum, dieRoll, numOfDice);
    }

    function rollDisplay(maxNum, ActualNum, numDice) {
        console.log(maxNum,ActualNum, numDice)
        if(numDice == 1 || numDice == 0){
        var rollMessage = $("<p>").text('rolled a(n) ' + ActualNum + ' using a d' + maxNum).attr("class", "roll-message");
        $("#roll-holder").prepend(rollMessage);
        } else {
            for(let i=1; i<numDice; i++){
                ActualNum += Math.ceil(Math.random()*maxNum);
            }
            console.log(ActualNum);
            var rollMessage = $("<p>").text('rolled a(n) ' + ActualNum + ' using ' + numDice  + " d" + maxNum +"s").attr("class", "roll-message");
        $("#roll-holder").prepend(rollMessage);
        }
        messageCount++;
        rollScrubber();
    }
    function rollScrubber() {

        if (messageCount > 7) {
            var dialogBox = document.getElementById("roll-holder");
            dialogBox.removeChild(dialogBox.childNodes[8]);
        }
    }
    function showDie() {
        console.log('die being shown');
        $("#dicePic").attr("src", "./images/moving_d20.gif");
        setTimeout(stillDie, 1000);
    }
    function stillDie() {
        $("#dicePic").attr("src", "./images/d20_still_2.png");
    }













    //firebase authentication stuff:
    $("#sign-in").on("click", function (event) {
        event.preventDefault();
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        console.log(email, password);
        if (!email || !password) {
            $("#sign-in-message").text("please input both email and password to sign in, or create one by registering an account.");
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                console.log(error, error.message);
                $("#sign-in-message").text(error.message);
            });
        }
    })

    $("#register").on("click", function (event) {
        event.preventDefault();
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        console.log(email, password);
        if (!email || !password) {
            $("#sign-in-message").text("please input both email and password to sign in, or create one by registering an account.");
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                $("#sign-in-message").text(error.message);
            });
        }
    })


    $(".sign-out").on("click", function () {
        firebase.auth().signOut();
    })








    //firebase on user login stuff
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $("#welcome-banner").text("Welcome to the Character Creator, " + user.email + "!");
            $(".welcome").text("Welcome to the Dice Roller, " + user.email);

            console.log(user, user.email);
            $("#sign-in-wrapper").css("display", "none");
            $("#app-wrapper").css("display", "block");
        } else {
            console.log("test");
            $("#sign-in-wrapper").css("display", "block");
            $("#app-wrapper").css("display", "none");
        }
    })









})


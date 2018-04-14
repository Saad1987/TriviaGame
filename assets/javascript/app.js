$(document).ready(function () {

    function getRandNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var audioCorrect = new Audio("assets/audio/applause.mp3");
    var audioWrong = new Audio("assets/audio/boo.mp3");
    var audioTimeOut = new Audio("assets/audio/Air Horn.mp3");
    var CorrectAnswers = 0;
    var WrongAnswers = 0;
    var unanswered = 0;
    var Space = $('<br><br>');
    var BigSpace = $('<br><br><br><br>');
    var SimpleSpace = $('<br>');
    var count = 30;
    var y;
    var numbers = [];
    var counter;

    function Hover(divChoice) {
        divChoice.hover(
            function () { $(this).addClass('Choices text-primary border border-primary px-0').css('{"font-size": "45px", "padding-right": "0", "border-style": "solid"}') },
            function () { $(this).removeClass('text-primary border border-primary Choices') }
        );
    }


    var TriviaQuestions = [{



        "Question": "What was Walt Disney's first full-length animated feature?",
        "Choices": ["Bambi", "Snow White", "Dumbo", "Pinocchio"],
        "AnswerID": "Choice1",
        "Answer": "Snow White",
        "img": "assets/images/Snow White.gif"



    },

    {

        "Question": "What kind of animal is Thumper in the Bambi Movie ?",
        "Choices": ["a mule Deer", "a roe deer", "a rabbit", "a donkey"],
        "AnswerID": "Choice2",
        "Answer": "a rabbit",
        "img": "assets/images/Thumper.gif"



    },

    {

        "Question": "with whom Aladdin married ?",
        "Choices": ["Princess Leila", "Princess Nadia", "Princess Jasmin", "Princess Jasmine"],
        "AnswerID": "Choice3",
        "Answer": "Princess Jasmine",
        "img": "assets/images/Jasmine.gif"




    },

    {

        "Question": "what's Popeyes spouse name ?",
        "Choices": ["Olive Oil", "Olive Oyl", "Olive Ole", "Olive Oley"],
        "AnswerID": "Choice1",
        "Answer": "Olive Oyl",
        "img": "assets/images/Olive Oyl.gif"




    },

    {

        "Question": "Who is Daffy Duck's girlfriend?",
        "Choices": ["Carla Duck", "Rosa Duck", "Melissa Duck", "Della Duck"],
        "AnswerID": "Choice2",
        "Answer": "Melissa Duck",
        "img": "assets/images/Melissa Duck.gif"




    },

    {

        "Question": "What sentence does Bugs Bunny always recite at the beginning of the cartoon?",
        "Choices": ["What's Up, Doc?", "What's Up, Man?", "What's Up, Bro?", "What's Up, Doctor?"],
        "AnswerID": "Choice0",
        "Answer": "What's Up, Doc?",
        "img": "assets/images/Bugs Bunny.gif"




    },

    {

        "Question": "What's the name of Homer Simpson's son ?",
        "Choices": ["Donald Simpson", "Marge Simpson", "Bart Simpson", "Ned Simpson"],
        "AnswerID": "Choice2",
        "Answer": "Bart Simpson",
        "img": "assets/images/Bart.gif"




    },
    {
        "Question": "In Snoopy show what's the name of The best friend of Charlie Brown, and also the younger brother of Lucy van Pelt and older brother of Rerun van Pelt ?",
        "Choices": ["Mark van Pelt", "Linus van Pelt", "Charlie van Pelt", "Adam van Pelt"],
        "AnswerID": "Choice1",
        "Answer": "Linus van Pelt",
        "img": "assets/images/linus.gif"


    },

    {

        "Question": "What's the name of the show with a cat which is always trying to catch a mouse ?",
        "Choices": ["Tom and Jerry", "Tomas and Jerry", "Tom and Berry", "Tom the Cat"],
        "AnswerID": "Choice0",
        "Answer": "Tom and Jerry",
        "img": "assets/images/tomandjerry.gif"


    },

    {

        "Question": "Taz is a short form of ?",
        "Choices": ["The Tasmanian Devil", "The Tasmaniac Devil", "The Taz", "The Devil Taz"],
        "AnswerID": "Choice0",
        "Answer": "The Tasmanian Devil",
        "img": "assets/images/taz.gif"


    }

    ];


    function startnewCounter() {
        count = 30;
        counter = setInterval(timer, 1000);
        $("#timer").show();
        ShowTriviaQ();

    }

    function StopCounter() {

        clearInterval(counter);
        $("#timer").hide();
    }

    function timer() {



        count--;
        if (count <= 0) {

            StopCounter();
            Transit(y, "Time OUT !", "The answer was : ");
            unanswered++;
            setTimeout(startnewCounter, 3000);
            audioTimeOut.play();

        }


        $("#timer").text("Time remaining: " + "00:" + count + " seconds");

    }



    //Fuction to Create Trivia Questions Slides
    function CreateContent(SlideNum) {

        var divQuestion = $("<div>");
        var divChoice = $("<div>");
        $("#Main").empty(); //I need to clear the previous...

        $("#timer").text("Time remaining: " + "00:" + count + " seconds");
        divQuestion.attr('id', 'question');
        divQuestion.addClass('display-5 font-weight-bold text-center');
        divQuestion.text(TriviaQuestions[SlideNum].Question);
        $('#Main').append(divQuestion);
        var Qspace = divQuestion.append(Space);





        // $.each(TriviaQuestions[0].Choices, function (index, value) 

        for (var i = 0; i < TriviaQuestions[SlideNum].Choices.length; i++) {

            var Choicei = $("<div>").addClass('Choice font-weight-bold text-center').attr('id', 'Choice' + i).text(TriviaQuestions[SlideNum].Choices[i]);
            Qspace.append(Choicei);
            console.log(Choicei);
            Hover(Choicei);

        }

    }






    //Fuction to return user Answer and incrementing CorrectAnswers or WrongAnswers for the final slide

    function ReturnGuess(SlideNum) {
        $('.Choice').on('click', function () {

            var Guess = ($(this).attr('id'));
            if (Guess === TriviaQuestions[SlideNum].AnswerID) {

                CorrectAnswers++;
                StopCounter();
                Transit(SlideNum, "Correct !", "The answer was : ");
                setTimeout(startnewCounter, 3000);
                audioCorrect.play();

            } else {


                WrongAnswers++;
                StopCounter();
                Transit(SlideNum, "Wrong !", "The answer was : ");
                setTimeout(startnewCounter, 3000);
                audioWrong.play();
            }

        });

    }



    //Fuction to Create Correct or false Answer Slides
    function Transit(SlideNum, string1, string2) {




        $('#Main').empty()
        var CWdiv = $('<div>');
        CWdiv.attr('id', 'question');
        CWdiv.addClass('display-5 font-weight-bold text-center');
        var StatusDiv = $('<div>').addClass('display-4 font-weight-bold text-center').text(string1);
        CWdiv.text(string2 + TriviaQuestions[SlideNum].Answer);
        //Create a div for the GIF picture
        var GifImg = $('<img>').attr("src", TriviaQuestions[SlideNum].img).addClass('rounded mx-auto d-block');
        $('#Main').append(Space, StatusDiv, Space, Space, CWdiv, Space, GifImg);



    }

    function ResetGame() {

        CorrectAnswers = 0;
        WrongAnswers = 0;
        unanswered = 0;
        numbers = [];


    }

    function endGameSlide() {
        StopCounter();

        $('#Main').empty()
        var end = $('<div>').attr('id', 'question').addClass('display-5 font-weight-bold text-center').text("All done, Here is your score :");
        var Correctnumbdiv = $('<div>').addClass('display-5 font-weight-bold text-center').text("Correct Answers : " + CorrectAnswers);
        var Wrongnumbdiv = $('<div>').addClass('display-5 font-weight-bold text-center').text("Wrong Answers : " + WrongAnswers);
        var unansweredDiv = $('<div>').addClass('display-5 font-weight-bold text-center').text("Unanswered : " + unanswered);
        var Endspace = $('#Main').append(BigSpace, end, BigSpace, Correctnumbdiv, Wrongnumbdiv, unansweredDiv);
        var startoverbtn = $("<button>").attr('id', 'startOver').addClass('btn btn-primary btn-lg centerbtn2').text("Start Over ?");
        Endspace.append(BigSpace, BigSpace, startoverbtn);
    }



    function StartOver() {

        $(this).hide();
        ResetGame();
        startnewCounter();

    }


    $(document).on("click", ".btn", StartOver);


    //Fuction to show trivia questions.
    function ShowTriviaQ() {
        y = getRandNumber(0, 9);


        if (numbers.length === TriviaQuestions.length) {


            endGameSlide();


        }

        else {
            if (numbers.indexOf(y) === -1) {

                numbers.push(y);
                CreateContent(y);
                ReturnGuess(y);

            } else {

                //For Randoms Trivia Questions !
                while (numbers.indexOf(y) !== -1) {
                    y = getRandNumber(0, 9);
                }

                numbers.push(y);
                CreateContent(y);
                ReturnGuess(y);

            }

        }
    }

});








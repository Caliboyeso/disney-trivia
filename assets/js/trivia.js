// Global Variables, Arrays, Objects
// ==================================================================================================

// This array holds the trivia question(10 objects)
var questions = [
    // Question #1: Snow White
    {
        question: "What was the first ever Disney movie?",
        possibleAnswers: ["Dumbo", "Bambi", "Snow White", "Pinocchio"],
        correctAnswer: "Snow White",
        image: "assets/img/snow-white.gif"
    },
    // Question #2: 1994
    {
        question: "What year did the Lion King come out?",
        possibleAnswers: ["1995", "1993", "1996", "1994"],
        correctAnswer: "1994",
        image: "assets/img/lion-king.gif"
    },
    // Question #3: 1928
    {
        question: "What year was Micky Mouse born?",
        possibleAnswers: ["1928", "1927", "1926", "1929"],
        correctAnswer: "1928",
        image: "assets/img/mickey-mouse.gif"
    },
    // Question #4: Rafiki
    {
        question: "What was the name of the monkey in The Lion King",
        possibleAnswers: ["Tito", "Tiki", "Rafiki", "Mufasa"],
        correctAnswer: "Rafiki",
        image: "assets/img/rafiki.gif"
    },
    // Question #5: Flounder
    {
        question: "In the movie 'The Little Mermaid' what was the name of the yellow fish?",
        possibleAnswers: ["Scuttle", "Flounder", "Sebastian", "Max"],
        correctAnswer: "Flounder",
        image: "assets/img/flounder.gif"
    },
    // Question #6: Bullseye
    {
        question: "What was Woody's horse name?",
        possibleAnswers: ["Rex", "Bullseye", "Spike", "Buttercup"],
        correctAnswer: "Bullseye",
        image: "assets/img/bullseye.gif"
    },
    // Question #7: Pluto
    {
        question: "What is Goofy's dog name?",
        possibleAnswers: ["Roco", "Pluto", "Ralph", "Utto"],
        correctAnswer: "Pluto",
        image: "assets/img/pluto.gif"
    },
    // Question #8: Abu
    {
        question: "What was the name of Aladin's monkey?",
        possibleAnswers: ["Boo", "Adu", "Dabu", "Abu"],
        correctAnswer: "Abu",
        image: "assets/img/abu.gif"
    },
    // Question #9: Sid
    {
        question: "What was the name of Andy's neighbor in Toy Story?",
        possibleAnswers: ["Jeff", "Sid", "Dale", "Keith"],
        correctAnswer: "Sid",
        image: "assets/img/sid.gif"
    },
    // Question #10 : Rajah
    {
        question: "What was Princess Jasmin's tiger name?",
        possibleAnswers: ["Gazeem", "Iago", "Rohan", "Rajah"],
        correctAnswer: "Rajah",
        image: "assets/img/rajah.gif"
    }
];

// This variable holds where the questions will be rendered
var renderArea = $("#render-area");

// This variable holds the amount of time the user gets per question(30 seconds)
var timePerQuestion = 30;

// This variable will hold a setInterval
var timer;

// This variable holds the game results
var game = {
    questions: questions,
    currentQuestion: 0,
    counter: timePerQuestion,
    correct: 0,
    incorrect: 0,

    // Functions
    // ==================================================================================================

    // Function #1: countDown()
    // This function handles rendering a timer to the page
    countDown: function() {
        // Using the decrement operator to subtract one from the timePerQuestion variable
        game.counter--;
        // Creating a div to render the timer to the page
        $("#counter-number").text(game.counter);
        // A if statement if the timer hits zero...
        if (game.counter === 0) {
            // Calling the timeUp() function
            game.timeUp();
        }
    },

    // Function #2: loadQuestion()
    // This function handles loading the trivia questions
    loadQuestion: function() {
        // Assining a setInterval method to the timer variable that will call countDown() function every second
        timer = setInterval(game.countDown, 1000);
        // Using the html() method to render the trivia questions in <h1> tags
        renderArea.html("<h1 id='trivia-questions'>" + questions[this.currentQuestion].question + "</h1>");
        // A for loop that loops through all the possible answers
        for (var i = 0; i < questions[this.currentQuestion].possibleAnswers.length; i++) {
            // Using the append() method to display the the buttons of possible answers
            renderArea.append("<button id='possible-answers-button' class='answer-button' data-name='" 
            + questions[this.currentQuestion].possibleAnswers[i]
            + "'>" + questions[this.currentQuestion].possibleAnswers[i] + "</button>");
        }
    },

    // Function #3: nextQuestion()
    // This function handles rendering the next question
    nextQuestion: function() {
        // This resets the counter back to 30
        game.counter = timePerQuestion;
        // Targeting the <counter-number> div to render the timer
        $("#counter-number").text(game.counter);
        // Using the increment operator to move on to the next question
        game.currentQuestion++;
        // Calling the loadQuestion() function to render the next trivia question
        game.loadQuestion();
    },

    // Function #4: timeUp()
    // This function handles rendering a message when the timePerQuestion variable hits zero
    timeUp: function() {
        // Using the clearInterval() method to stop the time when it hits 0
        clearInterval(timer);
        // Targeting the <render-area> div to render a <h1> tag to the page using the html() method
        renderArea.html("<h1 class='time-up' id='time-up-title'>Out of time!</h1>");
        // Targeting the <render-area> div to render a <h2> tag with the correct answer to the page using the append() method
        renderArea.append("<h2 class='time-up'>The correct answer is: <span id='correct-answer'>" + questions[this.currentQuestion].correctAnswer + "</span></h2>");
        // Targeting the <render-area> div to render a <img> tag of the current question to the page using the append()method
        renderArea.append("<img src='" + questions[this.currentQuestion].image + "' />");
        // A if statement if the user has completed all the questions
        if (game.currentQuestion === questions.length - 1) {
            // Using the setTimeout() method to call the results() function after 3 seconds
            setTimeout(game.results, 3 * 1000);
        }
        // A else statement if the user has not completed all the questions
        else {
            // Using a setTimeout() method to call the nextQuestion() function after 3 seconds
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    // Function #5: results()
    // This function handles rendering the results after all questions have been displayed
    results: function() {
        // Using the clearInterval() method to stop the time when it hits 0
        clearInterval(timer);
        // Using the hide() method to hide the timer
        $("#time-remaining").hide();
        // Targeting the <render-area> div to render a <h1> tag with a result message to the page
        renderArea.html("<h1 id='result-title' class='result-message'>All done! Here are your results...</h1>");
        // Targeting the <render-area> div to render a <h2> tag with the numbers of correct answers to the page
        renderArea.append("<h2 class='result-message'>Correct Answers: <span id='result-score'>" + game.correct + "</span></h2>");
        // Targeting the <render-arera> div to render a <h2> tag with the numbers of incorrect answers to the page
        renderArea.append("<h2 class='result-message'>Incorrect Answers: <span id='result-score'>" + game.incorrect + "</span></h2>");
        // Targeting the <render-area> div to render a <h2> tag with the number of unanswered answers to the page
        renderArea.append("<h2 class='result-message'>Unanswered: <span id='result-score'>" + (questions.length - (game.incorrect + game.correct)) + "</span></h2>");
        // Targeting the <render-area> div to render a <button> tag that will start the game over
        renderArea.append("<button class='result-message' id='restart-button'>Start Over?</button>");
    },

    // Function #6: clicked()
    // This function handles when the user clicks on the possible answers <button>
    clicked: function(e) {
        // Using the clearInterval() method to stop the time when it hits 0
        clearInterval(timer);
        // A if statement if the <button> clicked equals the correct answer
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            // Calling the answeredCorrectly() function
            this.answeredCorrectly();
        }
        // A else statement if the <button> clicked is incorrect
        else {
            // Calling the answeredIncorrectly() function
            this.answeredIncorrectly();
        }
    },

    // Function #7: answeredIncorrectly() function
    // This function handles when the user selects the wrong answer
    answeredIncorrectly: function() {
        // Using the increment operator to add one the number of incorrect answers
        game.incorrect++;
        // Using the clearInterval() method to stop the time when it hits 0
        clearInterval(timer);
        // Targeting the <render-area> div to render a <h1> tag with a message to the page
        renderArea.html("<h1 class='incorrect-section' id='incorrect-title'>Nope!</h1>");
        // Targeting the <render-area> div to render a <h2> tag with the correct answer to the page
        renderArea.append("<h1 class='incorrect-section'>The correct answer is: <span id='incorrect-answer'>" + questions[game.currentQuestion].correctAnswer + "</span></h1>");
        // Targeting the <render-area> div to render a <img> tag with the image of the current question to the page
        renderArea.append("<img src='" + questions[game.currentQuestion].image + "' />");
        // A if statement if the user has completed all the questions
        if (game.currentQuestion === questions.length - 1) {
            // Using a setTimeout() method to call the results() function after 3 seconds
            setTimeout(game.results, 3 * 1000);
        }
        // A else statement if the users hasn't completed all the questions
        else {
            // Using a setTimeout() method to call the nextQuestion() function after 3 seconds
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    // Function #8: answeredCorrectly()
    // This function handles when the user selects the correct answer
    answeredCorrectly: function() {
        // Using the clearInterval() method to stop the time when it hits 0
        clearInterval(timer);
        // Using the increment operator to add to the numbers of correct answers
        game.correct++;
        // Targeting the <render-area> div to render a <h1> tag with a message to the page
        renderArea.html("<h1 id='correct-title'>Good Job!</h1>")
        // Targeting the <render-area> div to render a <img> tag with the image of the current question to the page
        renderArea.append("<br/><img src='" + questions[game.currentQuestion].image + "' />");
        // A if statement if the user has completed all the questions
        if (game.currentQuestion === questions.length - 1) {
            // Using a setTimeout() method to call the results() function after 3 seconds
            setTimeout(game.results, 3 * 1000);
        }
        // A else statement if the user hasn't completed all the questions
        else {
            // Using a setTimeout() method to call the nextQuestion() function after 3 seconds
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    // Function #9
    // This function handles reseting all the stats of the game and loads the questions again
    reset: function() {
        this.currentQuestion = 0;
        this.counter = timePerQuestion;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }

};


// onClick Events
// ==================================================================================================

// onClick Event #1:
// This onclick event handles when the user clicks on the restart button
$(document).on("click", "#restart-button", function() {
    // Calling the reset() function
    game.reset();
    // Using the show() method to display the timer
    $("#time-remaining").show();
});

// onClick Event #2:
// This onclick event handles when the user clicks on the possoible answers button
$(document).on("click", ".answer-button", function(e) {
    // Calling the clicked() function
    game.clicked(e);
});

// onClick Event #3:
// This onclick event handles when the user clicks on the start button
$(document).on("click", "#start-button", function() {
    // Targeting the <trivia-container> div to render the timer
    $("#trivia-container").prepend("<h1 id='time-remaining'>Time remaining: <span id='counter-number'>30</span> seconds</h1>");
    // Calling the loadQuestion() function
    game.loadQuestion();
});
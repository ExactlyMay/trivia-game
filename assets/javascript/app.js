var intervalId;
var time = 3;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;
var questionCounter = 0;
var correctAnswer;
var correctImage;

var quiz = 
[
  {
    question: "What kind of ice did Bee shove under the door?",
    choices: ["Ankle Ice", "Sprain Ice", "Crotch Ice", "Head Ice"],
    answer: "Crotch Ice",
    image: "assets/images/crotch-ice.gif"
  },
  {
    question: "Who does Bee have a crush on?",
    choices: ["Deckard", "Cardamon", "Puppycat", "Wallace"],
    answer: "Deckard",
    image: "assets/images/deckard-crush.gif"
  },
  {
    question: "What is Deckard's sister's name?",
    choices: ["Lily", "Ann", "Opal", "Cass"],
    answer: "Cass",
    image: "assets/images/cass.gif"
  }            
];

window.onload = function() {
  $("#start").on("click", quizGame);
};

function quizGame() {
  time = 3;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  questionCounter = 0;
  
  $("#start").hide();
  $( "#choices" ).html( "" );  
  $("#timer").html("<h2> Time Remaining: " + time + "</h2>");
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);

  quizQuestions(questionCounter);
  
}

function quizQuestions(number) {

    var question = quiz[number].question;
    $( "#question" ).html( question + " " );

    var options = quiz[number].choices;
    for ( var opt in options ) {
      $( "#choices" ).append("<button class='btnChoices'>" + options[opt]+ "</button>" + "<br>");
    }
    correctAnswer = quiz[number].answer;
    correctImage = quiz[number].image;
    checkAnswer(correctAnswer);

}

function checkAnswer(answer){
  $( ".btnChoices" ).on( "click", function() {
    var userText = $(this).text();

    if(answer === userText)
    {
      correctCounter++;
      $("#question").hide();   
      $("#choices").html( "<p>Great job!</p>" ); 
      $("#choices").append("<img id='imgCorrect' src=" + correctImage + " />");
      stop(); 
    }
    else{
      incorrectCounter++;
      $( "#choices" ).html( "<p>Better luck next time!</p>" ); 
      wrongAnswer(); 
    }
    questionCounter++;
    setTimeout(resetQuestion, 1000 * 2);
  });
}

function decrement() {
  time--;
  $("#timer").html("<h2> Time Remaining: " + time + "</h2>");
  if (time === 0) {
    unansweredCounter++;
    $( "#choices" ).html( "<p>Out of time!</p>" ); 
    wrongAnswer();
    questionCounter++;
    setTimeout(resetQuestion, 1000 * 2);
  }
  
}

function stop() {
  clearInterval(intervalId);
}

function resetQuestion() {
  if(questionCounter == quiz.length)
  {
    $( "#question" ).show();   
    $( "#question" ).html("All done, here's how you did!");
    $( "#choices" ).html( "<p> Correct Answers: " + correctCounter + "<br>"
    + "Incorrect Answers: " + incorrectCounter + "<br>"
    + "Unanswered: " + unansweredCounter + "</p>");  
    $("#start").show();
    $("#start").html("Start Over?");
  }
  else{
    time = 3;
    $("#timer").html("<h2> Time Remaining: " + time + "</h2>");
    $( "#question" ).show();   
    $( "#choices" ).html( "" );  
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    quizQuestions(questionCounter);
  }
  
}

function wrongAnswer() {
  $( "#question" ).hide();   
  $( "#choices" ).append( "<p>Correct Answer: " + correctAnswer + "</p>");
  $("#choices").append("<img id='imgWrong' src=" + correctImage + " />");
  stop();   
}
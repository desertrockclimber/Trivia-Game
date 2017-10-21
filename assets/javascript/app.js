
$("#startButton").on("click", function(){
  console.log("start Button Clicked");
  $('#startButton').hide(1000);

});

$("#beginGame").on("click", function(){
  console.log("Begin Game Button Clicked");
  $('#beginGame').hide(1000);
  game.loadQuestion();

});
  
  $(document).on("click", ".answer-button", function(e){
  game.clicked(e);

})

// ==================================Questions and answers Array=====================================
var questions = [{
  question: "What is your name?", 
  answers: ["Sir Lancelot of Camelot", "Robin of Camelot", "Sir Galahad", "King Arthur of the Britons!" ],
  correctAnswer: "King Arthur of the Britons!",
  image: "../images/quest-for-hg.JPG",
  }, 
  {
  question: "What is your Quest?", 
  answers: ["I seek the Holy Grail", "To learn JavaScript!", "To write elegant code!", "Make lots of $$$" ],
  correctAnswer: "I seek the Holy Grail",
  image: "#",
  },
  {
  question: "What is your favorite color?",
  answers: ["Blue","no..Yellow!", "Red", "Purple"],
  correctAnswer: "Blue",
  image: "#",
  },
  {
  question: "What is the airspeed velocity of an unladen swallow?",
  answers: [ "31-40 MPH", "25-30 MPH", "50 MPH", "African or a European swallow?"],
  correctAnswer: "African or a European swallow?",
  image: "#",
  },
  {
  question: "What is the capital of Assyria?",
  answers: ["Assur","Bungholia", "Mesopotamia","I don't know THAT!!" ],
  correctAnswer: "Assur",
  image: "#",
  },
  {

  question: "Bonus Question: What else, besides a witch, floats?",
  answers: ["Bread", "Apples", "Very small rocks", "A duck" ],
  correctAnswer: "A duck",
  image: "#",

  }];

// =====================================Global Variables=======================================
console.log(questions[0].correctAnswer);

var game = {
    questions: questions,
    currentQuestion:0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    
    countdown: function(){
      game.counter--;
      $("#counter").html(game.counter);
      if(game.counter<=0){
        console.log("Time Up!");
        game.timeUp();
      }
    },
    loadQuestion: function(){
      timer=setInterval(game.countdown,1000);
      $("#timerArea").html("<h2>Time Left: <span id='counter'>30</span> seconds</h2>");
      $('#answerArea').html("<h2>" + questions[game.currentQuestion].question + "<h2>");
      for (var i = 0; i<questions[game.currentQuestion].answers.length; i++){
      $('#answerArea').append('<button class ="answer-button" type = "radio" id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
    }
    },
    nextQuestion: function(){
      game.counter = 30;
      $('#timerArea').html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },
    timeUp: function(){
      clearInterval(timer);
      game.unanswered++;
      $('#timerArea').html("<h2>Out of Time!</h2>");
      $('#answerArea').html('<h3>The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
      if(game.currentQuestion==questions.length-1){
          setTimeout(game.results, 2*1000);
      } else {
        setTimeout(game.nextQuestion, 2*1000);
      }
    },
    results: function(){
      clearInterval(timer);
      $('#answerArea').html("All Done");
      $('#answerArea').append("<h3>Correct: "+game.correct+"</h3>");
      $('#answerArea').append("<h3>Incorrect: "+game.incorrect+"</h3>");
      $('#answerArea').append("<h3>Unanswered: "+game.unanswered+"</h3>");
    },
    clicked: function(e){
      clearInterval(timer);
      if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
        game.answeredCorrectly();
      }
      else {
        game.answeredIncorrectly();
      }
    },
    answeredCorrectly: function (){
      console.log("You got it!");
      clearInterval(timer);
      game.correct++;
      $('#answerArea').html("<h2>Thou hast chosen..wisely.</h2>");
      if(game.currentQuestion==questions.length-1){
          setTimeout(game.results, 3*1000);
      } else {
        setTimeout(game.nextQuestion, 2*1000);
      }
    },
    answeredIncorrectly: function(){
      console.log("You got flung!");
      clearInterval(timer);
      game.incorrect++;
      $('#answerArea').html("<h2>Wrong!</h2>");
      $('#answerArea').append('<h2>The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'</h2>');
      if(game.currentQuestion==questions.length-1){
          setTimeout(game.results, 3*1000);
      } else {
        setTimeout(game.nextQuestion, 3*1000);
      }
    },
    reset: function(){
      game.currentQuestion = 0;
      game.counter = 0;
      game.correct = 0;
      game.incorrect = 0;
      game.unanswered = 0;
  }
}


{}

// // ======================================Game Instructions Text Scroll===========================================


// // Instructions will scroll on the screen to inform what the game/quiz will do. By selecting "Start" the game/quiz will begin and the timer will begin.
console.log("working or not?")

var i = 0;
var txt1 = "He who would cross the Bridge of Death - Must answer me these questions three - Ere the other side he see.  AHEM...You have 30 seconds to anser each question.";
var speed = 50;

function startInstructions() {
  if (i < txt1.length) {
    document.getElementById("instructions").innerHTML += txt1.charAt(i);
    i++;
    setTimeout(startInstructions, speed);
    $('#beginGame').delay(9000).show(0);

  }
}





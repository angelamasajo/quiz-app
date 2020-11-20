/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What do you call the opening in a lens through where the light passes to enter the camera?',
      answers: [
        'shutter',
        'aperture',
        'screen',
        'pupil'
      ],
      correctAnswer: 'aperture'
    },
    {
      question: 'Which shutter speed is the fastest?',
      answers: [
        '1/10',
        '1/100',
        '1/500',
        '1/1000'
      ],
      correctAnswer: '1/1000'
    },
    {
      question: 'When was the first color photo taken?',
      answers: [
        '1962',
        '1924',
        '1847',
        '1861'
      ],
      correctAnswer: '1861'
    },
    {
      question: 'What year was the first digital camera invented?',
      answers: [
        '1899',
        '1958',
        '1990',
        '1975'
      ],
      correctAnswer: '1975'
    },
    {
      question: 'According to Guinness World Records, what is the most liked picture of Instagram as of May 2020?',
      answers: [
        'A celebrity',
        'A dog',
        'An egg',
        'A potato'
      ],
      correctAnswer: 'An egg'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  submittingAnswer: false,
  score: 0,

  currentQuestionState: {
    answerArray: []
  }
};




/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateWelcomeString() {
  return `
  <header>
  <h1>Photography Quiz</h1>
  </header>
  <div class="opening">
    <form>
      <p>Welcome. Start the quiz below.</p>
      <button type="submit" id="beginQuiz" autofocus>START</button>
    </form>
  </div>
    `;




}
function generateQuizInterfaceString(questionObject) {
  return `
  <header>
  <h1>Photography Quiz</h1>
  </header>
    <div class='quiz-questions'>
      <p>Question ${questionObject.index} out of ${store.questions.length}</p>
      <p>
       ${questionObject.question.question}
      </p>
      <form>
      <ol type="a">
        ${generateQuizAnswers(questionObject.question.answers)}
      </ol>
      <button type="submit" class="submit-answer">Submit Answer</button>
      </form> 
      <p>Score: ${store.score}</p>
    </div>
    `;
}


function generateAnswerResults() {
  let answerArray = store.currentQuestionState.answerArray;

  const buttons = {
    next: `<button type="submit" class="next-question" autofocus>NEXT</button>`,
    results: `<button type="submit" class="see-results" autofocus>SEE MY RESULTS</button>`
  };

  let correctResponse = `"${answerArray[1]}" is correct`;
  let incorrectResponse = `"${answerArray[2]}" is not correct. The correct answer is "${answerArray[1]}"`;

  let isLastQuestion = (store.questionNumber + 1) === (store.questions.length);

  return `
  <header>
  <h1>Photography Quiz</h1>
  </header>  
  <div class="answer-response">
    <form>
    <p>${answerArray[0] === true ? correctResponse : incorrectResponse}</p>
    <p> Score: ${store.score}</p>
   ${isLastQuestion ? buttons.results : buttons.next}
    </form>
    </div>
  `;
}


function generateQuizAnswers(answers) {
  let answerArray = [];
  answers.forEach(answer => {
    answerArray.push(answer);
  });
  return answerArray.map(answer => stringifyAnswerArray(answer)).join('');
}

function stringifyAnswerArray(answer) {
  let questionNumber = store.questionNumber;
  let name = store.questions[questionNumber].answers.indexOf(answer);
  return `
  <li>
      <div class="answer-container">
      <input type="radio" name="answer" id="answer-${name}" data-answer="${answer}">
      <label for="answer-${name}"> ${answer}</label>
     
      </div>
    </li>
  `;
}

function generateQuizResultsString() {
  return `
  <header>
  <h1>Photography Quiz</h1>
  </header>  
  <div class='quiz-results'>
      <p>
        You finished the quiz. Thank you!
         </p>
          <p>You scored ${store.score} out of ${store.questions.length}. Press the button if you would like to redeem yourself.</p>            
        <button class="restart-quiz">Restart Quiz</button>      
    </div>   
  `;
}

/********** RENDER FUNCTION(S) **********/

function renderQuiz() {

  if (store.quizStarted === false) {
    if (store.questionNumber === store.questions.length) {
      const quizResultsString = generateQuizResultsString();
      $('main').html(quizResultsString);
    } else {
      const quizWelcomeInterfaceString = generateWelcomeString();
      $('main').html(quizWelcomeInterfaceString);
    }
  } else {
    if (store.submittingAnswer === false) {
      const quizInterfaceString = generateQuizInterfaceString(currentQuestion());
      $('main').html(quizInterfaceString);
    } else if (store.submittingAnswer === true) {
      const quizAnswerResponseString = generateAnswerResults();
      $('main').html(quizAnswerResponseString);
    }
  }
}


// Changes to quizStarted = true
function startQuiz() {
  store.quizStarted = true;
}

// currentQuestion
function currentQuestion() {
  let questionNumber = store.questionNumber;
  let questionObject = store.questions[questionNumber];
  return {
    index: questionNumber + 1,
    question: questionObject
  };
}

// Go to the next question of the quiz
// Model function changes state
function nextQuestion() {
  if (store.questionNumber < store.questions.length) {
    store.questionNumber++;
    store.submittingAnswer = false;
  } else if (store.questionNumber === store.questions.length) {
    store.quizStarted = false;
  }
}


function validateCorrectAnswer() {
  let radios = $('input:radio[name="answer"]');
  let selectedAnswer = $('input[name="answer"]:checked').data('answer').toString();
  let questionNumber = store.questionNumber;
  let correctAnswer = store.questions[questionNumber].correctAnswer;

  if (radios.filter(':checked').length === 0) {
    alert('Please select your answer.');
    return;
  } else {
    store.submittingAnswer = true;
    if (selectedAnswer === correctAnswer) {
      store.score += 1;
      store.currentQuestionState.answerArray = [true, correctAnswer, selectedAnswer];
    } else {
      store.currentQuestionState.answerArray = [false, correctAnswer, selectedAnswer];
    }
  }
}

function seeResults() {
  store.quizStarted = false;
  store.questionNumber++;
}

function restartQuiz() {
  store.score = 0;
  store.quizStarted = false;
  store.questionNumber = 0;
  store.submittingAnswer = false;
  store.currentQuestionState.answerArray = [];
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)
// Controller layer

function handleBeginQuizSubmit() {

  $('main').on('click', '#beginQuiz', (event) => {
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
}

function handleSubmitAnswer() {
  $('main').on('click', '.submit-answer', (event) => {
    event.preventDefault();
    validateCorrectAnswer();
    renderQuiz();
  });
}

function handleNextQuestionSubmit() {
  $('main').on('click', '.next-question', (event) => {
    event.preventDefault();
    nextQuestion();
    renderQuiz();
  });
}

function handleSeeResultsSubmit() {
  $('main').on('click', '.see-results', (event) => {
    event.preventDefault();
    seeResults();
    renderQuiz();
  });
}

function handleRestartQuizSubmit() {
  $('main').on('click', '.restart-quiz', (event) => {
    event.preventDefault();
    restartQuiz();
    renderQuiz();
  });
}

function eventHandlers() {
  handleBeginQuizSubmit();
  handleSubmitAnswer();
  handleNextQuestionSubmit();
  handleRestartQuizSubmit();
  handleSeeResultsSubmit();
}

// This function will launch all other functions after the page is loaded
function handleQuiz() {
  renderQuiz();
  eventHandlers();
}

$(handleQuiz);

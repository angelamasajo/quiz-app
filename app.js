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
        '1861',
        '1924',
        '1847',
        '1962'
      ],
      correctAnswer: '1861'
    },
    {
      question: 'What year was the first digital camera invented?',
      answers: [
        '1899',
        '1975',
        '1990',
        '1958'
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
  score: 0,
  submittingAnswer: false,
  

  currentQuestionState: {
  answerArray: [];
  }
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function generateWelcomeScreen() {
  return `
  <div class="opening">
  <p>Welcome. Start the quiz below.</p>
    <form>
        <button type="submit" id="startQuiz">START</button>
    </form>
  </div>
  `;
} 

function generateQuizQuestionsScreen(questionObject) {
  return `
  <div class="quiz-questions">
    <p>Question $(questionObject.index) of ${store.questions.length}</p>
    
    <p>
      ${questionObject.question.question}
    </p>
    
    <form>
      <ol type="a">
        ${generateQuizAnswers(questionObject.question.answers)}
      </ol>

    <button type="submit" class="submit-answer">SUBMIT</button>
    </form> 
    <p>${store.score}</p>
  </div>
  `;
}

function generateAnswerOutcome() {
  let answerArray = store.currentQuestionState.answerArray;

  const buttons = {
    next: '<button type="submit" class="next-question" autofocus>Next</button>',
    result: '<button type ="submit" class="see-results" autofocus>See Results</button>'
  };

  let correctResponse = `${answerArray[1] is correct}`;
  let incorrectResponse = `${answerArray[2]} is incorrect. The correct answer is ${answerArray[1]}`;

let lastQuestion = (store.questionNumber +1) === (store.questions.length);


//ask about this because i don't want to add this code if i don't understand
return `
    <div class="answer-response">
    <form>
    <p>${answerArray[0] === true ? correctResponse : incorrectResponse}</p>
    <p> Score: ${store.score}</p>
  ${lastQuestion ? buttons.result : buttons.next}
    </form>
    </div>
`;
}


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store



//this is the current question
function quizStart() {
  store.quizStarted = true;
}

function currentQuestion() {
  let index = store.questionNumber;
  let questionObject = store.questions[i];
  return {
    index: i + 1,
    question: questionObject
  };
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)



/*

PSEUDOCODE

Things that need to happen 
- Make the options clickable
- separate the welcome page to the question page
- when i click the START button, it needs to lead to the first question.
- when i pick an answer,



*/
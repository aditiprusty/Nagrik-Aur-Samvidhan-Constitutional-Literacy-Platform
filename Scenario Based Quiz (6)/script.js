const questions = [
  {
    question:
      "Scenario: A law passed by the Parliament of India is found to violate the Fundamental Rights guaranteed by the Constitution. What power allows the Supreme Court to strike down this law?",
    correctAnswer: "Judicial Review",
  },
  {
    question:
      "Scenario: The President of India declares a financial emergency due to a severe economic crisis. Under which Article of the Constitution can this be done?",
    correctAnswer: "Article 360",
  },
  {
    question:
      "Scenario: A state government passes a law that is in direct conflict with an existing central law on the same subject. Which law will prevail?",
    correctAnswer: "Central",
  },
  {
    question:
      "Scenario: A state government passes a law that is in direct conflict with an existing central law on the same subject. Which law will prevail?",
    correctAnswer: "Central",
  },
  {
    question:
      "Scenario: A citizen of India petitions the Supreme Court for the enforcement of her Fundamental Rights. Which type of jurisdiction allows the Supreme Court to hear this case?",
    correctAnswer: "Original",
  },
  {
    question:
      "Scenario: A new state is created by altering the boundaries of an existing state. Under which Article can this be done by the Parliament?",
    correctAnswer: "Article 3",
  },
  {
    question:
      "Scenario: The Constitution provides for the establishment of the Election Commission to supervise and conduct elections. Who appoints the Chief Election Commissioner?",
    correctAnswer: "President",
  },
  {
    question:
      "Scenario: The Directive Principles of State Policy are guidelines for the government but are not enforceable in a court of law. What are they considered as?",
    correctAnswer: "Non-justiciable",
  },
  {
    question:
      "Scenario: The Constitution of India was adopted on a specific date by the Constituent Assembly. What is this date?",
    correctAnswer: "26th November 1949",
  },
  {
    question:
      "Scenario: The Indian Parliament consists of two houses. One of them is the Lok Sabha. What is the other house called?",
    correctAnswer: "Rajya Sabha",
  },
  {
    question:
      "Scenario: A law passed by a state legislature requires the President's assent before it can become effective. This is because the law conflicts with a central law. What is this process called?",
    correctAnswer: "Assent",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

function shuffleQuestions() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
}

function loadQuestion(index) {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  const questionObj = shuffledQuestions[index];
  const questionElement = document.createElement("div");
  questionElement.className = "question active";

  if (questionObj.options) {
    // Multiple choice question
    questionElement.innerHTML = `
        <p>${questionObj.question}</p>
        ${questionObj.options
          .map(
            (option, i) => `
            <label style="display: block; margin-bottom: 8px;">
              <input type="radio" name="answer" value="${String.fromCharCode(
                97 + i
              )}" style="margin-right: 8px;"> 
              ${option}
            </label>
        `
          )
          .join("")}
    `;
  } else {
    // Text input question
    questionElement.innerHTML = `
        <p>${questionObj.question}</p>
        <input type="text" name="answer" id="text-answer" 
          style="width: 100%; padding: 10px; margin-top: 8px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;" 
          placeholder="Type your answer here" />
    `;
  }

  quizContainer.appendChild(questionElement);
}


function nextQuestion() {
  const textAnswer = document.getElementById("text-answer");
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  let userAnswer = "";
  if (textAnswer) {
    userAnswer = textAnswer.value.trim();
  } else if (selectedAnswer) {
    userAnswer = selectedAnswer.parentNode.textContent.trim();
  }

  if (userAnswer) {
    const correctAnswer =
      shuffledQuestions[currentQuestionIndex].correctAnswer.trim();

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      score += 2;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      showResult();
    }
  } else {
    alert("Please enter or select an answer before proceeding.");
  }
}

function showResult() {
  const result = document.getElementById("result");
  result.textContent = `You got ${score / 2} out of ${
    shuffledQuestions.length
  } correct, with a total score of ${score}.`;
  result.style.display = "block";
  document.getElementById("next-button").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  shuffleQuestions();
  loadQuestion(currentQuestionIndex);
});
